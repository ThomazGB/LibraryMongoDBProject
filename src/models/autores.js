const db = require("./db");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Autores = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    nacionalidade: {
      type: String,
      required: true,
    },
  },
  { collection: "Autores" }
);

const Autor = mongoose.model("Autores", Autores);

module.exports = Autor;
