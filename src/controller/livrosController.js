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
  var livro = new Livros();

  livro.nome = req.body.nome;
  livro.descricao = req.body.descricao;
  livro.genero = req.body.genero;

  livro
    .save()
    .then(() => {
      res.redirect("/book/");
    })
    .catch((erro) => {
      res.send("Houve um erro: " + erro);
    });
});

router.get("/edit/:id", (req, res) => {
  Livros.findOne({ _id: req.params.id })
    .lean()
    .then((books) => {
      res.render("admin/book/editBook", { books });
    });
});

router.post("/edit", (req, res) => {
  Livros.updateOne(
    { _id: req.body._id },
    {
      $set: {
        nome: req.body.nome,
        descricao: req.body.descricao,
        genero: req.body.genero,
      },
    }
  ).then(() => {
    res.redirect("/book/");
  });
});

router.get("/delete/:id", (req, res) => {
  Livros.deleteMany({ _id: req.params.id }).then(() => {
    res.redirect("/book/");
  });
});
module.exports = router;
