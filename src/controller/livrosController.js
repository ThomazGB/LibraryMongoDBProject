const express = require("express");
const router = express.Router();

const Livros = require("../models/livros");

router.get("/", (req, res) => {
    Livros.find()
    .lean()
    .then((books) => {
      res.render("admin/book/books", { books: books });
    });
});

router.get("/add", (req, res) => {
  res.render("admin/book/addBook");
});

router.post("/add/new", (req, res) => {
  var livros = new Livros();
  livros.nome = req.body.nome;
  livros.descricao = req.body.descricao;
  livros.genero = req.body.genero;
  livros
    .save()
    .then(() => {
      res.redirect("/book/books");
    })
    .catch((erro) => {
      res.send("Houve um erro: " + erro);
    });
});

router.get("/edit/:id", (req, res) => {
  Livros.findOne({ _id: req.params.id })
    .lean()
    .then((livros) => {
      res.render("admin/book/editBook", { livro: livros });
    });
});

router.post("/edit", (req, res) => {
  Livros.updateOne(
    { _id: req.body._id },
    { $set: { nome: req.body.nome, descricao: req.body.descricao, genero: req.body.genero } }
  ).then(() => {
    res.redirect("/book/books");
  });
});

router.get("/delete/:id", (req, res) => {
  Livros.deleteMany({ _id: req.params.id }).then(() => {
    res.redirect("/book/books");
  });
});
module.exports = router;