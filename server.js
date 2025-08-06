// Descrição: Este arquivo é o ponto de entrada do servidor Express. Ele configura o servidor, conecta ao banco de dados e define as rotas.
// Autor: Matondo Domingos Bunga
const express = require("express");
  const server = express();
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const db = require("./config/database");
const db_conect = db.conectDB;
const Router = require("./src/routes/UserRoutes");
const bodyparser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
// configurações
server.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  })
);
server.use(flash());
server.use((req, res, next) => {
  res.locals.errorMsg = req.flash("errorMsg");
  res.locals.sucessMsg = req.flash("sucessMsg");
  next();
});
server.use(cookieParser());
// Conectando ao banco de dados
db_conect();
// Configurando o handlebars
server.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
  })
);
// Configurando o handlebars como view engine
server.set("view engine", "handlebars");
// Configurando o body-parser para receber dados do formulario
server.use(bodyparser.urlencoded({ extended: false }));
// Configurando o body-parser para receber dados do formulario em formato json
server.use(bodyparser.json());
// Configurando o middleware para servir arquivos estáticos
// Carregando arquivos estaticos apartir da pasta public
server.use(express.static("public"));
server.use(methodOverride("_method"));
server.use(Router);
const port = process.env.PORT; 
// Iniciando o servidor
server.listen(port, () => {
  console.log(`servidor rodando na porta:${port}`);
});
