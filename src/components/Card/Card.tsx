import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

import "./style.css";

const CardComponent = ({
  urlImage,
  title,
  name,
  content,
  id,
  handleClick,
}: {
  urlImage: string;
  title: string;
  name: string;
  id: number;
  content: string;
  handleClick: (title: string, id: number) => void;
}) => {
  return (
    <div>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          marginTop: "5px",
        }}
      >
        <CardActionArea
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gridAutoColumns: "200px",
            height: "100%",
            textOverflow: "ellipsis",
          }}
          onClick={() => handleClick(title, id)}
        >
          <CardMedia
            component="img"
            image={urlImage || title}
            alt={title || name}
            sx={{
              height: "100%",
              objectFit: {
                sm: "cover",
                xs: "fill",
              },
            }}
          />
          <CardContent
            sx={{
              textOverflow: "ellipsis",
              padding: "inherit",
              paddingInline: "14px",
              overflowY: "auto",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontSize: { md: 17, xs: 15 } }}
              className="line-clamp"
            >
              {title || name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default CardComponent;
