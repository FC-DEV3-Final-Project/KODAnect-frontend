import type { Meta, StoryObj } from "@storybook/react";
import LetterCard from "@/shared/components/LetterCard";

const meta: Meta<typeof LetterCard> = {
  title: "Components/LetterCard",
  component: LetterCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LetterCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const today = new Date().toISOString().slice(0, 10);
const lastweek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

const lettersInfoItems = [
  { label: "기증자", value: "김철수" },
  { label: "추모자", value: "이영희" },
];
const recipientsInfoItems = [{ label: "수혜자", value: "김민지" }];
const storiesInfoItems = [{ label: "코디네이터", value: "이지선" }];

export const Letters: Story = {
  args: {
    size: "sm",
    letterNumber: 12345,
    title: "하늘나라 편지 카드입니다.",
    date: today,
    infoItems: lettersInfoItems,
    views: 123,
  },
};

export const Recipients: Story = {
  args: {
    letterNumber: 12345,
    title: "수혜자 편지 카드입니다.",
    date: today,
    infoItems: recipientsInfoItems,
    views: 123,
  },
};

export const Stories: Story = {
  args: {
    labelType: "story ",
    letterNumber: 12345,
    title: "기증 후 스토리 카드입니다.",
    date: lastweek,
    infoItems: storiesInfoItems,
    views: 123,
  },
};
