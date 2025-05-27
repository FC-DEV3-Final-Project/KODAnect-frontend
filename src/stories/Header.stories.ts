import type { Meta, StoryObj } from "@storybook/react";

import Header from "@/widget/header/Header";

const meta = {
  title: "widget/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
