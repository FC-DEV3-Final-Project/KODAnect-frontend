import type { Meta, StoryObj } from "@storybook/react";
import { Tab } from "@/shared/components/Tab";

const meta = {
  title: "Components/Tab",
  component: Tab,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tabs: {
      control: {
        type: "object",
      },
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      {
        label: "Tab1",
        content: "Tab1 Content",
      },
      {
        label: "Tab2",
        content: "Tab2 Content",
      },
      {
        label: "Tab3",
        content: "Tab3 Content",
      },
      {
        label: "Tab4",
        content: "Tab4 Content",
      },
    ],
  },
};
