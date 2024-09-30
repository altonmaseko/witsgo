import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    ignores: ["cypress/*","screens/*","cypress.config.js"],
  },
    {
        files:["**/*.js"],
        rules: {
            "no-unused-vars": "warn",
            "use-isnan":"warn"
        },
        languageOptions: {
          globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.jest, // Include Jest globals here
            google: "readonly",
            axios: "readonly",
            polyline: "readonly",
          },
        },
      },
    ];