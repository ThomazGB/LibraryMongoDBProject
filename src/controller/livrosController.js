const express = require("express");
const router = express.Router();

const Livros = require("../models/livros");

router.get("/livros", (req, res) => {
    Livros.find()
    .lean()
    .then((livros) => {
      res.render("admin/livros/livros", { livros: livros });
    });
});

router.get("/livros/add", (req, res) => {
  res.render("admin/livros/addlivros");
});

router.post("/livros/nova", (req, res) => {
  var livros = new Livros();
  livros.nome = req.body.nome;
  livros.descricao = req.body.descricao;
  livros.genero = req.body.genero;
  livros
    .save()
    .then(() => {
      res.redirect("/rota_livros/livros");
    })
    .catch((erro) => {
      res.send("Houve um erro: " + erro);
    });
});

router.get("/editar_livros/:id", (req, res) => {
  Livros.findOne({ _id: req.params.id })
    .lean()
    .then((livros) => {
      res.render("admin/livros/editlivros", { livro: livros });
    });
});

router.post("/livros/editar_livros", (req, res) => {
  Livros.updateOne(
    { _id: req.body._id },
    { $set: { nome: req.body.nome, descricao: req.body.descricao, genero: req.body.genero } }
  ).then(() => {
    res.redirect("/rota_livros/livros");
  });
});

router.get("/deletar_livros/:id", (req, res) => {
  Livros.deleteMany({ _id: req.params.id }).then(() => {
    res.redirect("/rota_livros/livros");
  });
});
module.exports = router;