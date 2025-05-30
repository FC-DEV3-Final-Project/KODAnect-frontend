import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "@/shared/components/Dropdown";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
    options: { control: { type: "object" } },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "선택하세요",
    options: ["전체", "공지사항", "이벤트", "FAQ"],
    onChange: (v: string) => console.log(v),
  },
};

export const Selected: Story = {
  args: {
    value: "이벤트",
    placeholder: "선택하세요",
    options: ["전체", "공지사항", "이벤트", "FAQ"],
    onChange: (v: string) => console.log(v),
  },
};
