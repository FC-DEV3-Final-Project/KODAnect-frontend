export type ButtonProps<E extends React.ElementType> = {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary" | "text";
  size?: "x-small" | "small" | "medium" | "large" | "x-large";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<E>;
