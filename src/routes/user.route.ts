import express from "express";
import UserController from "../controllers/user.controller";

export default class UserRoute {
    public static instance: UserRoute = new UserRoute();
    public router: express.Router = express.Router();
    private constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post("/", UserController.instance.createUsers);
        this.router.post("/points", UserController.instance.updatePoints);
        this.router.get("/top5", UserController.instance.getTop5Users);
    }
}
