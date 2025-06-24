import type { Meta, StoryObj } from "@storybook/react";
import DonorCard from "@/features/members/component/DonorCard";

const meta: Meta<typeof DonorCard> = {
  title: "Components/DonorCard",
  component: DonorCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DonorCard>;

export const Default: Story = {
  args: {
    donorName: "홍길동",
    genderFlag: "F",
    donateAge: 30,
    donateDate: "2025-06-09",
    commentCount: 5,
    letterCount: 10,
  },
};
