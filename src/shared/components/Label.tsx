import type { LabelProps } from "@/shared/types/textInput.types";

export const Label = <E extends React.ElementType = "label">({
  size = "m",
  weight = "regular",
  color = "default",
  children,
  className = "",
  ...props
}: LabelProps<E>) => {
  const sizeClass = {
    m: "text-b-sm",
    s: "text-b-xs",
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
  }[color];

  return (
    <label className={`${sizeClass} ${weightClass} ${textColorClass} ${className}`} {...props}>
      {children}
    </label>
  );
};
