import React, { useEffect } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
// 设置高亮的语言
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
// 设置高亮样式
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Props {
  language: string;
  value: string;
}

export default function CodeBlock({ language, value = "" }: Props) {
  useEffect(() => {
    SyntaxHighlighter.registerLanguage("javascript", javascript);
    SyntaxHighlighter.registerLanguage("python", python);
  }, []);

  return (
    <SyntaxHighlighter language={language} style={atomOneDark}>
      {value}
    </SyntaxHighlighter>
  );
}
