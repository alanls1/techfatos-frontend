/* eslint-disable @next/next/no-img-element */
"use client";
import { fetchNews } from "@/services";
import React, { useEffect, useState } from "react";
import BoxComponent from "../Box/Box";
import CardComponent from "../Card/Card";
import CustomizedList from "../List/List";
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
  const [data, setData] = useState<props[]>();
  const roter = useRouter();
  const params = useParams();

  console.log(params);

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
        const dataFetch = await fetchNews();

        setData(dataFetch.findAllItens);
      } catch (error) {}
    }

    const filter =
      data &&
      data.filter((item) => item.content.toLowerCase().includes("teste"));

    setData(filter);

    fetchData();
  }, []);

  return (
    <>
      {data && (
        <div className="mt-8 w-full flex justify-center flex-col items-center">
          <h2>Resultados encontrados: </h2>
          <div
            className="max-w-screen-lg grid mt-10"
            style={{ gridTemplateColumns: "2fr 1fr" }}
          >
            <div>
              {data.slice(7).map((item, key) => (
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
        </div>
      )}
    </>
  );
};

export default Search;
