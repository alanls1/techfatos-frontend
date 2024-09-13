const { Op } = require("sequelize");
const { News } = require("../config/sequelize");

const findAll = async () => {
  try {
    const news = await News.findAll({
      limit: 15,
      order: [["publishedAt", "DESC"]],
    });

    return news;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("500 Internal error server, ", error);
  }
};

const findAllGames = async () => {
  try {
    const news = await News.findAll({
      where: {
        [Op.or]: [
          { content: { [Op.like]: "%games%" } },
          { content: { [Op.like]: "%game%" } },
          { content: { [Op.like]: "%jogo%" } },
          { content: { [Op.like]: "%jogos%" } },
          { content: { [Op.like]: "%steam%" } },
          { content: { [Op.like]: "%Gaming%" } },
          { content: { [Op.like]: "%Videogames%" } },
          { content: { [Op.like]: "%Multiplayer%" } },
          { content: { [Op.like]: "%Single-player%" } },
          { content: { [Op.like]: "%Adventure%" } },
          { content: { [Op.like]: "%Action%" } },
          { content: { [Op.like]: "%Role-playing%" } },
          { content: { [Op.like]: "%Strategy%" } },
          { content: { [Op.like]: "%Simulation%" } },
          { content: { [Op.like]: "%Arcade%" } },
          { content: { [Op.like]: "%Puzzle%" } },
          { content: { [Op.like]: "%RPG%" } },
          { content: { [Op.like]: "%MMORPG%" } },
          { content: { [Op.like]: "%FPS%" } },
          { content: { [Op.like]: "%TPS%" } },
          { content: { [Op.like]: "%Platformer%" } },
          { content: { [Op.like]: "%Indie Games%" } },
          { content: { [Op.like]: "%Online Games%" } },
          { content: { [Op.like]: "%Battle Royale%" } },
          { content: { [Op.like]: "%Sandbox%" } },
          { content: { [Op.like]: "%Quest%" } },
          { content: { [Op.like]: "%Campaign%" } },
        ],
      },
      order: [["publishedAt", "DESC"]],
    });

    return news;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("500 Internal error server, ", error);
  }
};

const findAllSmartphones = async () => {
  try {
    const news = await News.findAll({
      where: {
        [Op.or]: [
          { content: { [Op.like]: "%Smartphone%" } },
          { content: { [Op.like]: "%Celular%" } },
          { content: { [Op.like]: "%Mobile%" } },
          { content: { [Op.like]: "%Telefone%" } },
          { content: { [Op.like]: "%Telefone móvel%" } },
          { content: { [Op.like]: "%Android%" } },
          { content: { [Op.like]: "%iOS%" } },
          { content: { [Op.like]: "%iPhone%" } },
          { content: { [Op.like]: "%Samsung%" } },
          { content: { [Op.like]: "%Xiaomi%" } },
          { content: { [Op.like]: "%Huawei%" } },
          { content: { [Op.like]: "%Nokia%" } },
          { content: { [Op.like]: "%Motorola%" } },
          { content: { [Op.like]: "%LG%" } },
          { content: { [Op.like]: "%Apple%" } },
          { content: { [Op.like]: "%Tablet%" } },
          { content: { [Op.like]: "%Phablet%" } },
          { content: { [Op.like]: "%5G%" } },
          { content: { [Op.like]: "%Tecnologia móvel%" } },
          { content: { [Op.like]: "%Aplicativos%" } },
          { content: { [Op.like]: "%Apps%" } },
          { content: { [Op.like]: "%Recarga%" } },
          { content: { [Op.like]: "%Acessórios para celular%" } },
          { content: { [Op.like]: "%Capa para celular%" } },
          { content: { [Op.like]: "%Carregador%" } },
          { content: { [Op.like]: "%Bateria%" } },
          { content: { [Op.like]: "%Tela%" } },
          { content: { [Op.like]: "%Resolução de tela%" } },
          { content: { [Op.like]: "%Chip%" } },
          { content: { [Op.like]: "%SIM card%" } },
          { content: { [Op.like]: "%Rede móvel%" } },
          { content: { [Op.like]: "%Wi-Fi%" } },
          { content: { [Op.like]: "%Bluetooth%" } },
          { content: { [Op.like]: "%Conectividade%" } },
          { content: { [Op.like]: "%Atualização de software%" } },
          { content: { [Op.like]: "%Segurança móvel%" } },
          { content: { [Op.like]: "%Aplicativo de mensagens%" } },
          { content: { [Op.like]: "%Redes sociais%" } },
          { content: { [Op.like]: "%Jogos para celular%" } },
          { content: { [Op.like]: "%Câmera%" } },
          { content: { [Op.like]: "%Foto%" } },
          { content: { [Op.like]: "%Vídeo%" } },
          { content: { [Op.like]: "%Lançamento de celular%" } },
        ],
      },
      order: [["publishedAt", "DESC"]],
    });

    return news;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("500 Internal error server, ", error);
  }
};

const findAllComputers = async () => {
  try {
    const news = await News.findAll({
      where: {
        [Op.or]: [
          { content: { [Op.like]: "%Computador%" } },
          { content: { [Op.like]: "%PC%" } },
          { content: { [Op.like]: "%Laptop%" } },
          { content: { [Op.like]: "%Desktop%" } },
          { content: { [Op.like]: "%Notebook%" } },
          { content: { [Op.like]: "%Processador%" } },
          { content: { [Op.like]: "%RAM%" } },
          { content: { [Op.like]: "%SSD%" } },
          { content: { [Op.like]: "%HDD%" } },
          { content: { [Op.like]: "%GPU%" } },
          { content: { [Op.like]: "%Placa de vídeo%" } },
          { content: { [Op.like]: "%Tela%" } },
          { content: { [Op.like]: "%Resolução de tela%" } },
          { content: { [Op.like]: "%Teclado%" } },
          { content: { [Op.like]: "%Mouse%" } },
          { content: { [Op.like]: "%Placa-mãe%" } },
          { content: { [Op.like]: "%Portas USB%" } },
          { content: { [Op.like]: "%Conectividade%" } },
          { content: { [Op.like]: "%Sistema operacional%" } },
          { content: { [Op.like]: "%Windows%" } },
          { content: { [Op.like]: "%macOS%" } },
          { content: { [Op.like]: "%Linux%" } },
          { content: { [Op.like]: "%Software%" } },
          { content: { [Op.like]: "%Atualização de software%" } },
          { content: { [Op.like]: "%Antivírus%" } },
          { content: { [Op.like]: "%Segurança%" } },
          { content: { [Op.like]: "%Hardware%" } },
          { content: { [Op.like]: "%Performance%" } },
          { content: { [Op.like]: "%Lançamento de computador%" } },
          { content: { [Op.like]: "%Tecnologia%" } },
          { content: { [Op.like]: "%Inovação%" } },
        ],
      },
      order: [["publishedAt", "DESC"]],
    });

    return news;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("500 Internal Server Error, ", error);
  }
};

const findBy = async (id) => {
  try {
    const findBy = await News.findOne({ where: { id } });
    const split = findBy.title.split(" ");

    const likeConditions = split.map((word) => ({
      content: { [Op.like]: `%${word}%` },
    }));

    const suggest = await News.findAll({
      limit: 5,
      order: [["publishedAt", "DESC"]],
      where: { [Op.or]: likeConditions },
    });

    return { findBy, suggest };
  } catch (error) {
    throw new Error("error: ", error);
  }
};
module.exports = {
  findAll,
  findAllGames,
  findAllSmartphones,
  findAllComputers,
  findBy,
};
