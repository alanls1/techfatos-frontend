"use client";
/* eslint-disable */
import React from "react";
import withAuth from "../withAuth";
import Form from "../components/FormTest/Form";

const page = () => {
  return (
    <div>
      <div>
        <Form />
      </div>
    </div>
  );
};

export default withAuth(page);
