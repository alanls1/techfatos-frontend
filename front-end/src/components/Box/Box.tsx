/* eslint-disable @next/next/no-img-element */
import { IconButton, ImageListItemBar, Box } from "@mui/material";
import React from "react";

const BoxComponent = ({
  urlImage,
  title,
  name,
  author,
  id,
  handleClick,
}: {
  urlImage: string;
  title: string;
  name: string;
  author: string;
  id: number;
  handleClick: (title: string, id: number) => void;
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "10px",
        cursor: "pointer",
      }}
    >
      <img
        //{...srcset(item.img, 121, item.rows, item.cols)}
        src={urlImage || ""}
        alt={title || name}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
        }}
        className="object-fill"
        loading="lazy"
      />
      <div
        className="w-full h-full bg-[#00000030] absolute top-0 left-0 rounded-2xl"
        onClick={() => handleClick(title, id)}
      ></div>
      <ImageListItemBar
        title={title}
        sx={{
          ".css-dasnyc-MuiImageListItemBar-title": {
            whiteSpace: {
              md: "inherit",
            },
            fontSize: {
              sm: "20px",
              xs: "16px",
            },
            height: "100%",
          },
          borderRadius: "0px 0px 10px 10px",
          height: "40%",
          ".css-1xtbwf1-MuiImageListItemBar-titleWrap ": { paddingBlock: 0 },
          overflowY: "auto",
          paddingTop: "10px",
        }}
        actionIcon={
          <IconButton
            sx={{
              color: "rgba(255, 255, 255, 0.54)",
            }}
            aria-label={`info about ${title}`}
          ></IconButton>
        }
      ></ImageListItemBar>
    </Box>
  );
};

export default BoxComponent;
