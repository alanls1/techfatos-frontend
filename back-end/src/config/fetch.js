const { News, ApiUpdate, sequelize } = require("./sequelize");
const { Readability } = require("@mozilla/readability");
const { JSDOM } = require("jsdom");
const axios = require("axios");

require("dotenv").config();

const apiKey = process.env.API_KEY;
const url = `${process.env.URL_API}q=technology&apiKey=${apiKey}&language=pt`;

async function checkAndUpdate() {
  try {
    const lastUpdate = await ApiUpdate.findOne({ order: [["id", "DESC"]] });
    let shouldUpdate = true;

    if (lastUpdate) {
      const last = new Date(lastUpdate.last_update);
      const now = new Date();
      const diff = (now - last) / (1000 * 60 * 60);

      if (diff < 24) {
        shouldUpdate = false;
      }
    }

    if (shouldUpdate) await fetchAndSaveNews();
  } catch (error) {
    console.log(error);
  }
}

async function fetchAndSaveNews() {
  try {
    const response = await axios.get(url);
    const data = response.data;

    const createdNews = await Promise.all(
      data.articles.map(async (article) => {
        const {
          source,
          title,
          author,
          description,
          url,
          urlToImage,
          publishedAt,
          content,
        } = article;

        const existingNews = await News.findOne({ where: { url } });

        if (!existingNews && content !== null) {
          const getContent = await getMainContent(url);

          if (getContent) {
            const news = await News.create({
              name: source.name,
              title,
              author: author || "Desconhecido",
              description,
              url,
              urlToImage,
              publishedAt,
              content: getContent,
            });

            return news;
          }
        }
        return null;
      })
    );

    const now = new Date();
    await ApiUpdate.create({
      last_update: now,
    });

    return createdNews.filter((news) => news !== null);
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getMainContent(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const dom = new JSDOM(html);
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    // const getChat = await getChatGPTResponse(
    //   ` "${article.textContent}"

    //     Reescreva o texto acima de forma clara e objetiva, mantendo até 80% do texto original, mude apenas algumas palavras. Evite remover detalhes importantes e parafraseie o conteúdo sem resumir excessivamente. Exclua apenas o que for irrelevante ou que se refira a links externos, propagandas ou informações não relacionadas ao tema central, adicione mais informações caso seja necessarío.

    //   `
    // );

    // return getChat;
  } catch (error) {
    console.error("Erro ao extrair o conteúdo principal:", error);
    return null;
  }
}

async function getChatGPTResponse(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const message = response.data.choices[0].message.content;
    return message;
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.code === "rate_limit_exceeded"
    ) {
      const retryAfter = parseFloat(error.response.headers["retry-after"] || 6);
      console.log(
        `Rate limit exceeded. Retrying after ${retryAfter} seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      return getChatGPTResponse(prompt);
    } else {
      console.error(
        "Erro ao fazer requisição à API do ChatGPT:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  }
}

module.exports = { checkAndUpdate };
