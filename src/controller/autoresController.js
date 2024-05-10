const express = require("express");
const router = express.Router();

const Authors = require("../models/autores");

router.get("/", (req, res) => {
  Authors.find()
    .lean()
    .then((author) => {
      res.render("admin/author/authors", { author });
    });
});

router.get("/add", (req, res) => {
  res.render("admin/author/addAuthor");
});

router.post("/add/new", (req, res) => {
  var autor = new Authors();

  console.log(req.body)
  autor.nome = req.body.nome;
  autor.nacionalidade = req.body.nacionalidade;

  autor
    .save()
    .then(() => {
      res.redirect("/author/");
    })
    .catch((erro) => {
      res.send("Houve um erro: " + erro);
    });
});

router.get("/edit/:id", (req, res) => {
  Authors
    .findOne({ _id: req.params.id })
    .lean()
    .then((author) => {
      res.render("admin/author/editAuthor", { author });
    });
});

router.post("/edit", (req, res) => {
  Authors
    .updateOne(
      { _id: req.body._id },
      { $set: { nome: req.body.nome, nacionalidade: req.body.nacionalidade } }
    )
    .then(() => {
      res.redirect("/author/");
    });
});

router.get("/delete/:id", (req, res) => {
  Authors.deleteMany({ _id: req.params.id }).then(() => {
    res.redirect("/author");
  });
});

module.exports = router;
