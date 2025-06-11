import { forwardRef, useState } from "react";
import { Label } from "@/shared/components/Label";
import DangerIcon from "@/assets/icon/system-danger.svg";
import CompletedIcon from "@/assets/icon/system-success.svg";
import FocusIcon from "@/assets/icon/system-info.svg";
import Visible from "@/assets/icon/visibility.svg";
import Unvisible from "@/assets/icon/visibility-off.svg";
import DeleteIcon from "@/assets/icon/delete.svg";

/**
 * Example usage:
 *
 * const [inputValue, setInputValue] = useState("");
 * const [isVisible, setIsVisible] = useState(false);
 *
 * <div className="w-[30rem]">
 *   <TextInput
 *     id="password"
 *     height="medium"
 *     title="레이블"
 *     description="입력시 필요한 정보를 입력해 주세요"
 *     placeholder="비밀번호를 입력하세요"
 *     type={isVisible ? "text" : "password"}
 *     value={inputValue}
 *     onChange={(e) => setInputValue(e.target.value)}
 *     isVisible={isVisible}
 *     iconToggle
 *     focusMessage="입력하세요"
 *     onToggleIconClick={() => setIsVisible((prev) => !prev)}
 *   />
 * </div>
 *
 * - `height`: "large" | "medium" | "small" (기본값: "medium")
 * - `iconToggle`: 비밀번호 보기/숨기기 토글 버튼 여부
 * - `focusMessage`: input 포커스 시 보조 문구
 * - `completed`, `error`: 상태 메시지 표시
 * - 너비는 부모 요소에서 지정 (`w-full`, `min-w-[...]` 등)
 */

type TextInputProps = {
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

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      title,
      description,
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
        className="flex w-full flex-col justify-center gap-g2"
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
        <div className="relative w-full">
          <input
            ref={ref}
            id={inputId}
            type={props.type}
            className={`w-full ${heightClasses} ${radiusClass} ${fontSizeClass} border py-p6 pl-p6 focus:border-2 focus:border-secondary-50 ${getPaddingRightClass()} text-gray-95 focus:outline-none ${error ? "border-2 border-danger-50" : "border border-gray-60"} transition duration-150 ease-in-out`}
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

          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-g3">
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
            className="mt-1 flex items-center gap-g2"
          >
            <img src={DangerIcon} alt="에러" className="h-icon2 w-icon2" />
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
            className="mt-1 flex items-center gap-g2"
          >
            <img src={CompletedIcon} alt="완료" className="h-icon2 w-icon2" />
            <Label size="s" color="success">
              {completed}
            </Label>
          </p>
        )}

        {!error && !completed && isFocused && focusMessage && (
          <p
            id={focusId}
            role="status"
            aria-live="polite"
            className="mt-1 flex items-center gap-g2"
          >
            <img src={FocusIcon} alt="포커스" className="h-icon2 w-icon2" />
            <Label size="s" color="info">
              {focusMessage}
            </Label>
          </p>
        )}
      </div>
    );
  },
);

export default TextInput;
