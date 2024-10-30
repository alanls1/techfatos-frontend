import { Alert, AlertTitle, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { fetchAddManualy } from "@/services/admin";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextsField from "../TextField/TextsField";
import { fetchNews } from "@/services";

const Form = () => {
  const [title, setTitle] = useState("");
  const [urlContent, setUrlContent] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [content, setContent] = useState("");
  const [control, setControl] = useState(0);
  const [titleSecond, setTitleSecond] = useState("");
  const [list, setList] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [err, setErr] = useState("");

  const [controlNews, setControlNews] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formData = {
      title,
      url: urlContent,
      urlToImage: urlImage,
      content,
      list,
      titleSecond,
    };

    handleTryCath(formData);
  };

  const handleTryCath = async (formData: any) => {
    try {
      setIsAdd(true);
      resetInputs();
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

  const resetInputs = () => {
    setTitle("");
    setUrlImage("");
    setContent("");
    setControl(0);
  };

  const getTexts = (title: string, content: string) => {
    setList((prev) => prev + content);
    setTitleSecond((prev) => prev + "|* " + title);
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

  const copyToClipboard = (codeString: string) => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center mb-3 relative">
      <div className="max-w-screen-md flex flex-col px-2 ">
        <h3 className="text-xl mr-2">Gerar siteMap: </h3>
        <Button variant="contained" onClick={generateSitemap}>
          Gerar
        </Button>
      </div>
      <div className="flex flex-col justify-self-start">
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
          sx={{
            width: "100%",
            padding: 0,
            margin: 0,
            marginTop: 5,
            textarea: {
              resize: "block",
            },
          }}
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
          {isAdd && (
            <Alert
              severity={err ? "error" : "success"}
              sx={{ paddingBlock: 0 }}
            >
              <AlertTitle>{err ? err : "Sucess"}</AlertTitle>
            </Alert>
          )}
        </div>
      </div>
      <div className="fixed right-5 border">
        {tags.map((item, index) => (
          <div
            onClick={() => copyToClipboard(item.tag)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "4px",
              cursor: "pointer",
              backgroundColor: "#f9f9f9",
              position: "relative",
            }}
            key={index}
          >
            <pre className="bg-slate-950 text-white p-1">{item.tag}</pre>
            {copied && (
              <span
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  padding: "5px",
                  borderRadius: "3px",
                  fontSize: "12px",
                }}
              >
                Copied!
              </span>
            )}
          </div>
        ))}
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
