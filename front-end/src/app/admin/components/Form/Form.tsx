import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { fetchAddManualy } from "@/services/admin";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextsField from "../TextField/TextsField";

const Form = () => {
  const [title, setTitle] = useState("");
  const [urlContent, setUrlContent] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [content, setContent] = useState("");
  const [control, setControl] = useState(0);
  const [list, setList] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formData = {
      title,
      url: urlContent,
      urlToImage: urlImage,
      content,
      list,
    };

    handleTryCath(formData);
  };

  const handleTryCath = async (formData: any) => {
    try {
      await fetchAddManualy(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const getTexts = (text: string) => {
    setList((prev) => prev + " \n " + text);
    console.log(list);
  };

  return (
    <div className="max-w-screen-md mx-auto mt-40 px-2">
      <h1 className="text-5xl">Adicionar manualmente</h1>
      <div className="">
        <div className="flex items-center ">
          <TextField
            label="title"
            sx={{ width: "100%", padding: 0, margin: 0, marginTop: 5 }}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <p className="text-xs"></p>
      </div>
      <div className="my-10">
        <img src={urlImage} alt={title} className=" w-full max-h-96 mt-11" />
        <a className="text-xs max-w-screen-sm text-cyan-500" href={urlImage}>
          Origem da imagem
        </a>
        <div className="flex flex-col">
          <TextField
            label="urlToimage"
            sx={{ width: "100%", padding: 0, margin: 0, marginTop: 5 }}
            onChange={(e) => setUrlImage(e.target.value)}
            value={urlImage}
          />
        </div>
      </div>
      <article className="mt-11"></article>
      <TextField
        label="title"
        sx={{ width: "100%", padding: 0, margin: 0, marginTop: 5 }}
        onChange={(e) => setContent(e.target.value)}
        value={content}
        multiline
        rows={6}
      />

      <article>
        {control > 0 &&
          Array.from({ length: control }).map((_, index) => (
            <TextsField key={index} List={getTexts} />
          ))}
        <div className="w-full flex justify-center mt-10">
          <Button onClick={() => setControl((prev) => prev + 1)}>
            <AddCircleIcon />
          </Button>
        </div>
      </article>
      <div>
        <Button
          variant="contained"
          color="success"
          className="mr-2"
          sx={{ width: "100%", marginTop: "30px" }}
          onClick={handleClick}
        >
          Confirmar
        </Button>
      </div>
    </div>
  );
};

export default Form;
