import { PrismaClient } from "@prisma/client";
import { UserType } from "../types/user.type";

export default class UserDB {
    public static instance: UserDB = new UserDB();
    prismaClient = new PrismaClient();
    private constructor() {}

    public async createUsers(users: Array<UserType>): Promise<boolean> {
        try {
            const prismaUsers = users.map((user) => ({
                username: user.username,
                name: user.name,
                profilePicture: user.profilePicture,
            }));
            const resp = await this.prismaClient.user.createMany({
                data: prismaUsers,
                skipDuplicates: true,
            });

            return resp.count > 0;
        } catch (error) {
            console.error("Error creating users:", error);
            return false;
        }
    }
}
