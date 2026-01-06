import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function MarkdownRemote({ url }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(url)
      .then(res => res.text())
      .then(txt => setContent(txt));
  }, [url]);

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {content}
    </ReactMarkdown>
  );
}
