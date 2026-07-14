import * as React from "react";
import DOMPurify from "isomorphic-dompurify";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./CardToChange.css";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function CardToChange({
  urlImage,
  title,
  name,
  id,
  content,
  date,
}: {
  urlImage: string;
  title: string;
  name: string;
  author: string;
  id: number;
  content: string;
  date: Date;
}) {
  const datePublished = new Date(date).toLocaleDateString();

  return (
    <Card
      sx={{
        maxWidth: {
          md: 310,
          xs: "95vw",
        },
        border: "none",
        boxShadow: "none",
        marginBlockEnd: 4,
      }}
    >
      <CardMedia
        component="img"
        height="194"
        image={urlImage || ""}
        alt={title || name}
        title={title || name}
        sx={{ height: "194px" }}
      />
      <CardContent sx={{ padding: "20px 0 5px 0" }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: "1rem",
            fontWeight: "bolder",
            wordSpacing: "5px",
            lineHeight: "25px",
          }}
        >
          {title}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: ".9rem",
        }}
      >
        <AccessTimeIcon sx={{ fontSize: ".9rem" }} />{" "}
        <p className="ml-1">{datePublished}</p>
      </Box>
      <CardContent sx={{ padding: "20px 0 0 0" }}>
        <p
          className="content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />
      </CardContent>

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
            color: "black",
            borderColor: "black",
            marginBlock: "20px 10px",
          }}
        >
          Leia mais <ArrowForwardIcon sx={{ marginLeft: 1 }} />
        </Button>
      </Link>
    </Card>
  );
}
