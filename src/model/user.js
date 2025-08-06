// Descrição: Este arquivo contém o modelo de usuário, que define a estrutura da tabela de usuários no banco de dados. O modelo inclui os campos id, nome, email e senha, com suas respectivas propriedades. O modelo é sincronizado com o banco de dados para garantir que a tabela seja criada corretamente.
const db = require("../../config/database");
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;


const user = sequelize.define("usuario", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
user.sync({ force: false }).then(() => {
  console.log("Tabela usuario criada com sucesso!");
});
// Exportando o modelo de usuario para ser usado em outros arquivos
module.exports = user;
// O modelo de usuario é uma representação da tabela usuario no banco de dados