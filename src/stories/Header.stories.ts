import type { Meta, StoryObj } from "@storybook/react";

import Header from "@/widget/Header";

const meta = {
  title: "KRDS/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light ",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
