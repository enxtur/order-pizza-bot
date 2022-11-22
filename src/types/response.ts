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
export enum MediaType {
  image = 'image',
  video = 'video',
}

interface Element {
  title?: string;
  subtitle?: string;
  image_url?: string;
  buttons?: Button[];
  quantity?: number;
  price?: number;
  currency?: string;
  media_type?: MediaType;
  url?: string;
  attachment_id?: string;
}

export enum FeedbackQuestionType {
  csat = 'csat',
  nps = 'nps',
  ces = 'ces',
}

interface FeedbackQuestion {
  id: string;
  type: FeedbackQuestionType;
  title?: string;
  score_label?: string;
  score_option?: string;
  follow_up?: {
    type: string;
    placeholder: string;
  }
}

interface FeedbackSreens {
  questions: FeedbackQuestion[];
}

interface Attachment {
  type: ResponseAttachmentType;
  payload: {
    template_type: TemplateType;
    elements?: Element[];
    title?: string;
    subtitle?: string;
    button_title?: string;
    feedback_screens?: FeedbackSreens[];
    business_privacy?: {url: string};
    expires_in_days?: number;
    recipient_name?: string;
    order_number?: string;
    currency?: string;
    payment_method?: string;
    order_url?: string;
    timestamp?: string;
    address?: {
      street_1: string;
      street_2?: string;
      city: string;
      postal_code: string;
      state: string;
      country: string;
    };
    summary?: {
      subtotal: number;
      shipping_cost: number;
      total_tax: number;
      total_cost: number;
    },
    adjustments?: {
      name: string;
      amount: number;
    }[],
  }
}

export interface Response {
  text?: string;
  attachment?: Attachment;
}