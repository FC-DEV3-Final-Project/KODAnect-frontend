import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DatePicker from "@/shared/components/calendar/DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [range, setRange] = useState<{ from: Date | null; to: Date | null }>({
      from: null,
      to: null,
    });

    return <DatePicker range={range} onRangeChange={setRange} />;
  },
};
