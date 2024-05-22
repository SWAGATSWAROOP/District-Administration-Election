import { Router } from "express";
import AllRush from "../controller/giveallrush.js";

const router = Router();

router.route("/").get(AllRush);

export default router;
