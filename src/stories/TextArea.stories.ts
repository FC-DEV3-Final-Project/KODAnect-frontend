import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "@/shared/components/Textarea";

const meta = {
  title: "Components/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: { type: "text" } },
    description: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
    error: { control: { type: "text" } },
    completed: { control: { type: "text" } },
    focusMessage: { control: { type: "text" } },
    maxLength: { control: { type: "number" } },
    onFocus: { action: "focused" },
    onBlur: { action: "blurred" },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "text-area-id",
    title: "Title",
    description: "Description",
    placeholder: "Placeholder",
    maxLength: 100,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => console.log(e.target.value),
  },
};

export const Error: Story = {
  args: {
    id: "text-area-id-2",
    title: "Title",
    description: "Description",
    placeholder: "Placeholder",
    error: "Error",
    maxLength: 100,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => console.log(e.target.value),
  },
};

export const Completed: Story = {
  args: {
    id: "text-area-id-3",
    title: "Title",
    description: "Description",
    placeholder: "Placeholder",
    completed: "Completed",
    maxLength: 100,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => console.log(e.target.value),
  },
};

export const FocusMessage: Story = {
  args: {
    id: "text-area-id-4",
    title: "Title",
    description: "Description",
    placeholder: "Placeholder",
    focusMessage: "FocusMessage",
    maxLength: 100,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => console.log(e.target.value),
  },
};

export const NoMaxLength: Story = {
  args: {
    id: "text-area-id-5",
    title: "Title",
    description: "Description",
    placeholder: "Placeholder",
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => console.log(e.target.value),
  },
};

export const NoTitle: Story = {
  args: {
    id: "text-area-id-6",
    description: "Description",
    placeholder: "Placeholder",
    maxLength: 100,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => console.log(e.target.value),
  },
};

export const NoDescription: Story = {
  args: {
    id: "text-area-id-7",
    placeholder: "Placeholder",
    maxLength: 100,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => console.log(e.target.value),
  },
};

export const NoPlaceholder: Story = {
  args: {
    id: "text-area-id-8",
    title: "Title",
    description: "Description",
    maxLength: 100,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => console.log(e.target.value),
  },
};

export const OnlyTextarea: Story = {
  args: {
    id: "text-area-id-9",
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => console.log(e.target.value),
  },
};
