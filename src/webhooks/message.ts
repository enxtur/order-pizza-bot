import { Router } from "express";
import { v4 as uuid } from 'uuid';
import { callSendAPI } from "../helpers/message";
import { Message, Postback, WebhookBody } from "../types/message";
import { ButtonType, FeedbackQuestionType, Response, ResponseAttachmentType, TemplateType } from "../types/response";
import { pizza } from "./handlers";

export const messageHook = Router();

messageHook.post('/', (req, res) => {
  const body = req.body as WebhookBody;
  // logger.info({ message: 'Received webhook', body });
  if (body.object !== 'page') {
    return res.sendStatus(404);
  }
  body.entry.forEach(entry => {
    const webhookEvent = entry.messaging[0];
    const senderId = webhookEvent.sender.id;
    const recipientId = webhookEvent.recipient.id;
    if (webhookEvent.message) {
      handleMessage(senderId, recipientId, webhookEvent.message);
    } else if (webhookEvent.postback) {
      handlePostback(senderId, recipientId, webhookEvent.postback);
    }
  });
  res.status(200).send('EVENT_RECEIVED');
});

function handleMessage(senderId: string, recipientId:string, message: Message) {
  let response: Response = {}
  if (message.text) {
    if (message.text === 'pizza') {
      pizza(senderId, recipientId);
    } else {
      response.text = `You sent the message: "${message.text}". Now send me an image!`;
      callSendAPI(senderId, recipientId, response);
    }
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
    callSendAPI(senderId, recipientId, response);
  }
}

function handlePostback(senderId: string, recipientId: string, postback: Postback) {
  console.log('handlePostback called', senderId, recipientId, postback);
  if (postback.payload === 'yes') {
    let response: Response = {
      attachment: {
        type: ResponseAttachmentType.template,
        payload: {
          template_type: TemplateType.customer_feedback,
          title: "Rate your experience with our bot",
          subtitle: "Let the original provider know how you feel",
          button_title: "Rate Experience",
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
            url: "https://order-pizza-kfc.herokuapp.com/privacy.html"
          }
        }
      }
    }
    callSendAPI(senderId, recipientId, response);
  } else if (postback.payload === 'no') {
    let response: Response = {
      "attachment":{
        "type": ResponseAttachmentType.template,
        "payload":{
          "template_type": TemplateType.receipt,
          "recipient_name":"Stephane Crozatier",
          "order_number":"12345678902",
          "currency":"USD",
          "payment_method":"Visa 2345",        
          "order_url":"http://originalcoastclothing.com/order?order_id=123456",
          "timestamp":"1428444852",         
          "address":{
            "street_1":"1 Hacker Way",
            "street_2":"",
            "city":"Menlo Park",
            "postal_code":"94025",
            "state":"CA",
            "country":"US"
          },
          "summary":{
            "subtotal":75.00,
            "shipping_cost":4.95,
            "total_tax":6.19,
            "total_cost":56.14
          },
          "adjustments":[
            {
              "name":"New Customer Discount",
              "amount":20
            },
            {
              "name":"$10 Off Coupon",
              "amount":10
            }
          ],
          "elements":[
            {
              "title":"Classic White T-Shirt",
              "subtitle":"100% Soft and Luxurious Cotton",
              "quantity":2,
              "price":50,
              "currency":"USD",
              "image_url":"http://originalcoastclothing.com/img/whiteshirt.png"
            },
            {
              "title":"Classic Gray T-Shirt",
              "subtitle":"100% Soft and Luxurious Cotton",
              "quantity":1,
              "price":25,
              "currency":"USD",
              "image_url":"http://originalcoastclothing.com/img/grayshirt.png"
            }
          ]
        }
      }
    }
    callSendAPI(senderId, recipientId, response);
  }
}