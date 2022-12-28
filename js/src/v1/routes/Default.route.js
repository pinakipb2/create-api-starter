import express from "express";
import { defaultController } from "../controllers";

const router = express.Router();

router.get("/", defaultController.greet);

export default router;
