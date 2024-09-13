const express = require("express");
const admin = express.Router();
const { fetchDelete, fetchEdit } = require("../services/admin");
const { checkAndUpdate } = require("../config/fetch");

admin.use(express.json());

admin.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await fetchDelete(id);

    res.status(200).send();
  } catch (error) {
    throw error;
  }
});

admin.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    await fetchEdit(id, text);

    res.status(200).send();
  } catch (error) {
    throw error;
  }
});

admin.get("/add", async (req, res) => {
  try {
    console.log("oi");

    const news = await checkAndUpdate();
    res.json({ news });
  } catch (error) {}
});

module.exports = admin;
