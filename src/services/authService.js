// Descrição: Este arquivo contém a função authenticateUser, que autentica um usuário com base no email e senha fornecidos. Se a autenticação for bem-sucedida, o ID e o nome do usuário são armazenados na sessão. Caso contrário, uma mensagem de erro é exibida e o usuário é redirecionado para a página de login.
const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// configuração da variável de ambiente
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRATION;

authenticateUser = async (req, res) => {
  const credencias = req.body;
  const password = credencias.senha;
  const email = credencias.email;
  const User = await user.findOne({ where: { email } });
  console.log(User);
  if (!User) {
    req.flash("errorMsg", "Email ou senha inválidos");
    return res.redirect("/signin");
  } else if (await bcrypt.compare(password, User.senha)) {
    // Se a senha estiver correta, armazene o ID e o nome do usuário na sessão    
    const token = jwt.sign({ id: User.id, nome: User.nome }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    console.log(token);
    req.flash("sucessMsg", "login realizado com sucesso");
    return res.redirect("/home");
  }
};

module.exports = { authenticateUser };
