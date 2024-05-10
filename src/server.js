const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const rota_livros = require("./controller/livrosController.js");
const rota_autores = require("./controller/autoresController.js");
const cors = require("cors");

const PORT = 8081;
app.use("/book", rota_livros);
app.use("/author", rota_autores);
app.use(cors())
app.use(bodyParser.json());
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.get("/", (req,res) => res.send("hello world"))

app.listen(PORT, () => {
  console.log("Servidor Rodando");
});
