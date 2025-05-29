import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "@/shared/components/Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "text"],
    },
    size: {
      control: { type: "select" },
      options: ["x-small", "small", "medium", "large", "x-large"],
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
    onClick: { action: "clicked" },
  },
  args: {
    variant: "primary",
    size: "large",
    children: "버튼",
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const XSmall: Story = {
  args: {
    size: "x-small",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const XLarge: Story = {
  args: {
    size: "x-large",
  },
};
