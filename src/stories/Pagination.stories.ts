import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "@/shared/components/Pagination";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    totalPages: {
      control: {
        type: "number",
      },
    },
    currentPage: {
      control: {
        type: "number",
      },
    },
    onPageChange: { action: "clicked" },
    visiblePages: {
      control: {
        type: "number",
      },
      description:
        "페이지 번호 중 표시할 페이지 수: 항상 홀수개로 표시됩니다. 짝수를 넣으면 +1로 계산됩니다.",
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
    onPageChange: (page: number) => console.log(`Clicked page ${page}`),
    visiblePages: 10,
  },
};

export const Short: Story = {
  args: {
    totalPages: 99,
    currentPage: 99,
    onPageChange: (page: number) => console.log(`Clicked page ${page}`),
    visiblePages: 8,
  },
};
