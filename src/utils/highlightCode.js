import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserHtml from "prettier/plugins/html";
import parserPostcss from "prettier/plugins/postcss";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);

const detectParser = (code) => {
  const trimmed = code.trimStart();
  if (trimmed.startsWith("<")) {
    return { parser: "html", plugins: [parserHtml] };
  }
  if (trimmed.includes("{") || trimmed.includes("const") || trimmed.includes("function")) {
    return { parser: "babel", plugins: [parserBabel] };
  }
  return { parser: "css", plugins: [parserPostcss] };
};

export const highlightCode = (code) => {
  if (typeof code !== "string") {
    return "";
  }

  let formatted = code.trimEnd();
  try {
    const { parser, plugins } = detectParser(code);
    formatted = prettier.format(code, {
      parser,
      plugins,
      semi: true,
      singleQuote: true,
      trailingComma: "es5",
    });
  } catch (err) {
    console.warn("Prettier format failed:", err);
  }

  const result = hljs.highlightAuto(formatted, ["javascript", "jsx", "html", "css"]);
  return result.value;
};
