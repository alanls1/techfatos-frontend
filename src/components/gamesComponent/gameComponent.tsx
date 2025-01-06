/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import BoxComponent from "../Box/Box";
import { useRouter } from "next/navigation";
import { props } from "@/types";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CardToChange from "../CardToChange/CardToChange";
import "./gameComponent.css";
import Link from "next/link";
import Image from "next/image";

import hostiger from "../../assets/img/Hostinger_logo.png";

const GameComponent = ({
  dataProps,
  urlLocation,
  incluesArr,
}: {
  dataProps: props[];
  urlLocation: string;
  incluesArr: string[];
}) => {
  const [data, setData] = useState<props[]>(dataProps);
  const [slide, setSlide] = useState<props[]>([]);
  const [control, setControl] = useState(0);

  useEffect(() => {
    setData(dataProps);
    setSlide(dataProps.slice(0, 4));
  }, [dataProps]);

  const handleClickPrevius = () => {
    setControl((prev) => (prev === 0 ? slide.length - 1 : prev - 1));
  };

  const handleClickNext = () => {
    setControl((prev) => (prev === slide.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setControl((prev) => (prev === slide.length - 1 ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [slide.length]);

  return (
    data && (
      <div
        className=" w-full w flex justify-center flex-col items-center"
        style={{ backgroundColor: "var(--light-background)" }}
      >
        <div className="slide w-[-webkit-fill-available] sm:min-w-[400px] sm:h-full sm:max-h-[400px] h-[340px] flex">
          <Button variant="text" onClick={handleClickPrevius}>
            <ArrowBackIosIcon />
          </Button>

          <BoxComponent
            urlImage={slide[control]?.urlToImage}
            author={slide[control]?.author}
            name={slide[control]?.name}
            title={slide[control]?.title}
            date={slide[control]?.publishedAt}
            id={slide[control]?.id}
          />
          <Button
            variant="text"
            sx={{ right: "0px" }}
            onClick={handleClickNext}
          >
            <ArrowForwardIosIcon />
          </Button>
        </div>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: {
              md: "2fr 0.5fr",
              xs: "1fr",
            },
            marginTop: "50px",
            paddingInline: "8px",
          }}
        >
          {data?.length > 4 ? (
            <Box>
              <Box className="section">
                <div>
                  <h2 className="font-bold sm:text-3xl md:pl-5 text-2xl">
                    Notícias
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {data && data?.length > 0
                      ? data
                          ?.slice(4)
                          .map((item) => (
                            <CardToChange
                              key={item.id}
                              urlImage={item.urlToImage}
                              author={item.author}
                              name={item.name}
                              title={item.title}
                              content={item.content}
                              date={item.publishedAt}
                              id={item.id}
                            />
                          ))
                      : null}
                  </div>
                </div>
              </Box>
            </Box>
          ) : null}
          <div>
            <Box>
              <Link
                href={"https://hostinger.com.br?REFERRALCODE=85QALANLIRZP"}
                target="_blank"
              >
                <Image
                  src={hostiger}
                  alt="Hostinger"
                  width={250}
                  height={200}
                  className="w-full h-72 md:w-[600px]"
                />
                <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
                  crie seu próprio site com a Hostinger
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ borderColor: "#674CC5", color: "#674CC5" }}
                >
                  Ver mais
                </Button>
              </Link>
            </Box>
          </div>
        </Box>
      </div>
    )
  );
};

export default GameComponent;
