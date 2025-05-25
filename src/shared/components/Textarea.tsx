import React, { forwardRef, useState } from "react";
import { Label } from "@/shared/components/Label";
import DangerIcon from "@/assets/icon/system-danger.svg";
import CompletedIcon from "@/assets/icon/system-success.svg";
import FocusIcon from "@/assets/icon/system-info.svg";
import type { TextAreaProps } from "@/shared/types/textInput.types";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div
        role="group"
        aria-labelledby={`${id}-label`}
        className="flex flex-col justify-center gap-g2"
      >
        {title && (
          <Label id={`${id}-label`} htmlFor={id} color={"default"}>
            {title}
          </Label>
        )}
        {description && (
          <Label size={"s"} color="default">
            {description}
          </Label>
        )}
        <div className="relative w-[36rem]">
          <textarea
            ref={ref}
            id={id}
            className={`rounded-4 focus:border-primary focus:ring-primary h-[14.4rem] w-full resize-none border px-4 py-3 text-gray-70 transition duration-150 ease-in-out focus:outline-none focus:ring-1 ${error ? "border-danger focus:ring-danger border-2" : "focus:ring-primary border-gray-60"}`}
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

          <div className="flex min-h-[2rem] items-center justify-between">
            {error ? (
              <p
                id={errorId}
                role="status"
                aria-live="assertive"
                className="flex items-center gap-2"
              >
                <img src={DangerIcon} alt="에러" className="h-5 w-5" />
                <Label size="s" color="danger">
                  {error}
                </Label>
              </p>
            ) : completed ? (
              <p
                id={completedId}
                role="status"
                aria-live="polite"
                className="flex items-center gap-2"
              >
                <img src={CompletedIcon} alt="완료" className="h-5 w-5" />
                <Label size="s" color="success">
                  {completed}
                </Label>
              </p>
            ) : isFocused && focusMessage ? (
              <p id={focusId} role="status" aria-live="polite" className="flex items-center gap-2">
                <img src={FocusIcon} alt="포커스" className="h-5 w-5" />
                <Label size="s" color="info">
                  {focusMessage}
                </Label>
              </p>
            ) : (
              <div className="w-[1px]" /> // 빈 상태에도 오른쪽 카운트를 밀어주는 역할
            )}

            {/* 글자 수 카운트 */}
            {maxLength && (
              <div className="flex items-center gap-1">
                <Label size="s" color="default">
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
