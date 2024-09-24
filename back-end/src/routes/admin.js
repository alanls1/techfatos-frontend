const express = require("express");
const admin = express.Router();

const { fetchDelete, fetchEdit, fetchNewPost } = require("../services/admin");
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
    const { text, fullTextList, fullTitleList } = req.body;

    await fetchEdit(id, text, fullTextList, fullTitleList);

    res.status(200).send();
  } catch (error) {
    throw error;
  }
});

admin.get("/add", async (req, res) => {
  try {
    const news = await checkAndUpdate();
    res.json({ news });
  } catch (error) {}
});

admin.post("/newPost", async (req, res) => {
  try {
    const { title, url, urlToImage, content, list, titleSecond } = req.body;

    const date = new Date();

    const news = fetchNewPost(
      title,
      url,
      urlToImage,
      content,
      date,
      list,
      titleSecond
    );
    return news;
  } catch (error) {}
});

module.exports = admin;
