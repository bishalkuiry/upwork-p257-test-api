import { Request, Response } from "express";
import { ResponseType } from "../types/response.type";
import UserValidator from "../validators/user.validator";
import { HttpStatusCode, ResponseStatus } from "../utils/enum.util";

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

        const responseData: ResponseType = {
            status: ResponseStatus.SUCCESS,
            message: "Points updated successfully",
        };
        return res.status(HttpStatusCode.OK).json(responseData);
    }

    public async getTop5Users(req: Request, res: Response): Promise<Response> {
        const responseData: ResponseType = {
            status: ResponseStatus.SUCCESS,
            message: "Top 5 users retrieved successfully",
            data: [
                { username: "user1", points: 100 },
                { username: "user2", points: 90 },
                { username: "user3", points: 80 },
                { username: "user4", points: 70 },
                { username: "user5", points: 60 },
            ],
        };
        return res.status(HttpStatusCode.OK).json(responseData);
    }
}
