import React, { useState } from "react";
import "./Article.css";
import ReactMarkdown from "react-markdown";
import { Controlled as CodeMirror } from "react-codemirror2";
import CodeBlock from "./CodeBlock";
import "codemirror/mode/markdown/markdown";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
// import { Button } from "antd";

export default function Article() {
  const [input, setInput] = useState(
    "# This is a header\n\nAnd this is a paragraph\r\n"
  );
  return (
    <div className="site-layout-background aritcle-wrapper">
      <div className="editor-body">
        <div className="editor-wrapper">
          <CodeMirror
            value={input}
            options={{
              mode: "markdown",
              theme: "material",
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => {
              setInput(value);
              console.log('---value---',value);
              
            }}
            onChange={(editor, metadata, value) => {}}
          />
        </div>
        <div className="editor-preview">
          <ReactMarkdown
            source={input}
            escapeHtml={false}
            renderers={{ code: CodeBlock }}
          />
        </div>
      </div>
      <div className="editor-head"></div>
    </div>
  );
}
