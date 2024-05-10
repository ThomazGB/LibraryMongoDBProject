const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Biblioteca", {});

const db = mongoose.connection;

db.on("error", console.log("Erro ao conectar-se ao banco de dados"));

db.once("open", () => {
  console.log("Conectado ao MongoDB!");
});

module.exports = db;
