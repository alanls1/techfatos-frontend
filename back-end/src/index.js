const express = require("express");
const {
  findAll,
  findAllGames,
  findAllSmartphones,
  findAllComputers,
  findBy,
} = require("../services/news");

const admin = require("./admin");
const auth = require("./auth");
const authenticateToken = require("../config/auth");

const router = express.Router();

router.use("/auth", auth);

router.get("/", async (req, res) => {
  try {
    const findAllItens = await findAll();

    res.json({ findAllItens });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error cai aqui" });
  }
});

router.get("/games", async (req, res) => {
  try {
    const findGames = await findAllGames();

    res.json({ findGames });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error cai aqui" });
  }
});

router.get("/smartphones", async (req, res) => {
  try {
    const findSmartphones = await findAllSmartphones();

    res.json({ findSmartphones });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error cai aqui" });
  }
});

router.get("/computers", async (req, res) => {
  try {
    const findComputers = await findAllComputers();

    res.json({ findComputers });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error cai aqui" });
  }
});

router.post("/find/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const findById = await findBy(id);

    res.json({ findById });
  } catch (error) {
    throw error;
  }
});

router.use("/admin", authenticateToken, admin);

module.exports = router;
