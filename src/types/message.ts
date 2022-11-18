export enum AttachmentPayloadType {
  image = 'image',
  video = 'video',
}

interface Attachment {
  type: AttachmentPayloadType;
  payload: {
    url: string;
    sticker_id?: number;
  };
}
export interface Message {
  mid: string;
  text?: string;
  attachments?: Attachment[];
}
export interface Postback {

}
interface Messaging {
  sender: {
    id: string;
  };
  recipient: {
    id: string;
  };
  timestamp: number;
  message?: Message;
  postback?: Postback;
}
interface Entry {
  id: string;
  time: number;
  messaging: Messaging[];
}

export interface WebhookBody {
  object: 'page';
  entry: Entry[];
}