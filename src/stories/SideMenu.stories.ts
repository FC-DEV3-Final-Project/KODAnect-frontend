import type { Meta, StoryObj } from "@storybook/react";

import SideMenu from "@/widget/SideMenu";
// 추후 sitemenu.ts 파일 merge되면 경로 수정 예정
import { SITE_MENU } from "@/shared/constant/mockSiteMenu";

const meta = {
  title: "widget/SideMenu",
  component: SideMenu,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light ",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SideMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedLabel: SITE_MENU[0]?.label ?? "장기·조직기증",
  },
};
