export type TextAreaProps = {
  id: string;
  title?: string;
  description?: string;
  maxLength?: number;
  error?: string;
  completed?: string;
  focusMessage?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
