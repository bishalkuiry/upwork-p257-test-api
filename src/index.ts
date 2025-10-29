import express from "express";
import type { Request, Response } from "express";
import EnvData from "./data/env.data";
import { ResponseType } from "./types/response.type";
import { HttpStatusCode, ResponseStatus } from "./utils/enum.util";

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define import routes
import UserRoute from "./routes/user.route";

// Use routes
app.use("/users", UserRoute.instance.router);


app.use(async (req: Request, res: Response) => {
    const response: ResponseType = {
        status: ResponseStatus.ERROR,
        message: "Unauthorized access",
    };
    return res.status(HttpStatusCode.UNAUTHORIZED).json(response);
});

// Start the server
app.listen(EnvData.PORT, () => {
    console.log(`Server is running on ${EnvData.URL} in ${EnvData.ENV} mode.`);
});