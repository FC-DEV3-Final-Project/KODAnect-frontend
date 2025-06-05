import type { Meta, StoryObj } from "@storybook/react";
import CommentArea from "@/shared/components/comment/CommentArea";

const meta: Meta<typeof CommentArea> = {
  title: "Components/CommentArea",
  component: CommentArea,
  parameters: {
    layout: "fullscreen", // 페이지 전체 영역 표시
  },
};

export default meta;

type Story = StoryObj<typeof CommentArea>;

export const Default: Story = {
  render: () => <CommentArea />,
};
