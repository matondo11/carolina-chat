// Importando o sequelize para conectar com o banco de dados
const Sequelize = require("sequelize");
// Definindo as configurações de conexão com o banco de dados
// As variaveis de ambiente são definidas no arquivo .env
const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const db_name = process.env.DB_NAME;
const host = process.env.DB_HOST;
// // Criando uma instância do Sequelize para conectar com o banco de dados MySQL
const sequelize = new Sequelize(db_name, user, password, {
  host: host,
  dialect: "mysql",
});
// Testando a conexão com o banco de dados
const conectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
};


// Exportando modulo para que a função conectar com banco de dados seja usada em qualquer parte da aplicação
module.exports = {conectDB, sequelize, Sequelize}
// Exportando a instância do Sequelize para que possa ser usada em outros arquivos
