import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "@/shared/components/TextInput";

const meta = {
  title: "Components/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    height: {
      control: { type: "select" },
      options: ["large", "medium", "small"],
    },
    title: {
      control: {
        type: "text",
      },
    },
    description: {
      control: {
        type: "text",
      },
    },
    error: {
      control: {
        type: "text",
      },
    },
    completed: {
      control: {
        type: "text",
      },
    },
    focusMessage: {
      control: {
        type: "text",
      },
    },
    placeholder: {
      control: {
        type: "text",
      },
    },
    iconToggle: {
      control: {
        type: "boolean",
      },
    },
    isVisible: {
      control: {
        type: "boolean",
      },
    },
    onToggleIconClick: {
      control: {
        action: "toggleClicked",
      },
    },
    onFocus: {
      control: {
        action: "focused",
      },
    },
    onBlur: {
      control: {
        action: "blurred",
      },
    },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "text-input",
    title: "이름",
    description: "입력하신 이름이 저장됩니다.",
    placeholder: "이름을 입력하세요",
    height: "medium",
  },
};

export const Error: Story = {
  args: {
    id: "text-input2",
    title: "이름",
    description: "입력하신 이름이 저장됩니다.",
    placeholder: "이름을 입력하세요",
    error: "이름을 입력하세요",
    height: "medium",
  },
};

export const Completed: Story = {
  args: {
    id: "text-input3",
    title: "이름",
    description: "입력하신 이름이 저장됩니다.",
    placeholder: "이름을 입력하세요",
    completed: "사용 가능한 이름 입니다.",
    height: "medium",
  },
};

export const FocusMessage: Story = {
  args: {
    id: "text-input4",
    title: "이름",
    description: "입력하신 이름이 저장됩니다.",
    placeholder: "영문, 숫자 포함 8자 이상",
    focusMessage: "8자 이상 입력해야 합니다.",
    height: "medium",
  },
};

export const ToggleIcon: Story = {
  args: {
    id: "text-input5",
    title: "이름",
    description: "입력하신 이름이 저장됩니다.",
    placeholder: "비밀번호를 입력해주세요",
    iconToggle: true,
    isVisible: false,
    height: "medium",
  },
};

export const WithDeleteButton: Story = {
  args: {
    id: "text-input6",
    title: "이름",
    description: "이름을 입력하면 삭제 아이콘이 생겨요",
    placeholder: "이름을 입력하세요",
    height: "medium",
  },
};

export const NoTitle: Story = {
  args: {
    id: "text-input6",
    description: "입력하신 이름이 저장됩니다.",
    placeholder: "이름",
    height: "medium",
  },
};

export const NoDescription: Story = {
  args: {
    id: "text-input10",
    title: "이름",
    placeholder: "이름을 입력하세요",
    height: "medium",
  },
};

export const OnlyInput: Story = {
  args: {
    id: "text-input11",
    placeholder: "이름을 입력하세요",
    height: "medium",
  },
};
