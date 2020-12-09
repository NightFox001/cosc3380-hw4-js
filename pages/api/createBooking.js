// bookings take customer_id, book_date, card_no, total, taxes
import { connection, Sequelize } from '../../models'
import moment from 'moment';


const handler = async (req, res) => {
    if (req.method === 'POST') {

        // BOOKINGS
        // const customer_id = req.body.
        // const card_no = req.body. 

        const { user: { customer_email: email } } = req.body
        const book_date = moment().format("YYYY-MM-DD");

        console.log(`date = ${book_date}`)
        const passengers = req.body.passengers
        const numberOfPassengers = req.body.numberOfPassengers
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
            console.log(email, customer)
        } 
        catch (error) {
            console.log(`\n\n\n\n(In createBooking.js)\n tried to get customer_id with the customer_email, in createBooking.js, but got this error... \n
            ${error}\n\n`)
            return res.status(500).json({ message: error.message })
        }

// transactions begins here! commit when all passengers and tickets are created succefully
        let book_obj
        try {  
            book_obj = await connection.query(`\
            BEGIN; \n
            INSERT INTO bookings (customer_id, book_date, card_no, total, taxes) \n
            VALUES ('${customer_id}', '${book_date}', '${card_no}', '${total}', '${taxes}');\n`)
            // console.log(book_obj)
        } 
        catch (error) {
            console.log(`\n\n\n\n(In createBooking.js)\n tried to begin transaction and insert into TABLE 'bookings'\n customer_id, book_date, card_no, total, taxes,\n but got this error... \n 
        ${error}`)
            return res.status(500).json({ message: error.message })
        }


// Get book_id that was just created
        let book
        let book_id
        try {
            book = await connection.query(`\
            SELECT book_id \n\
            FROM bookings \n\
            WHERE customer_id = '${customer_id}';`, { type: Sequelize.QueryTypes.SELECT });
            book_id = book[0].book_id
            // throw 'Got book_id without error'
        } 
        catch (error) {
            console.log(`\n\n\n\n(In createBooking.js)\n tried to get book_id with the customer_id, but got this error... \n
            ${error}\n\n`)
            connection.query(`ROLLBACK;`)
            return res.status(500).json({ message: error.message })
        }     
                

// Insert PASSENGERS
        console.log('book_id = ', book_id)
        console.log(req.body)

        for (let i = 0; i < numberOfPassengers; i += 1) {
            const passenger = passengers[i]
            console.log(`\npassenger (${i})  =  ${passenger}\n`)
            let name = passenger.name
            let phone = passenger.phone
            let passEmail = passenger.email
            try {
                connection.query(`\n
                    INSERT INTO passengers (book_id, passenger_name, phone, email) \n
                    VALUES ('${book_id}', '${name}', '${phone}', '${passEmail}');\n\n`)
            } catch (error) {
                console.log(`\n\n\n\n(In createBooking.js)\n while trying to insert into TABLE 'passengers'\n (book_id, passenger_name, passenger_phone, passenger_email)\n we got this error... \n 
                ${error}`)
                connection.query(`ROLLBACK;`) // Rollback any passengers and booking created in this transaction
                return res.status(500).json({ message: error.message })
            }

            // Get seats available from flight to check and insert into ticket
            // let availableSeats_obj
            // let availableSeats
            // try {
            //     availableSeats_obj = await connection.query(`\
            //     SELECT seats_available \n\
            //     FROM flights \n\
            //     WHERE flight_id = ${flight_id};`, {
            //         type: Sequelize.QueryTypes.SELECT
            //     });
            // } 
            // catch (error) {
            //     console.log(`\n\n\n\n(In createBooking.js)\n while trying to get seats_available from TABLE 'flights'\n we got this error... \n 
            //     ${error}`)
            //     connection.query(`ROLLBACK;`)
            //     return res.status(500).json({ message: error.message })
            // }

            // // TICKETS
            // const passenger_id = req.query?.passenger_id
            // const ticket_cost = req.query?.ticket_cost
            // const waitlist_no = req.query?.waitlist_no 

            // try {
            //     connection.query(`INSERT INTO tickets (flight_id, passenger_id, ticket_cost, waitlist_no)  VALUES ('${flight_id}', '${passenger_id}', '${ticket_cost}', '${waitlist_no}');`)
            // } 
            // catch (error) {
            //     connection.query(`ROLLBACK;`) // Rollback any tickets, passengers, and booking created in this transaction
            //     return res.status(500).json({ message: error.message })
            // }
        } // End of passenger for loop
        


    // else if (req.method === 'POST') { 
    //     console.log(req.body)
        // console.log(req.body.totalCost)
    }
}

export default handler
