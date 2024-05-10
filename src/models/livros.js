const db = require("./db");
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
}, {collection: 'Livros'});

const Livro = mongoose.model("Livros", LivroSchema);

module.exports = Livro;
