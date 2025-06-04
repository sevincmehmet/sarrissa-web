import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const Index = ({ descData, handleDesc }) => {
  const { quill, quillRef } = useQuill();
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (quill && flag) {
      // Sadece ilk sefer varsayılan içeriği yükle
      quill.clipboard.dangerouslyPasteHTML(descData);
      setFlag(false);
    }
    if (quill) {
      // Text değiştiğinde handleDesc çağır
      quill.on("text-change", () => {
        handleDesc(quill.root.innerHTML);
      });
    }
  }, [quill, handleDesc]);

  return (
    <div>
      <div ref={quillRef} style={{ height: 200 }} dir="ltr" />
    </div>
  );
};

export default Index;
