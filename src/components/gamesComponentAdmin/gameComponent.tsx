/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import BoxComponent from "../BoxAdmin/Box";
import CardComponent from "../CardAdmin/Card";
import { useRouter } from "next/navigation";
import { props } from "@/types";

const GameComponent = ({
  dataProps,
  incluesArr,
}: {
  dataProps: props[];
  incluesArr: string[];
}) => {
  const [data, setData] = useState<props[]>(dataProps);
  const roter = useRouter();

  const handleClick = (title: string, id: number) => {
    roter.push(
      `${title
        .toLowerCase()
        .replace(/[#?&/]/g, "-")
        .replace(/ /g, "-")}/${id}`
    );
  };
  useEffect(() => {
    const filter = dataProps.filter((item) => {
      const match =
        incluesArr &&
        incluesArr.some((keyword) => {
          const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, "i"); // Palavra inteira, case-insensitive
          return regex.test(item.content.toLowerCase());
        });

      return match;
    });

    setData(filter);
  }, [dataProps]);

  return (
    <>
      {data && (
        <div className="mt-8 w-full flex justify-center flex-col items-center">
          <div className="max-w-screen-lg">
            <BoxComponent
              urlImage={data[0]?.urlToImage ? data[0].urlToImage : ""}
              author={data[0]?.author ? data[0].author : ""}
              name={data[0]?.name ? data[0].name : ""}
              title={data[0]?.title ? data[0].title : ""}
              id={data[0]?.id}
              handleClick={handleClick}
            />
          </div>
          <div
            className="max-w-screen-lg grid mt-10"
            //style={{ gridTemplateColumns: "2fr 1fr" }}
          >
            <div className="w-full grid grid-cols-2 gap-5">
              {data.slice(1).map((item, key) => (
                <CardComponent
                  content={item.description}
                  name={item.name}
                  title={item.title}
                  urlImage={item.urlToImage}
                  id={item.id}
                  key={key}
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

export default GameComponent;
