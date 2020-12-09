// bookings take customer_id, book_date, card_no, total, taxes
import { connection, Sequelize } from '../../models'

const handler = async (req, res) => {
    const customer_id = req.query?.customer_id
    const book_date = req.query?.book_date 
    const card_no = req.query?.card_no 
    const total = req.query?.total
    const taxes = req.query?.taxes

    // transactions begins here! commit when all passengers and tickets are created succefully
    try {
        await connection.query(`\
        BEGIN \n\
        INSERT INTO bookings (customer_id, book_date, card_no, total, taxes) \n\
        VALUES (${customer_id}, ${book_date}, ${card_no}, ${total}, ${taxes});\n`)
    } 
    catch (error) {
        // ROLLBACK?
        return res.status(500).json({ message: error.message })
    }


    connection.query(`INSERT INTO customers (customer_name, customer_email, password, city) VALUES ('${name}', '${email}', '${password}', '${city}');`)
    const customer = await connection.query(`SELECT *\n FROM customers`, {
        type: Sequelize.QueryTypes.SELECT
    });
    return res.json(customer)
}

export default handler


