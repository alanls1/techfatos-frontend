"use client";
import { findById } from "@/services";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import "./style.css";
import { Helmet } from "react-helmet";
import NotFound from "../404";
import { Box } from "@mui/material";
import Image from "next/image";
import { props } from "@/types";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CardToChange from "@/components/CardToChange/CardToChange";

const Home = () => {
  const { title } = useParams();
  const [data, setData] = useState<props>();
  const [suggestions, setSuggestions] = useState<props[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleClick = (title: string, id: number) => {
    router.push(
      `/${title
        .toLowerCase()
        .replace(/[#?&/]/g, "-")
        .replace(/ /g, "-")}/${id}`
    );
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response: any = await findById(title[1]);
        if (response?.findById) {
          setData(response.findById.findBy);
          setSuggestions(response.findById.suggest);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [title]);

  if (loading) return <Box sx={{ height: "100vh" }}>Loading...</Box>;
  if (!data) {
    return <NotFound />;
  }
  const textFormat = data?.content ? data?.content.split("\n") : [];
  const textList = data?.urls ? data.urls.split("|*") : [];

  return (
    <>
      {data && (
        <Helmet>
          <title>{data?.title}</title>
          <meta
            name="description"
            content={data?.content.substring(0, 160) || data.title}
          />
        </Helmet>
      )}
      <div className="max-w-screen-lg mx-auto mt-40 px-2">
        <h1 className="text-4xl">{data?.title}</h1>
        <p className="text-xs flex items-center">
          <AccessTimeIcon sx={{ fontSize: "1rem" }} />{" "}
          {data?.publishedAt && formatDate(data.publishedAt)}
        </p>

        <div>
          {data?.urlToImage && (
            <>
              {/* <img
                src={data?.urlToImage}
                alt={data?.title}
                className="w-full max-h-96 mt-11"
              /> */}
              <Image
                src={data?.urlToImage}
                alt={data?.title}
                className="w-full max-h-96 mt-11"
                width={300}
                height={300}
              />
              <a
                className="text-xs max-w-screen-sm text-cyan-500"
                href={data?.urlToImage}
              >
                Origem da imagem
              </a>
            </>
          )}
        </div>

        <article className="mt-11">
          {textFormat?.map((text, key) => (
            <div
              key={key}
              className="my-10 primary-content"
              dangerouslySetInnerHTML={{ __html: text }}
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
                  <h3 className="text-2xl ">{title && title[key]}</h3>
                  {imgSrc && (
                    <>
                      <img
                        src={imgSrc}
                        alt={title && title[key]}
                        className="w-full max-h-96 mt-11"
                      />
                      <a
                        className="text-xs max-w-screen-sm text-cyan-500"
                        href={imgSrc}
                      >
                        Origem da imagem
                      </a>
                    </>
                  )}
                  {content && (
                    <div
                      className="my-10 secondary-content"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  )}
                </div>
              );
            })}
        </article>

        <div>
          <h4 className=" mt-5 mb-5 font-bold text-3xl">
            Sugestões para Você:
          </h4>
          <div className=" suggest">
            <div className="max-w-7xl flex flex-wrap gap-3">
              {suggestions
                .slice(0, 7)
                .map(
                  (item, key) =>
                    item.id !== Number(title[1]) && (
                      <CardToChange
                        urlImage={item?.urlToImage}
                        author={item?.author}
                        name={item?.name}
                        title={item?.title}
                        content={item?.content}
                        date={item?.publishedAt}
                        id={item?.id}
                        key={item?.id}
                      />
                    )
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
