require("./db")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Autores = new Schema({
  nome: {
    type: String,
    required: true,
  },
  nacionalidade: {
    type: String,
    required: true,
  },
});
const Autor = mongoose.model("autores", Autores);
module.exports = Autor;

