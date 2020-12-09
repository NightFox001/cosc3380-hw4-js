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
        BEGIN; \n\
        INSERT INTO bookings (customer_id, book_date, card_no, total, taxes) \n\
        VALUES (${customer_id}, ${book_date}, ${card_no}, ${total}, ${taxes});\n`)
    } 
    catch (error) {
        return res.status(500).json({ message: error.message })
    }


    const book_id = req.query?.book_id 
    const name = req.query?.name
    const phone = req.query?.phone
    const email = req.query?.email 

    try {
        connection.query(`INSERT INTO passengers (book_id, passenger_name, passenger_phone, passenger_email)  VALUES ('${book_id}', '${name}', '${phone}', '${email}');`)
    } catch (error) {
        connection.query(`ROLLBACK;`) // Rollback any passengers and booking created in this transaction
        return res.status(500).json({ message: error.message })
    }
}
export default handler


