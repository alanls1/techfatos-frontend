const { News } = require("../config/sequelize");

const fetchDelete = async (id) => {
  try {
    await News.destroy({ where: { id } });
  } catch (error) {
    throw new Error(error);
  }
};

const fetchEdit = async (id, text, fullTextList) => {
  try {
    console.log(text, fullTextList);

    const news = await News.findOne({ where: { id } });
    news.content = text;
    news.publishedAt = new Date();
    if (fullTextList) {
      news.urls = fullTextList;
    }
    await news.save();
  } catch (error) {
    throw new Error(error);
  }
};

const fetchNewPost = async (title, url, urlToImage, content, date, list) => {
  try {
    const news = await News.create({
      title,
      url,
      urlToImage,
      content,
      publishedAt: date,
      urls: list,
    });

    return news;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { fetchDelete, fetchEdit, fetchNewPost };
