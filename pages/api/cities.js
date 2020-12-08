import { connection, Sequelize } from '../../models'

const handler = async (req, res) => {
    const cities = await connection.query(`SELECT DISTINCT(city)\n FROM airports`, {
        type: Sequelize.QueryTypes.SELECT
    });

    return res.json(cities)
}

export default handler