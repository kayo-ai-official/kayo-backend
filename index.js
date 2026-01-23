const express = require("express");
const app = express();

app.use(express.json()); // ⭐ very important

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Kayo backend live 🚀"
  });
});
