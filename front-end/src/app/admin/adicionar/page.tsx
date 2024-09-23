"use client";
import { addNews } from "@/services/admin";
import { Button } from "@mui/material";
import React from "react";
import withAuth from "../withAuth";
import Form from "../components/Form/Form";

const page = () => {
  const handleClick = async () => {
    const response = await addNews();
  };
  return (
    <div className="max-w-screen-md mx-auto">
      <div className="flex items-center">
        <h3 className="text-xl mr-2">Adicionar novas notícias: </h3>
        <Button variant="contained" onClick={handleClick}>
          Adicionar
        </Button>
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
};

export default withAuth(page);
