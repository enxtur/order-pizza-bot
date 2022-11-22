import fetch from "node-fetch";
import { logger } from "../logger";
import { Response } from "../types/response";

export function callSendAPI(senderId: string, recipientId: string, response: Response) {
  const requestBody = {
    recipient: {
      id: senderId,
    },
    sender: {
      id: recipientId,
    },
    message: response,
  }
  fetch(`https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  }).then(async (res)=> {
    if (res.status === 200) {
      logger.info({ message: 'Successfully sent message', response: await res.json() });
    } else {
      logger.error({ message: 'Error sending message', status: res.status, body: await res.json() });
    }
  }).catch((err) => {
    logger.error({ message: 'Failed to send message', err });
  })
}