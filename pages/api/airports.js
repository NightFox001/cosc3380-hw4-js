import { connection, Sequelize } from '../../models'

const handler = async (req, res) => {
    const airports = await connection.query(`SELECT city, airport_code\n FROM airport`, {
        type: Sequelize.QueryTypes.SELECT
    });

    return res.json(airports)
}

export default handler