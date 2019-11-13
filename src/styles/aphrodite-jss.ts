import aphroditeJss from "aphrodite-jss";
import { create } from "jss";

const jss = create();

const importantSuffixPlugin = {
  onProcessStyle: style => {
    // Do something here.
    const newRule = {};
    if (Object.entries(style).length > 0) {
      for (let key in style) {
        newRule[key] = `${style[key]} !important`;
      }
      return newRule;
    }
    return style;
  }
};

jss.use(importantSuffixPlugin);

export const { css, StyleSheet } = aphroditeJss(jss);
