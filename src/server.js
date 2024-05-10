const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();

const rota_livros = require("./controller/livrosController.js");
const rota_autores = require("./controller/autoresController.js");

const PORT = 8081;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/book", rota_livros);
app.use("/author", rota_autores);

app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));

app.get("/", (req, res) => {
  res.render("homePage");
});

app.listen(PORT, () => {
  console.log("Servidor Rodando");
});
