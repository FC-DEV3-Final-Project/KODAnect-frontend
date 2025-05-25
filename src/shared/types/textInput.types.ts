export type TextInputProps = {
  id: string;
  title?: string;
  description?: string;
  error?: string;
  focusMessage?: string;
  completed?: string;
  height?: "large" | "medium" | "small";
  iconToggle?: boolean;
  isVisible?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onToggleIconClick?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type LabelProps<E extends React.ElementType> = {
  size?: "m" | "s";
  weight?: "regular" | "bold";
  color?: "default" | "danger" | "success" | "info";
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<E>;
