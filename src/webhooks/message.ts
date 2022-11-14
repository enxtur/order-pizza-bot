import { Router } from "express";
import { logger } from "../logger";

export const messageHook = Router();

messageHook.post('/', (req, res) => {
  const body = req.body;
  logger.info({
    message: 'Received webhook',
    body,
  })
  res.status(200).send('OK');
});