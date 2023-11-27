// Documentation: https://html-validate.org/dev/using-api.html

import { FileSystemConfigLoader, HtmlValidate, formatterFactory } from "html-validate";
import { glob } from "glob";

const loader = new FileSystemConfigLoader(); // Load html-validate config from .htmlvalidate.json
const htmlValidate = new HtmlValidate(loader);
const formatter = formatterFactory("text");
const targets = glob.sync("./build/**/*.html");
const startTime = Date.now();
const timeLimit = 60; // seconds
var exitCode = 0;

const validateTargets = async () => {
  for (const target of targets) {
    if (Date.now() - startTime > timeLimit * 1000) {
      console.log("Time limit exceeded, exiting");
      process.exit(1);
    }

    try {
      const report = await htmlValidate.validateFile(target);
      if (!report.valid) {
        console.log(formatter(report.results));
        exitCode = 1;
      } else {
        //emoji
        console.log("✅ " + target);
      }
    } catch (error) {
      console.error(`Error validating ${target}:`, error);
      exitCode = 1;
    }
  }

  process.exit(exitCode);
};

validateTargets();
