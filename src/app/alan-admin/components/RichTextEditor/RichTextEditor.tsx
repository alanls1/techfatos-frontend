"use client";
import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const RichTextEditor = ({
  onChange,
}: {
  onChange: (content: string) => void;
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !editorRef.current || quillInstance.current) return;

    quillInstance.current = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
        ],
      },
    });

    quillInstance.current.on("text-change", () => {
      onChange(quillInstance.current?.root.innerHTML || "");
    });
  }, [isClient, onChange]);

  if (!isClient) return null;

  return <div ref={editorRef} style={{ minHeight: "600px" }} />;
};

export default RichTextEditor;
