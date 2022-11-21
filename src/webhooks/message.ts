import { Router } from "express";
import { logger } from "../logger";
import { Message, Postback, WebhookBody } from "../types/message";
import fetch from "node-fetch";
import { ButtonType, FeedbackQuestionType, Response, ResponseAttachmentType, TemplateType } from "../types/response";
import { v4 as uuid } from 'uuid';

export const messageHook = Router();

messageHook.post('/', (req, res) => {
  const body = req.body as WebhookBody;
  logger.info({ message: 'Received webhook', body });
  if (body.object !== 'page') {
    return res.sendStatus(404);
  }
  body.entry.forEach(entry => {
    const webhookEvent = entry.messaging[0];
    const senderId = webhookEvent.sender.id;
    if (webhookEvent.message) {
      handleMessage(senderId, webhookEvent.message);
    } else if (webhookEvent.postback) {
      handlePostback(senderId, webhookEvent.postback);
    }
  });
  res.status(200).send('EVENT_RECEIVED');
});

function handleMessage(senderId: string, message: Message) {
  let response: Response = {}
  if (message.text) {
    response.text = `You sent the message: "${message.text}". Now send me an image!`;
  } else if (message.attachments) {
    // message.attachments[0].payload.url;
    response.attachment = {
      type: ResponseAttachmentType.template,
      payload: {
        template_type: TemplateType.generic,
        elements: [{
          title: 'Is this the right picture?',
          subtitle: 'Tap a button to answer.',
          image_url: message.attachments[0].payload.url,
          buttons: [{
            type: ButtonType.postback,
            title: 'Yes!',
            payload: 'yes',
          }, {
            type: ButtonType.postback,
            title: 'No!',
            payload: 'no',
          }],
        }],
      },
    }
  }
  callSendAPI(senderId, response);
}

function handlePostback(senderId: string, postback: Postback) {
  // console.log('handlePostback called', postback);
  if (postback.payload === 'yes') {
    let response: Response = {
      attachment: {
        type: ResponseAttachmentType.template,
        payload: {
          template_type: TemplateType.customer_feedback,
          title: "Rate your experience",
          feedback_screens: [{
            questions: [{
              id: uuid(),
              type: FeedbackQuestionType.csat,
              title: "How likely are you to recommend us to a friend?",
              score_label: "neg_pos",
              score_option: "five_stars",
            }],
          }],
          business_privacy: {
            url: "https://www.example.com/privacy"
          }
        }
      }
    }
    callSendAPI(senderId, response);
  }
}

function callSendAPI(senderId: string, response: Response) {
  const requestBody = {
    recipient: {
      id: senderId,
    },
    message: response,
  }
  fetch(`https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  }).then(()=> {
    logger.info({ message: 'Successfully sent message', response });
  }).catch((err) => {
    logger.error({ message: 'Failed to send message', err });
  })
}