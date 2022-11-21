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
  }
}

export interface Response {
  text?: string;
  attachment?: Attachment;
}