const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../models/autores")
const Autores = mongoose.model("autores")

router.get("/autores", (req, res) => {
    Autores.find()
      .lean()
      .then((autores) => {
        res.render("admin/autores/autores", { autores: autores });
      });
});

router.get("/autores/add", (req, res) => {
    res.render("admin/autores/addautores");
  });
  
router.post("/autores/add/new", (req, res) => {
    var autores = new Autores();
    autores.nome = req.body.nome;
    autores.nacionalidade = req.body.nacionalidade;
    autores
      .save()
      .then(() => {
        res.redirect("/rota_autores/autores");
      })
      .catch((erro) => {
        res.send("Houve um erro: " + erro);
      });
  });
  
router.get("/editar_autores/:id", (req, res) => {
    autores.findOne({ _id: req.params.id })
      .lean()
      .then((autores) => {
        res.render("admin/autores/editautores", { autor: autores });
      });
  });

router.post("/autores/editar_autores", (req, res) => {
    autores.updateOne(
      { _id: req.body._id },
      { $set: { nome: req.body.nome, nacionalidade: req.body.nacionalidade } }
    ).then(() => {
      res.redirect("/rota_autores/autores");
    });
  });
  
router.get("/deletar_autores/:id", (req, res) => {
    autores.deleteMany({ _id: req.params.id }).then(() => {
      res.redirect("/rota_autores/autores");
    });
  });
module.exports = router;