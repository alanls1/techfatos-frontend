const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../config/sequelize");
const authenticateToken = require("../config/auth");
require("dotenv").config();

router.use(express.json());

router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;

    const payload = {
      login,
    };

    const options = {
      expiresIn: "2h",
    };

    const user = await User.findOne({ where: { login: login } });
    if (!user)
      return res.status(401).json({ message: "Usuário não encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(401).json({ message: "Senha incorreta" });

    const token = jwt.sign(payload, process.env.SECRET_KEY, options);

    res.send(token);
  } catch (error) {}
});

router.post("/register", authenticateToken, async (req, res) => {
  const { login, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  await User.create({
    login,
    password: hash,
    role: 0,
  });
  res.status(201);
});

module.exports = router;
