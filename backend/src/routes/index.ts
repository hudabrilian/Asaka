import express from "express";
import auth from "./auth";
import discord from "./discord";

const router = express.Router();

router.use("/auth", auth);
router.use("/discord", discord);

export default router;
