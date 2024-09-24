const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATA_BASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

const News = sequelize.define("News", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  author: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
  },
  urlToImage: {
    type: DataTypes.TEXT,
  },
  publishedAt: {
    type: DataTypes.DATE,
  },
  content: {
    type: DataTypes.TEXT,
  },
  urls: {
    type: DataTypes.TEXT,
  },
  titleSecond: {
    type: DataTypes.TEXT,
  },
});

const ApiUpdate = sequelize.define("api_update", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  last_update: {
    type: DataTypes.DATE,
  },
});

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("conexão has been established successfully");
  } catch (error) {
    console.log("Unable to conecct to the database: ", error);
  }
}
testConnection();

module.exports = { sequelize, News, ApiUpdate, User };
