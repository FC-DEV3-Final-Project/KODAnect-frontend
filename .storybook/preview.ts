import type { Preview } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import "@/shared/styles/index.css"; // Tailwind CSS 포함된 글로벌 스타일 경로
import "@krds-ui/core/dist/style.css";

const KODA_VIEWPORTS = {
  kodaPC: {
    name: "KODA PC",
    styles: {
      width: "1200px",
      height: "100%",
    },
  },
  kodaMobile: {
    name: "KODA Mobile",
    styles: {
      width: "767px",
      height: "100%",
    },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...KODA_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
    },
  },
};

export default preview;
