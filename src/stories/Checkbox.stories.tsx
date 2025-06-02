import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@/shared/components/Checkbox";
import { useState } from "react";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "toggled" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);

    return <Checkbox {...args} checked={checked} onChange={() => setChecked(!checked)} />;
  },
  args: {
    id: "checkbox-default",
    label: "약관에 동의합니다",
    checked: false,
    disabled: false,
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    id: "checkbox-disabled",
    label: "비활성 체크박스",
    checked: true,
    disabled: true,
    onChange: () => {},
  },
};
