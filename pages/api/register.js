import { connection, Sequelize } from '../../models'

const handler = async (req, res) => {
    let customers
    try {
        customers = await connection.query(`SELECT customer_email\n FROM customers;`, {
            type: Sequelize.QueryTypes.SELECT
        });
    } 
    catch (error) {
        return res.status(500).json({ message: error.message })
    }

    const name = req.query?.name
    const email = req.query?.email //email entered by user
    const password = req.query?.password 
    const city = req.query?.city
    for (var i = 0; i < customers.length; i++) {
        if (customers[i].customer_email === email) {
            return res.status(400).json({ message: "Email is not available." })
        }
    }

    try {
        connection.query(
            `BEGIN;
            INSERT INTO customers (customer_name, customer_email, password, city) VALUES ('${name}', '${email}', '${password}', '${city}');`)
        const customer = await connection.query(`SELECT *\n FROM customers WHERE customer_email = '${email}';`, {
            type: Sequelize.QueryTypes.SELECT    
        });
        connection.query('COMMIT;')
        return res.json(customer[0])
    }catch (error) {
        console.log(
        `\n\n\n\n(In api/register.js)\n
         while trying to insert into TABLE 'customers'\n
        (customer_name, customer_email, password, city)\n 
        we got this error... \n 
        ${error}`)
        connection.query(`ROLLBACK;`) // Rollback any passengers and booking created in this transaction
        return res.status(500).json({ message: error.message })
    }

}

export default handler
