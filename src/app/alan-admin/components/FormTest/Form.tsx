"use client";
/* eslint-disable @next/next/no-img-element */
import { Alert, AlertTitle, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchNews } from "@/services";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(
  () => import("../RichTextEditor/RichTextEditor"),
  {
    ssr: false,
  }
);
import { fetchAddManualy } from "@/services/admin";

const Form = () => {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [controlNews, setControlNews] = useState(0);
  const [isAdd, setIsAdd] = useState(false);
  const [err, setErr] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  const generateSitemap = async () => {
    let sitemap = ``;
    const { news } = await fetchNews(1);

    news.slice(0, 1).forEach((item: any) => {
      sitemap += `<url>
            <loc>https://techfatos.com/${
              item &&
              item.title &&
              item.title
                .toLowerCase()
                .replace(/[#?&/]/g, "-")
                .replace(/ /g, "-")
            }/${item.id}</loc>
            <lastmod>2024-09-13T15:20:23+00:00</lastmod>
            <priority>0.80</priority>
            </url>`;
    });

    const blob = new Blob([sitemap], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sample.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    setControlNews(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formData = {
      title,
      urlToImage: urlImage,
      content,
    };

    handleTryCath(formData);
  };

  const handleTryCath = async (formData: any) => {
    try {
      setIsAdd(true);
      setControlNews((prev) => prev + 1);
      await fetchAddManualy(formData);
      if (controlNews === 5) {
        generateSitemap();
      }
    } catch (error: any) {
      setIsAdd(true);
      setErr(error.message || error.data.message || "Erro desconhecido!");
    }
  };

  return (
    <div className="flex flex-col items-center mb-3 relative">
      <div className="max-w-screen-2xl flex flex-col px-2 ">
        <h3 className="text-xl mr-2">Gerar siteMap: </h3>
        <Button variant="contained" onClick={generateSitemap}>
          Gerar
        </Button>
      </div>
      <div className="my-10">
        <img src={urlImage} alt={title} className=" w-full max-h-96 mt-11" />
        <a className="text-xs max-w-screen-sm text-cyan-500" href={urlImage}>
          Origem da imagem
        </a>
        <div className="flex flex-col w-[90vw]">
          <TextField
            label="urlToimage"
            sx={{ width: "100%", padding: 0, margin: 0, marginTop: 5 }}
            onChange={(e) => setUrlImage(e.target.value)}
            value={urlImage}
          />
        </div>
      </div>
      <div className="max-w-7xl flex flex-col ">
        <div className="w-[90vw] mb-2">
          <TextField
            label="title"
            sx={{ width: "100%", padding: 0, margin: 0, marginTop: 5 }}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="w-full">
          <RichTextEditor onChange={handleEditorChange} />
        </div>
      </div>
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
        {isAdd && (
          <Alert severity={err ? "error" : "success"} sx={{ paddingBlock: 0 }}>
            <AlertTitle>{err ? err : "Sucess"}</AlertTitle>
          </Alert>
        )}
      </div>
    </div>
  );
};

const tags = [
  {
    tag: "<ul className='list-disc'></ul>",
  },
  {
    tag: "<ul className='list-decimal'></ul>",
  },
  {
    tag: "<h4 className='text-lg'></h4>",
  },
  {
    tag: "<li className='list-disc'></li>",
  },
  {
    tag: "<li className='list-decimal'></li>",
  },
  {
    tag: "<strong></strong>",
  },
  {
    tag: "<h3></h3>",
  },
  {
    tag: "<li></li>",
  },
];

export default Form;
