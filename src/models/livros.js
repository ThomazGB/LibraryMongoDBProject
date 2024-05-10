require("./db");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LivroSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
});
const Livro = mongoose.model("livro", LivroSchema);
module.exports = Livro;
