import React, { useState } from "react";
import "./Article.css";
import ReactMarkdown from "react-markdown";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/markdown/markdown";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";

export default function Article() {
  const [input, setInput] = useState(
    "# This is a header\n\nAnd this is a paragraph\r\n"
  );
  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, height: "100%" }}
    >
      <CodeMirror
        value={input}
        options={{
          mode: "markdown",
          theme: "monokai",
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setInput(value);
        }}
        onChange={(editor, metadata, value) => {}}
      />
      <ReactMarkdown source={input} />
    </div>
  );
}
