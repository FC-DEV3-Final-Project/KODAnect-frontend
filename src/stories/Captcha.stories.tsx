import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Captcha from "@/shared/components/Captcha";
import { validateCaptcha } from "react-simple-captcha";
import Button from "@/shared/components/Button";

const meta: Meta<typeof Captcha> = {
  title: "Components/Captcha",
  component: Captcha,
};

export default meta;
type Story = StoryObj<typeof Captcha>;

export const Default: Story = {
  render: () => {
    const [captchaValue, setCaptchaValue] = useState("");

    const handleSubmit = () => {
      const isValid = validateCaptcha(captchaValue);
      alert(isValid ? "캡차 일치" : "일치하지 않음");
    };

    return (
      <div className="flex flex-col gap-4">
        <Captcha value={captchaValue} onChange={setCaptchaValue} />
        <Button variant="primary" size="medium" onClick={handleSubmit}>
          확인
        </Button>
      </div>
    );
  },
};
