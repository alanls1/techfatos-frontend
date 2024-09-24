"use client";
import { findById } from "@/services";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  author: string;
  content: string;
  createdAt: string;
  description: string;
  id: number;
  name: string;
  publishedAt: Date;
  title: string;
  updatedAt: Date;
  url: string;
  urlToImage: string;
  urls: string;
  titleSecond: string;
}

const Home = ({ path }: { path: string }) => {
  const { title } = useParams();
  const [data, setData] = useState<Props>();
  const [suggestions, setSuggestions] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleClick = (title: string, id: number) => {
    router.push(
      `/${path}/${title
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

  if (loading) return <div>Loading...</div>;

  const textFormat = data?.content ? data?.content.split("\n") : [];
  const textList = data?.urls ? data.urls.split("|*") : [];

  return (
    <div className="max-w-screen-md mx-auto mt-40 px-2">
      <h1 className="text-4xl">{data?.title}</h1>
      <p className="text-xs">
        {data?.publishedAt && formatDate(data.publishedAt)}
      </p>

      <div>
        {data?.urlToImage && (
          <img
            src={data?.urlToImage}
            alt={data?.author}
            className="w-full max-h-96 mt-11"
          />
        )}
        <a
          className="text-xs max-w-screen-sm text-cyan-500"
          href={data?.urlToImage}
        >
          Origem da imagem
        </a>
      </div>

      <article className="mt-11">
        {textFormat?.map((text, key) => (
          <p key={key} className="my-10">
            {text}
          </p>
        ))}
      </article>

      <article className="mt-11">
        {textList?.map((text, key) => {
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
              <h3 className="text-3xl">{title && title[key]}</h3>
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
              <p className="my-10">{content}</p>
            </div>
          );
        })}
      </article>

      <div>
        <h4 className="text-base mt-5">Sugestões para Você:</h4>
        <div className="overflow-x-auto overflow-y-hidden suggest">
          <div className="flex w-max">
            {suggestions.map(
              (item, key) =>
                item.id !== Number(title[1]) && (
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

export default Home;
