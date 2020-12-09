// bookings take customer_id, book_date, card_no, total, taxes
import { connection, Sequelize } from '../../models'

const handler = async (req, res) => {


    // BOOKINGS
    const customer_id = req.query?.customer_id
    const book_date = req.query?.book_date 
    const card_no = req.query?.card_no 
    const total = req.query?.total
    const taxes = req.query?.taxes

    let book_obj
    
    try {  // transactions begins here! commit when all passengers and tickets are created succefully
        let book_obj = await connection.query(`\
        BEGIN; \n\
        INSERT INTO bookings (customer_id, book_date, card_no, total, taxes) \n\
        VALUES (${customer_id}, ${book_date}, ${card_no}, ${total}, ${taxes}) RETURNING book_id;\n`)
    } 
    // type: Sequelize.QueryTypes.SELECT
    catch (error) {
        return res.status(500).json({ message: error.message })
    }

    // PASSENGERS
    const book_id = book_obj.book_id
    // for passenger in passengers
    const name = req.query?.name
    const phone = req.query?.phone
    const email = req.query?.email 

    try {
        connection.query(`INSERT INTO passengers (book_id, passenger_name, passenger_phone, passenger_email)  VALUES ('${book_id}', '${name}', '${phone}', '${email}');`)
    } catch (error) {
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


export default handler

}
