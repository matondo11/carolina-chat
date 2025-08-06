const express = require("express");
const routes = express.Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");
const SignupController = UserController.SignupController;
const createUserController = UserController.createUserController;
const getUsersController = UserController.getUsersController;
const updateUserController = UserController.updateUserController;
const deleteController = UserController.deleteController;
const updateController = UserController.updateController;
const deleteUserController = UserController.deleteUserController;
const signInController = UserController.signInController;
const loginController = UserController.loginController;
const homepageController = UserController.homepageController;
const isLoggedIn = authMiddleware.IsloggenIn;

// Rotas

// Create
routes.get("/cadastro", SignupController);
routes.post("/cadastro", createUserController);
// Read
routes.get("/listarUsuarios", isLoggedIn, getUsersController);
// Update
routes.get("/actualizar", isLoggedIn, updateController);
routes.post("/actualizar",isLoggedIn, updateUserController);
// delete
routes.get("/excluir", isLoggedIn, deleteController);
routes.post("/excluir",isLoggedIn, deleteUserController);
// LOGIN
routes.get("/signin", signInController);
routes.post("/signin", loginController);

//Rota para a homepage
routes.get("/home",isLoggedIn, homepageController);

module.exports = routes;
