/* eslint-disable @next/next/no-img-element */
"use client";
import { search } from "@/services";
import React, { useEffect, useState } from "react";
import CardComponent from "../Card/Card";
import { useParams, useRouter } from "next/navigation";

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

const Search = () => {
  const [data, setData] = useState<props[]>([]);
  const roter = useRouter();
  const { query } = useParams();

  const handleClick = (title: string, id: number) => {
    roter.push(
      `/${title
        .toLowerCase()
        .replace(/[#?&/]/g, "-")
        .replace(/ /g, "-")}/${id}`
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const dataFetch = await search(String(query));

        setData(dataFetch.findByQuery);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {data && (
        <div className="mt-8 w-full flex justify-center flex-col items-center">
          <h2>Resultados encontrados para: {query}</h2>
          <div className="lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm px-1 grid grid-cols-1 md:grid-cols-2 mt-10 gap-2">
            {data.map((item, key) => (
              <CardComponent
                content={item.content}
                name={item.name}
                title={item.title}
                urlImage={item.urlToImage}
                key={key}
                id={item.id}
                handleClick={handleClick}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
