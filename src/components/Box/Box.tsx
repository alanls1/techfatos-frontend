/* eslint-disable @next/next/no-img-element */
import { IconButton, ImageListItemBar, Box, Button } from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

import "./Box.css";

const BoxComponent = ({
  urlImage,
  title,
  name,
  id,
  date,
}: {
  urlImage: string;
  title: string;
  name: string;
  author: string;
  date: Date;
  id: number;
}) => {
  const datePublished = new Date(date).toLocaleDateString();

  return (
    urlImage &&
    title &&
    id && (
      <Box
        sx={{
          position: "relative",
          borderRadius: "10px",
          cursor: "pointer",
          maxHeight: "-webkit-fill-available",
          width: "100%",
        }}
      >
        <img
          //{...srcset(item.img, 121, item.rows, item.cols)}
          src={urlImage || ""}
          alt={title || name}
          className="w-full h-full sm:max-h-[400px] object-fill sm:object-cover rounded-xl"
          loading="lazy"
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "0px",
            background: "#0000003d",
            width: "100%",
            padding: "10px 0 0 10px",
          }}
        >
          <p className="title">{title}</p>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: ".9rem",
            }}
          >
            <AccessTimeIcon sx={{ fontSize: ".9rem", color: "white" }} />{" "}
            <p className="ml-1 text-white">{datePublished}</p>
          </Box>
          <Link
            href={`${
              title
                ? `/${title
                    .toLowerCase()
                    .replace(/[#?&/]/g, "-")
                    .replace(/ /g, "-")}/${id}`
                : ""
            }`}
          >
            <Button
              variant="outlined"
              sx={{
                borderColor: "white",
                marginBlock: "20px 10px",
                position: "inherit !important",
              }}
            >
              Leia mais <ArrowForwardIcon sx={{ marginLeft: 1 }} />
            </Button>
          </Link>
        </Box>
      </Box>
    )
  );
};

export default BoxComponent;
