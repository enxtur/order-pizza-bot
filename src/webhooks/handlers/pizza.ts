import { assets } from "../../assets";
import { callSendAPI } from "../../helpers/message";
import { ButtonType, MediaType, Response, ResponseAttachmentType, TemplateType } from "../../types/response";

export function pizza(senderId: string, recipientId: string) {
  assets.kfcProducts.forEach((product) => {
    const response: Response = {
      attachment: {
        type: ResponseAttachmentType.template,
        payload: {
          template_type: TemplateType.media,
          elements: [{
            media_type: MediaType.image,
            attachment_id: product.attachmentId,
            buttons: [{
              type: ButtonType.postback,
              title: "Add to cart",
              payload: "add_to_cart",
            }]
          }]
        }
      }
    }
    callSendAPI(senderId, recipientId, response);
  })
}