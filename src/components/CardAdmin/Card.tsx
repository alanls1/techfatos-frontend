import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React from "react";
import { fetchDelete } from "@/services/admin";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handlClickDelete = async (id: number) => {
    try {
      const res = await fetchDelete(id);
      setOpen(res === 200);
      setMessage("Deletado com sucesso!");
      setTimeout(() => {
        setOpen(false);
      }, 6000);
    } catch (error) {
      setOpen(true);
      setMessage("Error ao deletar item!");
      setTimeout(() => setOpen(false), 6000);
    }
  };

  return (
    <div>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          marginTop: "5px",
          position: "relative",
        }}
      >
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
              sx={{ fontSize: "15px" }}
            >
              {title || name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "12px",
                textOverflow: "ellipsis",
                height: 63,
              }}
            >
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <IconButton
          aria-label="delete"
          size="large"
          sx={{ position: "absolute", top: 0, right: 10 }}
          onClick={() => handlClickDelete(id)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Card>

      <Snackbar open={open} autoHideDuration={6000} message={message} />
    </div>
  );
};

export default CardComponent;
