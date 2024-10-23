"use client";
import { addNews } from "@/services/admin";
import { Button } from "@mui/material";
import React from "react";
import withAuth from "../withAuth";
import Form from "../components/Form/Form";

const page = () => {
  return (
    <div className="max-w-screen-md ml-40">
      <div>
        <Form />
      </div>
    </div>
  );
};

export default withAuth(page);
