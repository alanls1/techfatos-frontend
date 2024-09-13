const { News } = require("../config/sequelize");

const fetchDelete = async (id) => {
  try {
    await News.destroy({ where: { id } });
  } catch (error) {
    throw new Error(error);
  }
};

const fetchEdit = async (id, text) => {
  try {
    const news = await News.findOne({ where: { id } });
    news.content = text;
    news.publishedAt = new Date();
    await news.save();
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { fetchDelete, fetchEdit };
