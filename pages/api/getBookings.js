import { connection, Sequelize } from '../../models'
import moment from 'moment';


const handler = async (req, res) => {
    if (req.method === 'GET') {
        const { user: { customer_email: email } } = req.body
        console.log('email = ', email)
        let book_id
        try { // get book_id from customers where customer_email = 'email'
            book_id = await connection.query(`\
            SELECT book_id \n\
            FROM bookings \n\
            WHERE customer_email = '${email}';`, { type: Sequelize.QueryTypes.SELECT });
            book_id = book_id[0].book_id
            console.log(email, customer)
            console.log(book_id)

        } 
        catch (error) {
            console.log(`\n\n\n\n(In api/getBookins.js)\n tried to get book_id with the customer_email, but got this error... \n
            ${error}\n\n`)
            return res.status(500).json({ message: error.message })
        }

 

        return res.json([])
    }
}

export default handler