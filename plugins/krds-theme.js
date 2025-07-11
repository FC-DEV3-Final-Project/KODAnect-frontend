const plugin = require("tailwindcss/plugin");

module.exports = plugin(
  function ({ addBase, addUtilities, addComponents, theme }) {
    addBase({
      ":root": {
        // point 컬러로 변경
        "--krds-color-primary-5": "#fbeff0",
        "--krds-color-primary-10": "#f5d6d9",
        "--krds-color-primary-20": "#ebadb2",
        "--krds-color-primary-30": "#e0858c",
        "--krds-color-primary-40": "#d65c66",
        "--krds-color-primary-50": "#d63d4a",
        "--krds-color-primary-60": "#ab2b36",
        "--krds-color-primary-70": "#7a1f26",
        "--krds-color-primary-80": "#521419",
        "--krds-color-primary-90": "#310c0f",
        "--krds-color-primary-95": "#21080a",

        "--krds-color-secondary-5": "#eef2f7",
        "--krds-color-secondary-10": "#d6e0eb",
        "--krds-color-secondary-20": "#bacbde",
        "--krds-color-secondary-30": "#90b0d5",
        "--krds-color-secondary-40": "#6b96c7",
        "--krds-color-secondary-50": "#346fb2",
        "--krds-color-secondary-60": "#1c589c",
        "--krds-color-secondary-70": "#063a74",
        "--krds-color-secondary-80": "#052b57",
        "--krds-color-secondary-90": "#031f3f",
        "--krds-color-secondary-95": "#02162c",

        "--krds-color-gray-0": "#ffffff",
        "--krds-color-gray-5": "#f4f5f6",
        "--krds-color-gray-10": "#e6e8ea",
        "--krds-color-gray-20": "#cdd1d5",
        "--krds-color-gray-30": "#b1b8be",
        "--krds-color-gray-40": "#8a949e",
        "--krds-color-gray-50": "#6d7882",
        "--krds-color-gray-60": "#58616a",
        "--krds-color-gray-70": "#464c53",
        "--krds-color-gray-80": "#33363d",
        "--krds-color-gray-90": "#1e2124",
        "--krds-color-gray-95": "#131416",
        "--krds-color-gray-100": "#000000",

        "--krds-color-danger-5": "#fdefec",
        "--krds-color-danger-10": "#fcdfd9",
        "--krds-color-danger-20": "#f7afa1",
        "--krds-color-danger-30": "#f48771",
        "--krds-color-danger-40": "#f05f42",
        "--krds-color-danger-50": "#de3412",
        "--krds-color-danger-60": "#bd2c0f",
        "--krds-color-danger-70": "#8a240f",
        "--krds-color-danger-80": "#5c180a",
        "--krds-color-danger-90": "#390d05",
        "--krds-color-danger-95": "#260903",

        "--krds-color-information-5": "#e7f4fe",
        "--krds-color-information-10": "#d3ebfd",
        "--krds-color-information-20": "#9ed2fa",
        "--krds-color-information-30": "#5fb5f7",
        "--krds-color-information-40": "#2098f3",
        "--krds-color-information-50": "#0b78cb",
        "--krds-color-information-60": "#096ab3",
        "--krds-color-information-70": "#085691",
        "--krds-color-information-80": "#053961",
        "--krds-color-information-90": "#03253f",
        "--krds-color-information-95": "#021a2c",

        "--krds-color-warning-5": "#fff3db",
        "--krds-color-warning-10": "#ffe0a3",
        "--krds-color-warning-20": "#ffc95c",
        "--krds-color-warning-30": "#ffb114",
        "--krds-color-warning-40": "#c78500",
        "--krds-color-warning-50": "#9e6a00",
        "--krds-color-warning-60": "#8a5c00",
        "--krds-color-warning-70": "#614100",
        "--krds-color-warning-80": "#422c00",
        "--krds-color-warning-90": "#2e1f00",
        "--krds-color-warning-95": "#241800",

        "--krds-color-success-5": "#eaf6ec",
        "--krds-color-success-10": "#d8eedd",
        "--krds-color-success-20": "#a9dab4",
        "--krds-color-success-30": "#7ec88e",
        "--krds-color-success-40": "#3fa654",
        "--krds-color-success-50": "#228738",
        "--krds-color-success-60": "#267337",
        "--krds-color-success-70": "#285d33",
        "--krds-color-success-80": "#1f4727",
        "--krds-color-success-90": "#122b18",
        "--krds-color-success-95": "#0e2012",

        "--krds-number-0": "0rem",
        "--krds-number-1": "0.1rem",
        "--krds-number-2": "0.2rem",
        "--krds-number-3": "0.4rem",
        "--krds-number-4": "0.6rem",
        "--krds-number-5": "0.8rem",
        "--krds-number-6": "1rem",
        "--krds-number-7": "1.2rem",
        "--krds-number-8": "1.6rem",
        "--krds-number-9": "2rem",
        "--krds-number-10": "2.4rem",
        "--krds-number-11": "2.8rem",
        "--krds-number-12": "3.2rem",
        "--krds-number-13": "3.6rem",
        "--krds-number-14": "4rem",
        "--krds-number-15": "4.4rem",
        "--krds-number-16": "4.8rem",
        "--krds-number-17": "5.6rem",
        "--krds-number-18": "6.4rem",
        "--krds-number-19": "7.2rem",
        "--krds-number-20": "8rem",
        "--krds-number-21": "9.6rem",
        "--krds-number-max": "100rem",

        "--krds-font-display-large": "6rem",
        "--krds-font-display-medium": "4.4rem",
        "--krds-font-display-small": "3.6rem",

        "--krds-font-heading-xlarge": "4rem",
        "--krds-font-heading-large": "3.2rem",
        "--krds-font-heading-medium": "2.4rem",
        "--krds-font-heading-small": "1.9rem",
        "--krds-font-heading-xsmall": "1.7rem",
        "--krds-font-heading-xxsmall": "1.5rem",

        "--krds-font-body-large": "1.9rem",
        "--krds-font-body-medium": "1.7rem",
        "--krds-font-body-small": "1.5rem",
        "--krds-font-body-xsmall": "1.3rem",

        /* Font weight */
        "--krds-typo-font-weight-regular": "400",
        "--krds-typo-font-weight-bold": "700",

        /* Line Height */
        "--krds-line-height": "1.5",

        /* Letter Spacing */
        "--krds-typo-letter-spacing-0": "0rem",
        "--krds-typo-letter-spacing-1": "0.1rem",

        /* Radius */
        "--krds-radius-1": "var(--krds-number-2)",
        "--krds-radius-2": "var(--krds-number-3)",
        "--krds-radius-3": "var(--krds-number-4)",
        "--krds-radius-4": "var(--krds-number-5)",
        "--krds-radius-5": "var(--krds-number-6)",
        "--krds-radius-6": "var(--krds-number-7)",

        /* Gap */
        "--krds-gap-1": "var(--krds-number-2)",
        "--krds-gap-2": "var(--krds-number-3)",
        "--krds-gap-3": "var(--krds-number-5)",
        "--krds-gap-4": "var(--krds-number-7)",
        "--krds-gap-5": "var(--krds-number-8)",
        "--krds-gap-6": "var(--krds-number-9)",
        "--krds-gap-7": "var(--krds-number-10)",
        "--krds-gap-8": "var(--krds-number-12)",
        "--krds-gap-9": "var(--krds-number-14)",
        "--krds-gap-10": "var(--krds-number-16)",
        "--krds-gap-11": "var(--krds-number-18)",
        "--krds-gap-12": "var(--krds-number-20)",

        /* Padding */
        "--krds-padding-1": "var(--krds-number-2)",
        "--krds-padding-2": "var(--krds-number-3)",
        "--krds-padding-3": "var(--krds-number-5)",
        "--krds-padding-4": "var(--krds-number-6)",
        "--krds-padding-5": "var(--krds-number-7)",
        "--krds-padding-6": "var(--krds-number-8)",
        "--krds-padding-7": "var(--krds-number-9)",
        "--krds-padding-8": "var(--krds-number-10)",
        "--krds-padding-9": "var(--krds-number-12)",
        "--krds-padding-10": "var(--krds-number-14)",

        /* Shadow */
        "--krds-shadow-1": "0px 2px 2px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.05)",
        "--krds-shadow-2": "0px 4px 8px rgba(0, 0, 0, 0.08), 0px 2px 2px rgba(0, 0, 0, 0.05)",
        "--krds-shadow-3": "0px 8px 16px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.08)",
        "--krds-shadow-4": "0px 16px 24px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.08)",

        /* Icon Size */
        "--krds-icon-size-12": "var(--krds-number-7)",
        "--krds-icon-size-16": "var(--krds-number-8)",
        "--krds-icon-size-20": "var(--krds-number-9)",
        "--krds-icon-size-24": "var(--krds-number-10)",
        "--krds-icon-size-32": "var(--krds-number-12)",
        "--krds-icon-size-40": "var(--krds-number-14)",
      },
    });
    addBase({
      "@media (max-width: 767px)": {
        ":root": {
          "--krds-font-display-large": "4.4rem",
          "--krds-font-display-medium": "3.2rem",
          "--krds-font-display-small": "2.8rem",

          "--krds-font-heading-xlarge": "2.8rem",
          "--krds-font-heading-large": "2.4rem",
          "--krds-font-heading-medium": "2.2rem",
          "--krds-font-heading-small": "1.9rem",
          "--krds-font-heading-xsmall": "1.7rem",
          "--krds-font-heading-xxsmall": "1.5rem",

          "--krds-font-body-large": "1.9rem",
          "--krds-font-body-medium": "1.7rem",
          "--krds-font-body-small": "1.5rem",
          "--krds-font-body-xsmall": "1.3rem",
        },
      },
    });
  },
  {
    theme: {
      extend: {
        colors: {
          primary: {
            5: "var(--krds-color-primary-5)",
            10: "var(--krds-color-primary-10)",
            20: "var(--krds-color-primary-20)",
            30: "var(--krds-color-primary-30)",
            40: "var(--krds-color-primary-40)",
            50: "var(--krds-color-primary-50)",
            60: "var(--krds-color-primary-60)",
            70: "var(--krds-color-primary-70)",
            80: "var(--krds-color-primary-80)",
            90: "var(--krds-color-primary-90)",
            95: "var(--krds-color-primary-95)",
          },
          secondary: {
            5: "var(--krds-color-secondary-5)",
            10: "var(--krds-color-secondary-10)",
            20: "var(--krds-color-secondary-20)",
            30: "var(--krds-color-secondary-30)",
            40: "var(--krds-color-secondary-40)",
            50: "var(--krds-color-secondary-50)",
            60: "var(--krds-color-secondary-60)",
            70: "var(--krds-color-secondary-70)",
            80: "var(--krds-color-secondary-80)",
            90: "var(--krds-color-secondary-90)",
            95: "var(--krds-color-secondary-95)",
          },
          gray: {
            0: "var(--krds-color-gray-0)",
            5: "var(--krds-color-gray-5)",
            10: "var(--krds-color-gray-10)",
            20: "var(--krds-color-gray-20)",
            30: "var(--krds-color-gray-30)",
            40: "var(--krds-color-gray-40)",
            50: "var(--krds-color-gray-50)",
            60: "var(--krds-color-gray-60)",
            70: "var(--krds-color-gray-70)",
            80: "var(--krds-color-gray-80)",
            90: "var(--krds-color-gray-90)",
            95: "var(--krds-color-gray-95)",
          },
          danger: {
            5: "var(--krds-color-danger-5)",
            10: "var(--krds-color-danger-10)",
            20: "var(--krds-color-danger-20)",
            30: "var(--krds-color-danger-30)",
            40: "var(--krds-color-danger-40)",
            50: "var(--krds-color-danger-50)",
            60: "var(--krds-color-danger-60)",
            70: "var(--krds-color-danger-70)",
            80: "var(--krds-color-danger-80)",
            90: "var(--krds-color-danger-90)",
            95: "var(--krds-color-danger-95)",
          },
          information: {
            5: "var(--krds-color-information-5)",
            10: "var(--krds-color-information-10)",
            20: "var(--krds-color-information-20)",
            30: "var(--krds-color-information-30)",
            40: "var(--krds-color-information-40)",
            50: "var(--krds-color-information-50)",
            60: "var(--krds-color-information-60)",
            70: "var(--krds-color-information-70)",
            80: "var(--krds-color-information-80)",
            90: "var(--krds-color-information-90)",
            95: "var(--krds-color-information-95)",
          },
          success: {
            5: "var(--krds-color-success-5)",
            10: "var(--krds-color-success-10)",
            20: "var(--krds-color-success-20)",
            30: "var(--krds-color-success-30)",
            40: "var(--krds-color-success-40)",
            50: "var(--krds-color-success-50)",
            60: "var(--krds-color-success-60)",
            70: "var(--krds-color-success-70)",
            80: "var(--krds-color-success-80)",
            90: "var(--krds-color-success-90)",
            95: "var(--krds-color-success-95)",
          },
        },

        //폰트 사이즈
        fontSize: {
          "d-lg": "var(--krds-font-display-large)",
          "d-md": "var(--krds-font-display-medium)",
          "d-sm": "var(--krds-font-display-small)",

          "h-xl": "var(--krds-font-heading-xlarge)",
          "h-lg": "var(--krds-font-heading-large)",
          "h-md": "var(--krds-font-heading-medium)",
          "h-sm": "var(--krds-font-heading-small)",
          "h-xs": "var(--krds-font-heading-xsmall)",
          "h-2xs": "var(--krds-font-heading-xxsmall)",

          "b-lg": "var(--krds-font-body-large)",
          "b-md": "var(--krds-font-body-medium)",
          "b-sm": "var(--krds-font-body-small)",
          "b-xs": "var(--krds-font-body-xsmall)",
        },

        //폰트 굵기
        fontWeight: {
          reg: "var(--krds-typo-font-weight-regular)",
          bold: "var(--krds-typo-font-weight-bold)",
        },

        //자간
        letterSpacing: {
          0: "var(--krds-typo-letter-spacing-0)",
          1: "var(--krds-typo-letter-spacing-1)",
        },

        //줄간격
        lineHeight: {
          base: "var(--krds-line-height)",
        },

        //border radius
        borderRadius: {
          r1: "var(--krds-radius-1)",
          r2: "var(--krds-radius-2)",
          r3: "var(--krds-radius-3)",
          r4: "var(--krds-radius-4)",
          r5: "var(--krds-radius-5)",
          r6: "var(--krds-radius-6)",
        },

        // 간격
        spacing: {
          // gap
          g1: "var(--krds-gap-1)",
          g2: "var(--krds-gap-2)",
          g3: "var(--krds-gap-3)",
          g4: "var(--krds-gap-4)",
          g5: "var(--krds-gap-5)",
          g6: "var(--krds-gap-6)",
          g7: "var(--krds-gap-7)",
          g8: "var(--krds-gap-8)",
          g9: "var(--krds-gap-9)",
          g10: "var(--krds-gap-10)",
          g11: "var(--krds-gap-11)",
          g12: "var(--krds-gap-12)",

          // padding (같은 spacing으로 활용)
          p1: "var(--krds-padding-1)",
          p2: "var(--krds-padding-2)",
          p3: "var(--krds-padding-3)",
          p4: "var(--krds-padding-4)",
          p5: "var(--krds-padding-5)",
          p6: "var(--krds-padding-6)",
          p7: "var(--krds-padding-7)",
          p8: "var(--krds-padding-8)",
          p9: "var(--krds-padding-9)",
          p10: "var(--krds-padding-10)",

          // icon size
          icon1: "var(--krds-icon-size-12)",
          icon2: "var(--krds-icon-size-16)",
          icon3: "var(--krds-icon-size-20)",
          icon4: "var(--krds-icon-size-24)",
          icon5: "var(--krds-icon-size-32)",
          icon6: "var(--krds-icon-size-40)",
        },

        // 그림자
        boxShadow: {
          s1: "var(--krds-shadow-1)",
          s2: "var(--krds-shadow-2)",
          s3: "var(--krds-shadow-3)",
          s4: "var(--krds-shadow-4)",
        },
      },
    },
  },
);
