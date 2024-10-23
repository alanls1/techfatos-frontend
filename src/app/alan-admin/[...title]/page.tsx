"use client";
import { findById } from "@/services";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./style.css";
import Text from "@/components/Text/Text";
import { Button } from "@mui/material";
import { saveToDatabase } from "@/services/admin";
import withAuth from "../withAuth";

interface props {
  author: string;
  content: string;
  creadtedAt: string;
  description: string;
  id: number;
  name: string;
  publishedAt: Date;
  title: string;
  updateAt: Date;
  url: string;
  urlToImage: string;
  urls: string;
  titleSecond: string;
}

const Home = () => {
  const { title } = useParams();
  const [data, setData] = useState<props>();
  const [suggest, setSuggest] = useState([]);
  const router = useRouter();

  const handleClick = (title: string, id: number) => {
    router.push(
      `/admin/${title
        .toLowerCase()
        .replace(/[#?&/]/g, "-")
        .replace(/ /g, "-")}/${id}`
    );
  };

  useEffect(() => {
    async function getDate() {
      const response: any = await findById(title[1]);

      if (response?.findById) {
        setData(response?.findById.findBy);
        setSuggest(response?.findById?.suggest);
      }
    }
    getDate();
  }, []);

  const date = new Date(data?.publishedAt ?? Date.now());
  const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();

  let textFormat = data?.content ? data?.content.split("\n") : [];

  let textListSplit = data?.urls ? data?.urls.split("|*") : [];

  let titleListSplit = data?.titleSecond ? data?.titleSecond.split("|*") : [];

  const [textBlocks, setTextBlocks] = useState<string[]>([]);
  const [textBlocksList, setTextBlocksList] = useState<string[]>([]);
  const [titleBlocks, setTitleBlocksList] = useState<string[]>([]);

  useEffect(() => {
    setTextBlocks(textFormat);
    setTextBlocksList(textListSplit);
    setTitleBlocksList(titleListSplit);
  }, [data]);

  const handleTextChange = (index: number, newText: string) => {
    const updatedTextBlocks = [...textBlocks];
    updatedTextBlocks[index] = newText;

    setTextBlocks(updatedTextBlocks);
  };
  const handleTextList = (index: number, newText: string) => {
    const updatedTextBlocks = [...textBlocksList];
    const takeUrl = updatedTextBlocks[index].slice(
      updatedTextBlocks[index].indexOf("/{") + 2,
      updatedTextBlocks[index].indexOf("}/")
    );

    updatedTextBlocks[index] = newText + ` /{${takeUrl}}/`;

    setTextBlocksList(updatedTextBlocks);
  };

  const handleTitleChange = (index: number, newText: string) => {
    const updatedTextBlocks = [...titleBlocks];
    updatedTextBlocks[index] = newText;

    setTitleBlocksList(updatedTextBlocks);
  };

  const handleSave = async () => {
    const fullText = textBlocks.join("\n");
    const fullTextList = textBlocksList.join(" |*");
    const fullTitleList = titleBlocks.join(" |*");

    await saveToDatabase(title[1], fullText, fullTextList, fullTitleList);
  };

  const textList = data?.urls ? data.urls.split("|*") : [];

  return (
    <div className="max-w-screen-md mx-auto mt-40 px-2">
      <div className="px-5">
        <h1 className="text-4xl ">{data?.title}</h1>

        <p className="text-xs">{`${day}/${month}/${date.getFullYear()}`}</p>
      </div>
      <div>
        <img
          src={data?.urlToImage}
          alt={data?.author}
          className=" w-full max-h-96 mt-11"
        />
        <a
          className="text-xs max-w-screen-sm text-cyan-500"
          href={data?.urlToImage}
        >
          Origem da imagem
        </a>
      </div>
      <article className="mt-11">
        {textFormat?.map((text, key) => (
          <Text
            text={text}
            key={key}
            index={key}
            handleTextChange={handleTextChange}
          />
        ))}
      </article>
      <article className="mt-11">
        {textList &&
          textList?.map((text, key) => {
            const title = data?.titleSecond.split("|*");
            const imgSrc = text
              .slice(text.indexOf("/{") + 2, text.indexOf("}/"))
              .trim();
            const content = text.slice(
              text.indexOf("|*") + 1,
              text.indexOf("/{")
            );

            return (
              <div key={key}>
                <h3 className="text-3xl">
                  {title && (
                    <Text
                      handleTextChange={handleTitleChange}
                      index={key}
                      text={title[key]}
                      key={key}
                    />
                  )}
                </h3>
                {imgSrc && (
                  <>
                    <img
                      src={imgSrc}
                      alt={title && title[key]}
                      className="w-full max-h-96 mt-11"
                    />
                    <a
                      className="text-xs max-w-screen-sm text-cyan-500 under"
                      href={imgSrc}
                    >
                      Origem da imagem
                    </a>
                  </>
                )}
                <div className="my-10">
                  <Text
                    handleTextChange={handleTextList}
                    index={key}
                    text={content}
                    key={key}
                  />
                </div>
              </div>
            );
          })}
      </article>

      <div>
        <Button
          variant="contained"
          color="success"
          className="mr-2"
          onClick={handleSave}
          sx={{ width: "300px", marginTop: "30px" }}
        >
          Confirmar
        </Button>
      </div>
      <div>
        <h4 className="text-base mt-5">Sugestões para Você: </h4>
        <div className="overflow-x-auto overflow-y-hidden suggest">
          <div className="flex  w-max">
            {suggest.map(
              (item: props, key) =>
                item.id != Number(title[1]) && (
                  <div
                    key={key}
                    className="w-80 mr-3 relative cursor-pointer"
                    onClick={() => handleClick(item.title, item.id)}
                  >
                    <img
                      src={item.urlToImage}
                      alt={item.title}
                      className="w-full h-full"
                    />
                    <div className="w-full h-full bg-[#1e293b6b] absolute top-0 left-0"></div>
                    <div className="w-full h-1/3 bg-[#1e293bbb] absolute bottom-0 left-0">
                      <h6 className="text-slate-50 ps-1">{item.title}</h6>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
