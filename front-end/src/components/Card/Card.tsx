import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

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
      <Card sx={{ width: "100%", height: "100%", marginTop: "5px" }}>
        <CardActionArea
          sx={{
            display: "flex",
            height: "100%",
            textOverflow: "ellipsis",
          }}
          onClick={() => handleClick(title, id)}
        >
          <CardMedia
            component="img"
            sx={{ maxWidth: "50%" }}
            image={urlImage}
            alt={title || name}
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
            >
              {title || name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: { md: 18, xs: 15 },
                textOverflow: "ellipsis",
                height: 63,
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default CardComponent;
