import { Router } from "express";
import { messageHook } from "./message";
import { verifyHook } from "./verify";

export const webhooks = Router();

webhooks.use(verifyHook);
webhooks.use(messageHook);