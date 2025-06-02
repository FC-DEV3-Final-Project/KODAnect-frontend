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
    onChange: { action: "changed" }, // Storybook action 등록
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const dropdownOptions = [
  { label: "전체", value: "all" },
  { label: "공지사항", value: "notice" },
  { label: "이벤트", value: "event" },
  { label: "FAQ", value: "faq" },
];

export const Default: Story = {
  args: {
    value: "",
    placeholder: "선택하세요",
    options: dropdownOptions,
    onChange: () => {},
  },
};

export const Selected: Story = {
  args: {
    value: "event",
    placeholder: "선택하세요",
    options: dropdownOptions,
    onChange: () => {},
  },
};
