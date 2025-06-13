/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */
import { type ThemeDefinition, createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
import "vuetify/styles";

import "@mdi/font/css/materialdesignicons.css";

const rsmlLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#FBFDF8",
    surface: "#FBFDF8",
    "surface-bright": "#FFFFFF",
    "surface-light": "#E8F5E9",
    "surface-variant": "#DCE5DC",
    "on-surface-variant": "#404942",
    primary: "#129F64",
    "primary-darken-1": "#006D42",
    secondary: "#679078",
    "secondary-darken-1": "#4E6355",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
  variables: {
    "border-color": "#000000",
    "border-opacity": 0.12,
    "high-emphasis-opacity": 0.87,
    "medium-emphasis-opacity": 0.6,
    "disabled-opacity": 0.38,
    "idle-opacity": 0.04,
    "hover-opacity": 0.04,
    "focus-opacity": 0.12,
    "selected-opacity": 0.08,
    "activated-opacity": 0.12,
    "pressed-opacity": 0.12,
    "dragged-opacity": 0.08,
    "theme-kbd": "#212529",
    "theme-on-kbd": "#FFFFFF",
    "theme-code": "#F5F5F5",
    "theme-on-code": "#000000",
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md3,
  defaults: {
    VDivider: {
      style: "opacity: 1;",
    },
  },
  theme: {
    defaultTheme: "rsmlLightTheme",
    themes: {
      rsmlLightTheme,
    },
  },
});
