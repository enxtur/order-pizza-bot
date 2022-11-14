import { Router } from "express";

export const messageHook = Router();

messageHook.post('/', (req, res) => {
  const body = req.body;
  console.log(`\u{1F7EA} Received webhook`);
  console.dir(body, { depth: null });
  res.status(200).send('OK');
});