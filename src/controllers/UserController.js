const user = require("../model/user");
const UserServices = require("../services/UserServices");
const authServices = require("../services/authService");
const addUser = UserServices.addUser;
const deleteUser = UserServices.deleteUser;
const updateUserEmail = UserServices.updateUserEmail;
const updateUserName = UserServices.updateUserName;
const ResetPassword = UserServices.ResetPassword;
const authenticateUser = authServices.authenticateUser;

signInController = (req, res) => {
  res.render("signin", { title: "Entrar", CustomCss: 'login'});
};
loginController = async (req, res) => {
  authenticateUser(req, res);
};

getUsersController = (req, res) => {
  user.findAll({ raw: true }).then((usuario) => {
    res.render("getUsers", { lista: usuario });
  });
};

createUserController = async (req, res) => {
  addUser(req, res);
};

updateController = (req, res) => {
  res.render("updateUser");
};
updateUserController = async (req, res) => {
  console.log("Dados recebidos:", req.body);
  const id_user = req.user.id;
  console.log("ID do usuário:", id_user);
  const { email, nome, senha } = req.body;
  if (email) {
    await updateUserEmail(id_user, email);
  }
  if (nome) {
    await updateUserName(id_user, nome);
  }
  if (senha) {
    // Se a senha for fornecida, atualiza a senha do usuário
   await ResetPassword(id_user, senha);
  }
  //
  res.redirect("/home");
};

SignupController = (req, res) => {
  res.render("signUp",{CustomCss: 'cadastro'});
};

deleteController = (req, res) => {
  res.render("delete");
};
deleteUserController = async (req, res) => {
  const id_user = req.session.userId;
  deleteUser(id_user);
};

homepageController = (req, res) => {
  res.render("home", { title: "Home" });
};

module.exports = {
  getUsersController,
  createUserController,
  SignupController,
  updateUserController,
  updateController,
  deleteController,
  deleteUserController,
  signInController,
  loginController,
  homepageController,
};
