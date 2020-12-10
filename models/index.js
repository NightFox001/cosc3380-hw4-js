import Sequelize from 'sequelize'

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
