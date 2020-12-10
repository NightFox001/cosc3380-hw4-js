import Sequelize from 'sequelize'
/*
const creds = {
  database: "COSC3380",
  username: "cosc0146",
  password: "",
  host: "code.cs.uh.edu",
  dialect: "postgres"
}
const creds = {
  database: "COSC3380",
  username: "cosc0210",
  password: "",
  host: "76.226.74.200",
  dialect: "postgres"
}
*/
const creds = {
  database: "COSC3380",
  username: "cosc0210",
  password: "",
  host: "code.cs.uh.edu",
  dialect: "postgres"
}
const { database, username, password, ...config } = creds;

const connection = new Sequelize(database, username, password, config);

module.exports = { connection, Sequelize }
