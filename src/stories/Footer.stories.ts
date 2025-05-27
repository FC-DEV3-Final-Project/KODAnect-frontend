import type { Meta, StoryObj } from "@storybook/react";

import Footer from "@/widget/Footer";

const meta = {
  title: "widget/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light ",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
