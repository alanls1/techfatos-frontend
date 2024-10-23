"use client";
/* eslint-disable @next/next/no-img-element */
import { IconButton, ImageListItemBar, Box, Snackbar } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchDelete } from "@/services/admin";

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
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handlClickDelete = async (id: number) => {
    try {
      const res = await fetchDelete(id);
      setOpen(res === 200);
      setMessage("Deletado com sucesso!");
      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 6000);
    } catch (error) {
      setOpen(true);
      setMessage("Error ao deletar item!");
      setTimeout(() => setOpen(false), 6000);
    }
  };

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
        subtitle={author}
        sx={{
          fontSize: "24px",
          borderRadius: "0px 0px 10px 10px",
          height: "40%",
          ".css-1xtbwf1-MuiImageListItemBar-titleWrap ": { paddingBlock: 0 },
          ".css-dasnyc-MuiImageListItemBar-title": {
            whiteSpace: "inherit",
          },
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
      <IconButton
        aria-label="delete"
        size="large"
        sx={{ position: "absolute", top: 0, right: 10 }}
        onClick={() => handlClickDelete(id)}
      >
        <DeleteIcon fontSize="inherit" sx={{ color: "white" }} />
      </IconButton>
      <Snackbar open={open} autoHideDuration={6000} message={message} />
    </Box>
  );
};

export default BoxComponent;
