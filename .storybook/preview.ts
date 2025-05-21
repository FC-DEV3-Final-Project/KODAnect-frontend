import type { Preview } from "@storybook/react";
import "@/shared/styles/index.css"; // Tailwind CSS 포함된 글로벌 스타일 경로

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
