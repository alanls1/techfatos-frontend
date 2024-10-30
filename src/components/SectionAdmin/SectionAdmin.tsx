/* eslint-disable @next/next/no-img-element */
"use client";
import { fetchNews } from "@/services";
import React, { useEffect, useState } from "react";
import BoxComponent from "../BoxAdmin/Box";
import CardComponent from "../CardAdmin/Card";
import { useRouter } from "next/navigation";
import { props } from "@/types";
import { Pagination } from "@mui/material";

const Section = () => {
  const [data, setData] = useState<props[]>();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const roter = useRouter();

  const handleClick = (title: string, id: number) => {
    router.push(
      `alan-admin/${title
        .toLowerCase()
        .replace(/[#?&/]/g, "-")
        .replace(/ /g, "-")}/${id}`
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { currentPage, news, totalPages } = await fetchNews(page);

        setData(news);
        setPage(currentPage);
        setTotalPage(totalPages);
      } catch (error) {}
    }

    fetchData();
  }, [page]);

  const handlePage = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      {data && (
        <div className="mt-8 w-full flex justify-center flex-col items-center">
          <div className="max-w-screen-lg">
            <BoxComponent
              urlImage={data[0].urlToImage}
              author={data[0].author}
              name={data[0].name}
              title={data[0].title}
              id={data[0]?.id}
              handleClick={handleClick}
            />
          </div>
          <div className="max-w-screen-lg  grid grid-cols-2 mt-10 gap-12">
            <BoxComponent
              urlImage={data[1].urlToImage}
              author={data[1].author}
              name={data[1].name}
              title={data[1].title}
              id={data[1]?.id}
              handleClick={handleClick}
            />
            <BoxComponent
              urlImage={data[2].urlToImage}
              author={data[2].author}
              name={data[2].name}
              title={data[2].title}
              id={data[2]?.id}
              handleClick={handleClick}
            />
          </div>
          <div className="max-w-screen-lg  grid grid-cols-2 mt-10 gap-1">
            <div className=" grid grid-cols-1 gap-1">
              <BoxComponent
                urlImage={data[5].urlToImage}
                author={data[5].author}
                name={data[5].name}
                title={data[5].title}
                id={data[5]?.id}
                handleClick={handleClick}
              />
              <BoxComponent
                urlImage={data[6].urlToImage}
                author={data[6].author}
                name={data[6].name}
                title={data[6].title}
                id={data[6]?.id}
                handleClick={handleClick}
              />
            </div>
            <div className=" grid grid-cols-1 gap-1">
              <BoxComponent
                urlImage={data[4].urlToImage}
                author={data[4].author}
                name={data[4].name}
                title={data[4].title}
                id={data[4]?.id}
                handleClick={handleClick}
              />
              <BoxComponent
                urlImage={data[3].urlToImage}
                author={data[3].author}
                name={data[3].name}
                title={data[3].title}
                id={data[3]?.id}
                handleClick={handleClick}
              />
            </div>
          </div>
          <div className="lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm px-1 grid grid-cols-1 md:grid-cols-2 mt-10 gap-2">
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
      )}
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
    </>
  );
};

export default Section;
