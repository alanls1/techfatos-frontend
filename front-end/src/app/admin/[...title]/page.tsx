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
}

const Home = () => {
  const { title } = useParams();
  const [data, setData] = useState<props>();
  const [suggest, setSuggest] = useState([]);
  const roter = useRouter();

  const handleClick = (title: string, id: number) => {
    roter.push(
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

  let textFormat = data?.content.split(".") || [];
  const [textBlocks, setTextBlocks] = useState<string[]>([]);

  const handleTextChange = (index: number, newText: string) => {
    setTextBlocks(textFormat);
    const updatedTextBlocks = [...textFormat];
    updatedTextBlocks[index] = newText;

    setTextBlocks(updatedTextBlocks);
  };

  const handleSave = async () => {
    const fullText = textBlocks.join(".");

    await saveToDatabase(title[1], fullText);
  };

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

      <article>
        <p>
          confira mais sobre{" "}
          <a href={data?.url} className="text-cyan-500" target="_blank">
            Aqui!
          </a>
        </p>
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
