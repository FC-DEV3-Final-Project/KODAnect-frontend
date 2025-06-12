import type { Meta, StoryObj } from "@storybook/react";
import { Tab, TABS } from "@/shared/components/Tab";

const meta = {
  title: "Components/Tab",
  component: Tab,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: {
        type: "select",
        options: TABS.map((tab) => tab.type),
      },
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "members",
  },
};
