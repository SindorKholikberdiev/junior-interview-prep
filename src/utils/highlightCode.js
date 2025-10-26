import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);

export const highlightCode = (code) => {
  if (typeof code !== "string") {
    return "";
  }

  const trimmed = code.trimEnd();
  const result = hljs.highlightAuto(trimmed, ["javascript", "jsx", "html", "css"]);
  return result.value;
};
