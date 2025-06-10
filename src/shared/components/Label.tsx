type LabelProps<E extends React.ElementType> = {
  size?: "m" | "s";
  weight?: "regular" | "bold";
  color?: "default" | "danger" | "success" | "info" | "length";
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<E>;

export const Label = <E extends React.ElementType = "label">({
  size = "m",
  weight = "regular",
  color = "default",
  children,
  className = "",
  ...props
}: LabelProps<E>) => {
  const sizeClass = {
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
  }[color];

  return (
    <label className={`${sizeClass} ${weightClass} ${textColorClass} ${className}`} {...props}>
      {children}
    </label>
  );
};
