import { useEffect } from "react";
import { LoadCanvasTemplateNoReload, loadCaptchaEnginge } from "react-simple-captcha";
import ResetIcon from "@/assets/icon/reset.svg?react";
import TextInput from "@/shared/components/TextInput";

/**
 * Example usage:
 *
 * import { useState } from "react";
 * import Captcha from "@/shared/components/Captcha";
 * import { validateCaptcha } from "react-simple-captcha";
 *
 * function CommentForm() {
 *   const [captchaInput, setCaptchaInput] = useState("");
 *
 *   const handleSubmit = (e: React.FormEvent) => {
 *     e.preventDefault();
 *
 *     if (!validateCaptcha(captchaInput)) {
 *       alert("자동입력 방지 숫자가 일치하지 않습니다.");
 *       return;
 *     }
 *
 *     // 제출 로직
 *     console.log("제출 완료");
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <Captcha value={captchaInput} onChange={setCaptchaInput} />
 *       <button type="submit">제출</button>
 *     </form>
 *   );
 * }
 */

type CaptchaSectionProps = {
  value: string;
  onChange: (value: string) => void;
};

function Captcha({ value, onChange }: CaptchaSectionProps) {
  useEffect(() => {
    loadCaptchaEnginge(6, "#6d7882", "black", "numbers");
  }, []);

  const handleRefresh = () => {
    loadCaptchaEnginge(6, "#6d7882", "black", "numbers");
    onChange(""); // 입력값 초기화
  };

  return (
    <div className="flex w-full flex-1 items-center gap-g3 mobile:flex-col mobile:items-start">
      <div className="flex items-center gap-g3">
        <div className="flex h-[48px] w-[211px] items-center justify-center bg-gray-50 mobile:w-[183px]">
          <LoadCanvasTemplateNoReload />
        </div>
        <button
          type="button"
          aria-label="자동입력 새로고침"
          className="flex h-[48px] w-[48px] items-center justify-center rounded-r3 border border-gray-60 bg-white"
          onClick={handleRefresh}
        >
          <ResetIcon className="h-icon4 w-icon4 text-gray-40" />
        </button>
      </div>

      <div className="min-w-[29.6rem] mobile:w-full">
        <TextInput
          id="captcha"
          placeholder="자동입력 방지 숫자 입력"
          height="medium"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Captcha;
