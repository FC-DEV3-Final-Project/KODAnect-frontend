type ButtonProps<E extends React.ElementType> = {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary";
  size?: "x-small" | "small" | "medium" | "large" | "x-large";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<E>;

export const Button = <E extends React.ElementType = "button">({
  type = "button",
  variant = "primary",
  size = "large",
  children,
  className = "",
  disabled = false,
  ...props
}: ButtonProps<E>) => {
  const baseStyles =
    "inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";

  const disabledStyles = "bg-gray-20 text-gray-50";

  const variantStyles: {
    style: string;
    disabledStyle: string;
  } = {
    primary: {
      style: "bg-primary-50 hover:bg-primary-60 text-gray-0",
      disabledStyle: disabledStyles,
    },
    secondary: {
      style: "bg-primary-5 hover:bg-primary-10 text-primary-60 border border-primary-50",
      disabledStyle: disabledStyles,
    },
    tertiary: {
      style: "bg-gray-0 hover:bg-gray-5 text-gray-90 border border-gray-60",
      disabledStyle: disabledStyles,
    },
  }[variant];

  const sizeStyles: { style: string } = {
    "x-small": {
      style: "px-[10px] min-w-[60px] min-h-[32px] rounded-r2 text-b-sm",
    },
    "small": {
      style: "px-[12px] min-w-[64px] min-h-[40px] rounded-r3 text-b-sm",
    },
    "medium": {
      style: "px-[16px] min-w-[78px] min-h-[48px] rounded-r3 text-b-md",
    },
    "large": {
      style: "px-[20px] min-w-[90px] min-h-[56px] rounded-r4 text-b-lg",
    },
    "x-large": {
      style: "px-[24px] min-w-[98px] min-h-[64px] rounded-r4 text-b-lg",
    },
  }[size];

  const buttonStyles = `
    ${baseStyles} 
    ${disabled ? variantStyles.disabledStyle : variantStyles.style} 
    ${sizeStyles.style} 
    ${disabled ? "cursor-not-allowed" : ""}
    ${className}
  `;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!disabled) {
        (event.currentTarget as HTMLButtonElement).click();
      }
    }
  };

  return (
    <button
      className={buttonStyles}
      onKeyDown={handleKeyDown}
      type={type}
      role="button"
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
