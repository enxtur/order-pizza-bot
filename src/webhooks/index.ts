import { Router } from "express";
import { verifyHook } from "./verify";

export const webhooks = Router();

webhooks.use(verifyHook);