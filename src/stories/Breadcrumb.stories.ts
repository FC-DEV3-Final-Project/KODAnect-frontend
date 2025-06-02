import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "@/shared/components/Breadcrumb";

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "홈", onClick: () => console.log("홈") },
      { label: "1Depth", onClick: () => console.log("1Depth") },
      { label: "2Depth", onClick: () => console.log("2Depth") },
      { label: "3Depth", onClick: () => console.log("3Depth") },
      { label: "4Depth", onClick: () => console.log("4Depth") },
    ],
  },
};
