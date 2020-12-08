import { connection, Sequelize } from '../../models'

const handler = async (req, res) => {
    
    const customers = await connection.query(`SELECT customer_email\n FROM customer`, {
        type: Sequelize.QueryTypes.SELECT
    });
    console.log(customers);
    return res.status(400).json({ message: "Email is not available." })

    for (var key in myObject) {
        if (myObject.hasOwnProperty(key)) {
            return res.status(400).json({ message: "Email is not available." })
        }
    }
}

export default handler