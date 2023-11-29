import { definePlugin } from "html-validate";
import MailtoAwesomeRule from "./plugin.html-validate.mailto-awesome.mjs";

const plugin = definePlugin({
  name: "pacific-medical-training",
  rules: {
    "mailto-awesome": MailtoAwesomeRule,
   },
  configs: {
    recommended: {
      rules: {
        "pacific-medical-training/mailto-awesome": "error",
      },
    },
  },
});

export default plugin;