import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const TextsField = ({
  List,
}: {
  List: (text: string, content: string) => void;
}) => {
  const [urlImage, setUrlImage] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const concat = () => {
    const concatText = `|* ${content}/{${urlImage}}/ *|`;

    List(title, concatText);
  };

  return (
    <div className="my-10">
      <TextField
        label="Title"
        sx={{ width: "100%", padding: 0, margin: 0, marginTop: 5 }}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <img src={urlImage} alt={title} className=" w-full max-h-96 " />

      <TextField
        label="urlToimage"
        sx={{ width: "100%", padding: 0, margin: 0, marginTop: 5 }}
        onChange={(e) => setUrlImage(e.target.value)}
        value={urlImage}
      />
      <TextField
        label="title"
        sx={{ width: "100%", padding: 0, margin: 0, marginTop: 5 }}
        onChange={(e) => setContent(e.target.value)}
        value={content}
        multiline
        rows={6}
      />
      <Button onClick={concat}>Confirmar</Button>
    </div>
  );
};

export default TextsField;
