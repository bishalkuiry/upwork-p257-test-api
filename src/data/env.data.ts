import dotenv from "dotenv";
dotenv.config();

export default class EnvData {

    static readonly SERVER_PRIMARY_INSTANCE_NAME = "primary-server";

    static readonly URL = process.env.SERVER_URL ?? "http://localhost:3000";

    static readonly PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

    static readonly ENV = process.env.SERVER_ENV ?? "development";
    
}

