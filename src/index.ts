import express from "express";
import type { Request, Response } from "express";
import EnvData from "./data/env.data";
import { ResponseType } from "./types/response.type";
import { HttpStatusCode, ResponseStatus } from "./utils/enum.util";

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors middleware
app.use((req: Request, res: Response, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
    return null;
});

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

