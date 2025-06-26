type LabelProps<E extends React.ElementType> = {
  size?: "l" | "m" | "s";
  weight?: "regular" | "bold";
  color?: "default" | "danger" | "success" | "info" | "length" | "dark";
  children: React.ReactNode;
  className?: string;
  required?: boolean;
} & React.ComponentPropsWithoutRef<E>;

export const Label = <E extends React.ElementType = "label">({
  size = "m",
  weight = "regular",
  color = "default",
  children,
  className = "",
  required = false,
  ...props
}: LabelProps<E>) => {
  const sizeClass = {
    l: "text-b-lg mobile:text-b-sm",
    m: "text-b-md mobile:text-b-sm",
    s: "text-b-sm mobile:text-b-xs",
  }[size];

  const weightClass = {
    regular: "font-regular",
    bold: "font-bold",
  }[weight];

  const textColorClass = {
    default: "text-gray-70",
    danger: "text-danger-60",
    success: "text-success-60",
    info: "text-information-60",
    length: "text-secondary-60",
    dark: "text-gray-90",
  }[color];

  return (
    <label className={`${sizeClass} ${weightClass} ${textColorClass} ${className}`} {...props}>
      {required && <span className="pr-p3 text-danger-60">*</span>}
      {children}
    </label>
  );
};
