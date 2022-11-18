export enum ResponseAttachmentType {
  image = 'image',
  video = 'video',
  audio = 'audio',
  template = 'template',
}
export enum TemplateType {
  generic = 'generic',
  button = 'button',
  receipt = 'receipt',
  media = 'media',
  product = 'product',
  customer_feedback = 'customer_feedback',
}

export enum ButtonType {
  postback = 'postback',
}

interface Button {
  type: ButtonType;
  title: string;
  payload: string;
}

interface Element {
  title: string;
  subtitle?: string;
  image_url?: string;
  buttons?: Button[];
}

interface Attachment {
  type: ResponseAttachmentType;
  payload: {
    template_type: TemplateType;
    elements?: Element[];
  }
}

export interface Response {
  text?: string;
  attachment?: Attachment;
}