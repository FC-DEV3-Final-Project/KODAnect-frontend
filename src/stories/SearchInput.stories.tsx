import type { Meta, StoryObj } from "@storybook/react";
import SearchInput from "@/shared/components/SearchInput";
import { useState } from "react";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  render: () => {
    const [query, setQuery] = useState("");

    return (
      <div className="w-[31.3rem]">
        <SearchInput
          placeholder="검색어를 입력해 주세요"
          onSubmit={(keyword) => {
            setQuery(keyword);
            console.log("검색됨:", keyword);
          }}
        />
        <p className="mt-4 text-sm text-gray-500">현재 검색어: {query}</p>
      </div>
    );
  },
};
