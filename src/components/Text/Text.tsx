"use client";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

import { Button, IconButton, TextField } from "@mui/material";

const Text = ({
  text,
  index,
  handleTextChange,
}: {
  text: string;
  index: number;
  handleTextChange: (key: number, newText: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(text);

  const handleConfirm = () => {
    handleTextChange(index, message);
    setOpen(false);
  };

  return (
    <div className="relative mt-6">
      {!open && <p className="my-10">{text}</p>}
      <IconButton
        aria-label="delete"
        size="large"
        sx={{ position: "absolute", top: -30, right: 0 }}
        onClick={() => setOpen(true)}
      >
        <EditIcon />
      </IconButton>
      {open && (
        <div>
          <TextField
            id="filled-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            variant="outlined"
            sx={{
              width: "100%",
              textarea: {
                resize: "block",
              },
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="mt-4">
            <Button
              variant="contained"
              color="success"
              className="mr-2"
              onClick={handleConfirm}
            >
              Confirmar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Text;
