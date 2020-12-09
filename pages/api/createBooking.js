// bookings take customer_id, book_date, card_no, total, taxes
import { connection, Sequelize } from '../../models'
import moment from 'moment';


const handler = async (req, res) => {
    if (req.method === 'POST') {

        // BOOKINGS
        // const customer_id = req.body.
        // const card_no = req.body. 

        const { user: { customer_email: email } } = req.body
        const book_date = moment().format("'YYYY-MM-DD'");

        console.log(`date = ${book_date}`)

        const total = req.body.totalCost
        const taxes = req.body.taxesPerPass * req.body.numberOfPassengers
        const card_no = 123456789 // FIXME

// get customer_id from customers where customer_email = 'email'
        let customer
        let customer_id
        try {
            customer = await connection.query(`\
            SELECT customer_id \n\
            FROM customers \n\
            WHERE customer_email = '${email}';`, { type: Sequelize.QueryTypes.SELECT });
            customer_id = customer[0].customer_id
            // throw 'ERROR: jk, nothing to see here'
            console.log(`got customer_id = ${customer_id}`)
        } 
        catch (error) {
            console.log(`tried to get customer_id with the customer_email, in createBooking.js, but got this error below... \n ${error}`)
            return res.status(500).json({ message: error.message })
        }

// transactions begins here! commit when all passengers and tickets are created succefully
        let book_obj
        try {  
            let book_obj = await connection.query(`\
            BEGIN; \n\
            INSERT INTO bookings (customer_id, book_date, card_no, total, taxes) \n\
            VALUES (${customer_id}, ${book_date}, ${card_no}, ${total}, ${taxes}) RETURNING book_id;\n`)
        } 
        catch (error) {
            console.log(`\n\n\n\n(In createBooking.js)\n tried to begin transaction and insert into TABLE 'bookings'\n customer_id, book_date, card_no, total, taxes,\n but got this error below... \n 
        ${error}`)
            return res.status(500).json({ message: error.message })
        }

// Insert PASSENGERS
        const book_id = book_obj.book_id
        // for passenger in passengers
        // const name = req.query?.name
        // const phone = req.query?.phone

        try {
            connection.query(`INSERT INTO passengers (book_id, passenger_name, passenger_phone, passenger_email)  VALUES ('${book_id}', '${name}', '${phone}', '${email}');`)
        } catch (error) {
            console.log(`\n\n\n\n(In createBooking.js)\n while trying to insert into TABLE 'passengers'\n (book_id, passenger_name, passenger_phone, passenger_email)\n we got this error below... \n 
        ${error}`)
            connection.query(`ROLLBACK;`) // Rollback any passengers and booking created in this transaction
            return res.status(500).json({ message: error.message })
        }

        // Get seats available from flight to check and insert into ticket
        let availableSeats
        try {
            availableSeats = await connection.query(`\
            SELECT seats_available \n\
            FROM flights \n\
            WHERE flight_id = ${flight_id};`, {
                type: Sequelize.QueryTypes.SELECT
            });
        } 
        catch (error) {
            return res.status(500).json({ message: error.message })
        }

        // TICKETS
        const passenger_id = req.query?.passenger_id
        const ticket_cost = req.query?.ticket_cost
        const waitlist_no = req.query?.waitlist_no 

        try {
            connection.query(`INSERT INTO tickets (flight_id, passenger_id, ticket_cost, waitlist_no)  VALUES ('${flight_id}', '${passenger_id}', '${ticket_cost}', '${waitlist_no}');`)
        } catch (error) {
            connection.query(`ROLLBACK;`) // Rollback any tickets, passengers, and booking created in this transaction
            return res.status(500).json({ message: error.message })
        }
    } 
    
    else {
        console.log(req.body)
        // console.log(req.body.totalCost)



    }
}

export default handler
