import { Request, Response } from "express";
import { ResponseType } from "../types/response.type";
import UserValidator from "../validators/user.validator";
import { HttpStatusCode, ResponseStatus } from "../utils/enum.util";
import UserDB from "../db/user.db";
import LeaderboardDB from "../db/leaderboard.db";
import { LeaderboardUserType } from "../types/leaderboard.type";

export default class UserController {
    public static instance: UserController = new UserController();
    private constructor() {}

    public async createUsers(req: Request, res: Response): Promise<Response> {
        const { error } = UserValidator.instance.createUsers.validate(req.body ?? {});

        if (error) {
            const responseData: ResponseType = {
                status: ResponseStatus.ERROR,
                message: error.message,
            };
            return res.status(HttpStatusCode.BAD_REQUEST).json(responseData);
        }

        const resp = await UserDB.instance.createUsers(req.body.users);
        if (!resp) {
            const responseData: ResponseType = {
                status: ResponseStatus.ERROR,
                message: "Failed to create users",
            };
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(responseData);
        }

        const responseData: ResponseType = {
            status: ResponseStatus.SUCCESS,
            message: "Users created successfully",
        };
        return res.status(HttpStatusCode.CREATED).json(responseData);
    }

    public async updatePoints(req: Request, res: Response): Promise<Response> {
        const { error } = UserValidator.instance.updatePoints.validate(req.body ?? {});

        if (error) {
            const responseData: ResponseType = {
                status: ResponseStatus.ERROR,
                message: error.message,
            };
            return res.status(HttpStatusCode.BAD_REQUEST).json(responseData);
        }

        const resp = await LeaderboardDB.instance.addEntryPoints(req.body.points);
        if (!resp) {
            const responseData: ResponseType = {
                status: ResponseStatus.ERROR,
                message: "Failed to update points",
            };
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(responseData);
        }

        const responseData: ResponseType = {
            status: ResponseStatus.SUCCESS,
            message: "Points updated successfully",
        };
        return res.status(HttpStatusCode.OK).json(responseData);
    }

    public async getTop5UsersByTotalPoints(req: Request, res: Response): Promise<Response> {
        let skip = 0;
        const finalUsers: Array<LeaderboardUserType> = [];
        const topUsers = await LeaderboardDB.instance.getTop5UsersByTotalPoints(skip);
        finalUsers.push(...topUsers);
        let isMoreRequired = await this.rankAssign(finalUsers);
        while (isMoreRequired) {
            skip += 5;
            const moreUsers = await LeaderboardDB.instance.getTop5UsersByTotalPoints(skip);
            if (moreUsers.length === 0) {
                isMoreRequired = false;
                break;
            }
            finalUsers.push(...moreUsers);
            isMoreRequired = await this.rankAssign(finalUsers);
        }

        
        const rankedUsers = finalUsers.filter((user) => user.rank !== undefined);

        const responseData: ResponseType = {
            status: ResponseStatus.SUCCESS,
            message: "Top 5 users retrieved successfully",
            data: rankedUsers,
        };
        return res.status(HttpStatusCode.OK).json(responseData);
    }

    public async getTop5UsersBySingleEntry(req: Request, res: Response): Promise<Response> {
        let skip = 0;
        const finalUsers: Array<LeaderboardUserType> = [];
        const topUsers = await LeaderboardDB.instance.getTop5UsersBySingleEntry(skip);

        finalUsers.push(...topUsers);
        let isMoreRequired = await this.rankAssign(finalUsers);

        while (isMoreRequired) {
            skip += 5;
            const moreUsers = await LeaderboardDB.instance.getTop5UsersBySingleEntry(skip);
            if (moreUsers.length === 0) {
                isMoreRequired = false;
                break;
            }
            finalUsers.push(...moreUsers);
            isMoreRequired = await this.rankAssign(finalUsers);
        }

        const rankedUsers = finalUsers.filter((user) => user.rank !== undefined);

        const responseData: ResponseType = {
            status: ResponseStatus.SUCCESS,
            message: "Top 5 users by single entry retrieved successfully",
            data: rankedUsers,
        };
        return res.status(HttpStatusCode.OK).json(responseData);
    }

    private async rankAssign(users: Array<LeaderboardUserType>): Promise<boolean> {
        let rank = 1;
        for (let i = 0; i < users.length; i++) {
            if (i > 0 && users[i].totalPoints < users[i - 1].totalPoints) {
                rank = i + 1;
            }
            if (rank > 5) {
                break;
            }
            users[i].rank = rank;
        }
        return rank <= 5;
    }
}
