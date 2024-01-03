import express from "express";
import { getPing } from "../controllers/ping";
const router = express.Router();

router.get('/ping', getPing);

export default router;