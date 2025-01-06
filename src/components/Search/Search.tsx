/* eslint-disable @next/next/no-img-element */
"use client";
import { search } from "@/services";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { props } from "@/types";
import Image from "next/image";

import "./style.css";
import { Pagination } from "@mui/material";
import CardToChange from "../CardToChange/CardToChange";

const Search = () => {
  const [data, setData] = useState<props[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const roter = useRouter();
  const { query } = useParams();
  const trim = decodeURIComponent(String(query))
    .toLowerCase()
    .replace(/[#?&/]/g, " ")
    .replace(/%20/g, " ")
    .replace(/\s+/g, " ")
    .trim();

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
        const { currentPage, news, totalPages } = await search(
          String(query),
          page
        );

        setData(news);
        setPage(currentPage);
        setTotalPage(totalPages);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handlePage = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      {data && (
        <div className="px-1 mt-4 mx-auto max-w-5xl w-full flex justify-center flex-col items-center">
          <h2 className="text-2xl my-3">Resultados encontrados para: {trim}</h2>
          <div className=" suggest">
            <div className="flex flex-wrap gap-3">
              {data.map((item, key) => (
                <CardToChange
                  urlImage={item.urlToImage}
                  author={item.author}
                  name={item.name}
                  title={item.title}
                  content={item.content}
                  date={item.publishedAt}
                  id={item.id}
                  key={item.id}
                />
              ))}
            </div>
          </div>
          <div className="mt-32 flex justify-center">
            <Pagination
              count={totalPage}
              color="primary"
              page={page}
              onChange={handlePage}
              size="medium"
              sx={{
                "@media (max-width: 400px)": {
                  ".css-1pm1cjd-MuiButtonBase-root-MuiPaginationItem-root ,.css-1gaup4j-MuiButtonBase-root-MuiPaginationItem-root":
                    {
                      minWidth: {
                        xs: "26px",
                      },
                      height: "26px",
                    },
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
