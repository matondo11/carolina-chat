// Descrição: Este arquivo contém funções para adicionar, atualizar e excluir usuários no banco de dados. As funções utilizam o modelo de usuário definido no Sequelize para interagir com o banco de dados. As funções incluem addUser, updateUserName, updateUserEmail, ResetPassword e deleteUser.
const { where } = require("sequelize");
const user = require("../model/user");
const { authenticateUser } = require("./authService");
const bcrypt = require("bcrypt");


addUser = async (req, res) => {
  const credencias = req.body
  const nome = credencias.nome;
  const email = credencias.email;
  const senha = credencias.senha;
  const passwordHash = await bcrypt.hash(senha, 10);
  const userExists = await user.findOne({ where: { email } });
  if (userExists) {
    req.flash("errorMsg", "Email já cadastrado");
    return res.redirect("/cadastro");
  }else if (!userExists) {
    user
      .create({
        nome: nome,
        email: email,
        senha: passwordHash,
      })
      .then(() => {
        req.flash("sucessMsg", "Usuario cadastrado com sucesso");
        res.redirect("/signin");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar usuario", `${error}`);
        req.flash("errorMsg", "Erro ao cadastrar usuario");
        res.redirect("/signup");
      });
  }
};


updateUserName = async (id_user, name) => {
  try {
    await user.update({nome: name}, {where: {id:id_user}});
    console.log("email actualiazado com sucesso");
  } catch (error) {
    console.log("erro ao actualizar dado do usuario", `${error}`);
  }
}


updateUserEmail = async (id_user,email) => {
  try {
    await user.update({email: email}, {where: {id:id_user}});
    console.log("email actualiazado com sucesso");
  } catch (error) {
    console.log("erro ao actualizar dado do usuario", `${error}`);
  }
}

ResetPassword = async (id_user, password) => {
  try {
    await user.update({ senha: password }, { where: { id: id_user } });
    console.log("senha actualizada com sucesso");
  } catch (error) {
    console.log("erro ao actualizar senha do usuario", `${error}`);
  }
}



deleteUser = async (id_user) => {
  try {
    await user.destroy({ where: { id: id_user } });
    console.log("Usuario removido com sucesso");
  } catch (error) {
    console.log("erro ao remover usuario", `${error}`);
  }
};





module.exports = {
  addUser,
  updateUserName,
  updateUserEmail,
  deleteUser,
  ResetPassword
};


