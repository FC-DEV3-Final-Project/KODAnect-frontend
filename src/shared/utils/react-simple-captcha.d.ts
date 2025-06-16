declare module "react-simple-captcha" {
  export function loadCaptchaEnginge(
    length: number,
    backgroundColor?: string,
    fontColor?: string,
    characterSet?: string, // 기본 문자셋 (사용 안 함 시 "")
    mode?: "numbers" | "upper" | "lower" | "all",
  ): void;
  export function LoadCanvasTemplate(): JSX.Element;
  export function LoadCanvasTemplateNoReload(): JSX.Element;
  export function validateCaptcha(userInput: string): boolean;
}
