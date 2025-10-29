import express from "express";
import UserController from "../controllers/user.controller";

export default class UserRoute {
    public static instance: UserRoute = new UserRoute();
    public router: express.Router = express.Router();
    private constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post("/", UserController.instance.createUsers.bind(UserController.instance));
        this.router.post("/points", UserController.instance.updatePoints.bind(UserController.instance));
        this.router.get("/top5/total", UserController.instance.getTop5UsersByTotalPoints.bind(UserController.instance));
        this.router.get("/top5/single", UserController.instance.getTop5UsersBySingleEntry.bind(UserController.instance));
    }
}
