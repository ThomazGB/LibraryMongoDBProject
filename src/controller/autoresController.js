const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Authors = require("../models/autores")


router.get("/", (req, res) => {
    Authors.find()
      .lean()
      .then((autores) => {
        res.render("admin/author/authors", { autores: autores });
      });
});

router.get("/add", (req, res) => {
    res.render("admin/author/addAuthor");
  });
  
router.post("/add/new", (req, res) => {
    var autores = new Authors();
    autores.nome = req.body.nome;
    autores.nacionalidade = req.body.nacionalidade;
    autores
      .save()
      .then(() => {
        res.redirect("/author/");
      })
      .catch((erro) => {
        res.send("Houve um erro: " + erro);
      });
  });
  
router.get("/edit/:id", (req, res) => {
    autores.findOne({ _id: req.params.id })
      .lean()
      .then((autores) => {
        res.render("admin/author/editAuthor", { autor: autores });
      });
  });

router.post("/edit", (req, res) => {
    autores.updateOne(
      { _id: req.body._id },
      { $set: { nome: req.body.nome, nacionalidade: req.body.nacionalidade } }
    ).then(() => {
      res.redirect("/author/");
    });
  });
  
router.get("/delete/:id", (req, res) => {
    autores.deleteMany({ _id: req.params.id }).then(() => {
      res.redirect("/author");
    });
  });
module.exports = router;