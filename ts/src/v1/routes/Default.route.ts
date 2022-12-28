import express, { Router } from "express";
import { defaultController } from "../controllers";

const router: Router = express.Router();

router.get("/", defaultController.greet);

export default router;
