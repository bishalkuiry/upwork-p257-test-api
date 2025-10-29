import { PrismaClient } from "@prisma/client";
import { LeaderboardType, LeaderboardUserType } from "../types/leaderboard.type";

export default class LeaderboardDB {
    public static instance: LeaderboardDB = new LeaderboardDB();
    prismaClient = new PrismaClient();
    private constructor() {}

    public async addEntryPoints(points: Array<LeaderboardType>): Promise<boolean> {
        try {
            const invalidUsernames: string[] = [];
            for (const entry of points) {
                const user = await this.prismaClient.user.findUnique({
                    where: { username: entry.username },
                });

                if (!user) {
                    invalidUsernames.push(entry.username);
                    continue;
                }

                await this.prismaClient.leaderboard.create({
                    data: {
                        userId: user.id,
                        point: parseInt(entry.point.toString(), 10),
                    },
                });
            }
            if (invalidUsernames.length > 0) {
                console.warn("The following usernames were not found:", invalidUsernames);
            }
            return invalidUsernames.length < points.length;
        } catch (error) {
            console.error("Error adding leaderboard entries:", error);
            return false;
        }
    }


    public async getTop5UsersByTotalPoints(skip:number): Promise<Array<LeaderboardUserType>> {
        try {
            const topUsers = await this.prismaClient.leaderboard.groupBy({
                by: ["userId"],
                _sum: {
                    point: true,
                },
                skip: skip,
                orderBy: {
                    _sum: {
                        point: "desc",
                    },
                },
                take: 5,
            });

            const result: Array<LeaderboardUserType> = [];
            for (const entry of topUsers) {
                const user = await this.prismaClient.user.findUnique({
                    where: { id: entry.userId },
                });

                if (user) {
                    result.push({
                        username: user.username,
                        name: user.name,
                        profilePicture: user.profilePicture,
                        totalPoints: entry._sum.point || 0,
                    });
                }
            }

            return result;
        } catch (error) {
            console.error("Error retrieving top 5 users:", error);
            return [];
        }
    }

    public async getTop5UsersBySingleEntry(skip:number): Promise<Array<LeaderboardUserType>> {
        try {
            const topEntries = await this.prismaClient.leaderboard.findMany({
                skip: skip,
                orderBy: {
                    point: "desc",
                },
                take: 5,
            });

            const result: Array<LeaderboardUserType> = [];
            for (const entry of topEntries) {
                const user = await this.prismaClient.user.findUnique({
                    where: { id: entry.userId },
                });

                if (user) {
                    result.push({
                        username: user.username,
                        name: user.name,
                        profilePicture: user.profilePicture,
                        totalPoints: entry.point,
                    });
                }
            }

            return result;
        } catch (error) {
            console.error("Error retrieving top 5 users by single entry:", error);
            return [];
        }
    }
}