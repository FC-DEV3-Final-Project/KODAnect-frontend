import { forwardRef, useState } from "react";
import { Label } from "@/shared/components/Label";
import DangerIcon from "@/assets/icon/system-danger.svg";
import CompletedIcon from "@/assets/icon/system-success.svg";
import FocusIcon from "@/assets/icon/system-info.svg";
import Visible from "@/assets/icon/visibility.svg";
import Unvisible from "@/assets/icon/visibility-off.svg";
import DeleteIcon from "@/assets/icon/delete.svg";

import type { TextInputProps } from "@/shared/types/textInput.types";

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      title,
      description,
      helpText,
      error,
      focusMessage,
      completed,
      id,
      placeholder,
      height = "medium",
      iconToggle,
      isVisible,
      onToggleIconClick,
      onFocus,
      onBlur,
      value,
      onChange,
      onClear,
      ...props
    },
    ref,
  ) => {
    const inputId = id;
    const errorId = `${inputId}-error`;
    const completedId = `${inputId}-completed`;
    const focusId = `${inputId}-focus`;

    const [isFocused, setIsFocused] = useState(false);

    // describedby ids 조합 (접근성)
    const describedByIds = [
      error ? errorId : null,
      completed ? completedId : null,
      isFocused && focusMessage ? focusId : null,
    ]
      .filter(Boolean)
      .join(" ");

    const heightClasses = {
      large: "h-[5.6rem]",
      medium: "h-[4.8rem]",
      small: "h-[4rem]",
    }[height];

    const fontSizeClass = {
      large: "text-b-lg",
      medium: "text-b-md",
      small: "text-b-sm",
    }[height];

    const radiusClass = height === "large" ? "rounded-r4" : "rounded-r3";

    const getPaddingRightClass = () => {
      const buttonFlags = (iconToggle ? 1 : 0) + (value ? 2 : 0);

      switch (buttonFlags) {
        case 3:
          return "pr-20";
        case 1:
        case 2:
          return "pr-14";
        case 0:
        default:
          return "pr-6";
      }
    };

    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        const syntheticEvent = {
          target: { value: "" },
          currentTarget: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    return (
      <div
        role="group"
        aria-labelledby={`${inputId}-label`}
        className="flex flex-col justify-center gap-g1"
      >
        {title && (
          <Label id={`${inputId}-label`} htmlFor={inputId} size={"m"} color={"default"}>
            {title}
          </Label>
        )}
        {description && (
          <Label size={"s"} color={"default"}>
            {description}
          </Label>
        )}
        <div className="relative w-[36rem]">
          <input
            ref={ref}
            id={inputId}
            type={props.type}
            className={`w-full ${heightClasses} ${radiusClass} ${fontSizeClass} focus:border-primary focus:ring-primary border py-6 pl-4 ${getPaddingRightClass()} text-gray-95 focus:outline-none focus:ring-1 ${error ? "border-danger focus:ring-danger border-2" : "focus:ring-primary border border-gray-60"} transition duration-150 ease-in-out`}
            placeholder={placeholder}
            aria-describedby={describedByIds || undefined}
            aria-invalid={error ? "true" : "false"}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            value={value}
            onChange={onChange}
            {...props}
          />

          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
            {value && (
              <button type="button" onClick={handleClear}>
                <img src={DeleteIcon} alt="삭제" className="h-icon3 w-icon3" />
              </button>
            )}
            {iconToggle && (
              <button type="button" onClick={onToggleIconClick}>
                <img
                  src={isVisible ? Visible : Unvisible}
                  alt={isVisible ? "숨기기" : "보기"}
                  className="h-icon3 w-icon3"
                />
              </button>
            )}
          </div>
        </div>

        {error && (
          <p
            id={errorId}
            role="status"
            aria-live="assertive"
            className="mt-1 flex items-center gap-2"
          >
            <img src={DangerIcon} alt="에러" className="h-5 w-5" />
            <Label size="s" color="danger">
              {error}
            </Label>
          </p>
        )}

        {!error && completed && (
          <p
            id={completedId}
            role="status"
            aria-live="polite"
            className="mt-1 flex items-center gap-2"
          >
            <img src={CompletedIcon} alt="완료" className="h-5 w-5" />
            <Label size="s" color="success">
              {completed}
            </Label>
          </p>
        )}

        {!error && !completed && isFocused && focusMessage && (
          <p id={focusId} role="status" aria-live="polite" className="mt-1 flex items-center gap-2">
            <img src={FocusIcon} alt="포커스" className="h-5 w-5" />
            <Label size="s" color="info">
              {focusMessage}
            </Label>
          </p>
        )}
      </div>
    );
  },
);
