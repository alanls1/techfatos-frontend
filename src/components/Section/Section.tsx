/* eslint-disable @next/next/no-img-element */
"use client";
import { fetchNews } from "@/services";
import React, { useEffect, useState } from "react";
import BoxComponent from "../Box/Box";
import { useRouter } from "next/navigation";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { props } from "@/types";

import "./Section.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CardToChange from "../CardToChange/CardToChange";
import Link from "next/link";

import hostiger from "../../assets/img/Hostinger_logo.png";
import Image from "next/image";

const Section = () => {
  const [data, setData] = useState<props[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const roter = useRouter();
  const [control, setControl] = useState(0);

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
        const { currentPage, news, totalPages } = await fetchNews(page);

        setData(news);
        setPage(currentPage);
        setTotalPage(totalPages);

        setInterval(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {}
    }

    fetchData();
  }, [page]);

  const handleClickPrevius = () => {
    if (control !== 0) {
      setControl((prev) => prev - 1);
    }
    if (control === 0) {
      setControl(3);
    }
  };
  const handleClickNext = () => {
    if (control < 3) {
      setControl((prev) => prev + 1);
    }
    if (control === 3) {
      setControl(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setControl((prev) => {
        if (prev < 3) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="h-screen">
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      )}
      {data && (
        <div
          className=" w-full w flex justify-center flex-col items-center"
          style={{ backgroundColor: "var(--light-background)" }}
        >
          <div className="slide w-[-webkit-fill-available] sm:min-w-[400px] sm:h-full sm:max-h-[400px] h-[340px] flex">
            <Button variant="text" onClick={handleClickPrevius}>
              <ArrowBackIosIcon />
            </Button>
            <BoxComponent
              urlImage={data[control]?.urlToImage}
              author={data[control]?.author}
              name={data[control]?.name}
              title={data[control]?.title}
              date={data[control]?.publishedAt}
              id={data[control]?.id}
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
              padding: {
                xs: "8px",
              },
            }}
          >
            <Box>
              <Box className="section ">
                <div>
                  <h2 className="font-bold text-2xl md:pl-5">Principais</h2>
                  <div className="flex flex-wrap lg:justify-around gap-3">
                    <CardToChange
                      urlImage={data[4]?.urlToImage}
                      author={data[4]?.author}
                      name={data[4]?.name}
                      title={data[4]?.title}
                      content={data[4]?.content}
                      date={data[4]?.publishedAt}
                      id={data[4]?.id}
                    />
                    <CardToChange
                      urlImage={data[5]?.urlToImage}
                      author={data[5]?.author}
                      name={data[5]?.name}
                      title={data[5]?.title}
                      content={data[5]?.content}
                      date={data[5]?.publishedAt}
                      id={data[5]?.id}
                    />
                    <CardToChange
                      urlImage={data[6]?.urlToImage}
                      author={data[6]?.author}
                      name={data[6]?.name}
                      title={data[6]?.title}
                      content={data[6]?.content}
                      date={data[6]?.publishedAt}
                      id={data[6]?.id}
                    />
                  </div>
                </div>
              </Box>
              <Box className="section">
                <div>
                  <h2 className="font-bold text-2xl pl-5">Mais Lidas</h2>
                  <div className="flex flex-wrap lg:justify-around gap-3">
                    <CardToChange
                      urlImage={data[7]?.urlToImage}
                      author={data[7]?.author}
                      name={data[7]?.name}
                      title={data[7]?.title}
                      content={data[7]?.content}
                      date={data[7]?.publishedAt}
                      id={data[7]?.id}
                    />
                    <CardToChange
                      urlImage={data[8]?.urlToImage}
                      author={data[8]?.author}
                      name={data[8]?.name}
                      title={data[8]?.title}
                      content={data[8]?.content}
                      date={data[8]?.publishedAt}
                      id={data[8]?.id}
                    />
                    <CardToChange
                      urlImage={data[9]?.urlToImage}
                      author={data[9]?.author}
                      name={data[9]?.name}
                      title={data[9]?.title}
                      content={data[9]?.content}
                      date={data[9]?.publishedAt}
                      id={data[9]?.id}
                    />
                  </div>
                </div>
              </Box>
              <Box className="section ">
                <div>
                  <h2 className="font-bold text-2xl pl-5">Novidades</h2>
                  <div className="flex flex-wrap lg:justify-around gap-3">
                    <CardToChange
                      urlImage={data[10]?.urlToImage}
                      author={data[10]?.author}
                      name={data[10]?.name}
                      title={data[10]?.title}
                      content={data[10]?.content}
                      date={data[10]?.publishedAt}
                      id={data[10]?.id}
                    />
                    <CardToChange
                      urlImage={data[11]?.urlToImage}
                      author={data[11]?.author}
                      name={data[11]?.name}
                      title={data[11]?.title}
                      content={data[11]?.content}
                      date={data[11]?.publishedAt}
                      id={data[11]?.id}
                    />
                    <CardToChange
                      urlImage={data[12]?.urlToImage}
                      author={data[12]?.author}
                      name={data[12]?.name}
                      title={data[12]?.title}
                      content={data[12]?.content}
                      date={data[12]?.publishedAt}
                      id={data[12]?.id}
                    />
                  </div>
                </div>
              </Box>
            </Box>
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
                    className="w-full h-72"
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
      )}
      {/* <div className="mt-32 flex justify-center">
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
      </div> */}
    </>
  );
};

export default Section;
