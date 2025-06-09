import React, { forwardRef, useState } from "react";
import { Label } from "@/shared/components/Label";
import DangerIcon from "@/assets/icon/system-danger.svg";
import CompletedIcon from "@/assets/icon/system-success.svg";
import FocusIcon from "@/assets/icon/system-info.svg";

/**
 * Example usage
 *
 * <TextArea
 *   id="textarea"
 *   title="제목"
 *   description="입력시 필요한 정보를 입력해 주세요"
 *   placeholder="내용을 입력하세요"
 *   focusMessage="입력하세요"
 *   maxLength={100}
 * />
 */

type TextAreaProps = {
  id: string;
  title?: string;
  description?: string;
  maxLength?: number;
  error?: string;
  completed?: string;
  focusMessage?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      title,
      description,
      id,
      placeholder,
      maxLength,
      error,
      completed,
      focusMessage,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [charCount, setCharCount] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    const errorId = `${id}-error`;
    const completedId = `${id}-completed`;
    const focusId = `${id}-focus`;

    const describedByIds = [
      error ? errorId : null,
      completed ? completedId : null,
      isFocused && focusMessage ? focusId : null,
    ]
      .filter(Boolean)
      .join(" ");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div
        role="group"
        aria-labelledby={`${id}-label`}
        className="flex h-full w-full flex-col justify-center gap-g2"
      >
        {title && (
          <Label id={`${id}-label`} htmlFor={id} color="default">
            {title}
          </Label>
        )}
        {description && (
          <Label size="s" color="default">
            {description}
          </Label>
        )}

        <div className="relative flex h-full w-full flex-col">
          <textarea
            ref={ref}
            id={id}
            className={`w-full flex-1 resize-none rounded-r3 border px-p6 py-p3 text-gray-70 transition duration-150 ease-in-out focus:border-2 focus:border-primary-50 focus:outline-none ${error ? "border-2 border-danger-50" : "border-gray-60"} `}
            placeholder={placeholder}
            maxLength={maxLength}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            onChange={handleChange}
            aria-describedby={describedByIds || undefined}
            aria-invalid={!!error}
            {...props}
          />

          <div className="flex min-h-[2rem] flex-shrink-0 items-center justify-between">
            {error ? (
              <p
                id={errorId}
                role="status"
                aria-live="assertive"
                className="flex items-center gap-g2"
              >
                <img src={DangerIcon} alt="에러" className="h-icon2 w-icon2" />
                <Label size="s" color="danger">
                  {error}
                </Label>
              </p>
            ) : completed ? (
              <p
                id={completedId}
                role="status"
                aria-live="polite"
                className="flex items-center gap-g2"
              >
                <img src={CompletedIcon} alt="완료" className="h-icon2 w-icon2" />
                <Label size="s" color="success">
                  {completed}
                </Label>
              </p>
            ) : isFocused && focusMessage ? (
              <p id={focusId} role="status" aria-live="polite" className="flex items-center gap-g2">
                <img src={FocusIcon} alt="포커스" className="h-icon2 w-icon2" />
                <Label size="s" color="info">
                  {focusMessage}
                </Label>
              </p>
            ) : (
              <div className="w-[1px]" />
            )}

            {maxLength && (
              <div className="flex items-center gap-g1">
                <Label size="s" color={error ? "danger" : "length"}>
                  {charCount}
                </Label>
                <Label size="s">/{maxLength}</Label>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default TextArea;
