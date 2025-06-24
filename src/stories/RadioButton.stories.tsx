import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RadioButton from "@/shared/components/RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "Components/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

const options = [
  { label: "옵션 A", value: "a" },
  { label: "옵션 B", value: "b" },
  { label: "옵션 C", value: "c" },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState("a");

    return (
      <RadioButton name="demo" options={options} selectedValue={selected} onChange={setSelected} />
    );
  },
};
