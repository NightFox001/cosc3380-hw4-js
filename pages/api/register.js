import { connection, Sequelize } from '../../models'

const handler = async (req, res) => {
    let customers
    try {
        customers = await connection.query(`SELECT customer_email\n FROM customers`, {
            type: Sequelize.QueryTypes.SELECT
        });
    } 
    catch (error) {
        return res.status(500).json({ message: error.message })
    }

    // console.log(customers);
    const name = req.query?.name
    const email = req.query?.email //email entered by user
    const password = req.query?.password 
    const city = req.query?.city
    for (var i = 0; i < customers.length; i++) {
        if (customers[i].customer_email === email) {
            return res.status(400).json({ message: "Email is not available." })
        }
    }
    connection.query(`INSERT INTO customers (customer_name, customer_email, password, city) VALUES ('${name}', '${email}', '${password}', '${city}');`)
    const customer = await connection.query(`SELECT *\n FROM customers`, {
        type: Sequelize.QueryTypes.SELECT
    });
    return res.json(customer)
}

export default handler


