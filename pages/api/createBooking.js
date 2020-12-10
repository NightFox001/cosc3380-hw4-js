// bookings take customer_id, book_date, card_no, total, taxes
import { connection, Sequelize } from '../../models'
import moment from 'moment';


const handler = async (req, res) => {
    if (req.method === 'POST') {
        // connection.query('BEGIN;')

        const { user: { customer_email: email } } = req.body
        const book_date = moment().format("YYYY-MM-DD");

        console.log(`\n\n\n`)
        const allFlights = req.body.flights
        const passengers = req.body.passengers
        const numberOfPassengers = req.body.numberOfPassengers
        const total = req.body.totalCost
        const taxes = req.body.taxesPerPass * req.body.numberOfPassengers
        const card_no = 123456789 // FIXME

        let customer_id
        try { // get customer_id from customers where customer_email = 'email'
            customer_id = await connection.query(`\
            SELECT customer_id \n\
            FROM customers \n\
            WHERE customer_email = '${email}';`, { type: Sequelize.QueryTypes.SELECT });
            customer_id = customer_id[0].customer_id
            // console.log(email, customer)
        } 
        catch (error) {
            console.log(`\n\n\n\n(In createBooking.js)\n tried to get customer_id with the customer_email, in createBooking.js, but got this error... \n
            ${error}\n\n`)
            return res.status(500).json({ message: error.message })
        }

// transactions begins here! commit when all passengers and tickets are created succefully
        // let book_obj
        try {  
            await connection.query(`\n
            INSERT INTO bookings (customer_id, book_date, card_no, total, taxes) \n
            VALUES ('${customer_id}', '${book_date}', '${card_no}', '${total}', '${taxes}');\n`)
            // console.log(book_obj)
        } 
        catch (error) {
            console.log(`\n\n\n\n(In createBooking.js)\n tried to begin transaction and insert into TABLE 'bookings'\n customer_id, book_date, card_no, total, taxes,\n but got this error... \n ${error}`)
            return res.status(500).json({ message: error.message })
        }

// Get book_id that was just created
        let book_id
        let result3
        try {
            result3 = await connection.query(`\
            SELECT MAX(book_id) \n\
            FROM bookings \n\
            WHERE customer_id = '${customer_id}';`, { type: Sequelize.QueryTypes.SELECT });
            book_id = result3[0].max
            // throw 'Got book_id without error'
        } 
        catch (error) {
            console.log(`\n\n\n\n(In createBooking.js)\n tried to get book_id with the customer_id, but got this error... \n
            ${error}\n\n`)
            connection.query(`ROLLBACK;`)
            return res.status(500).json({ message: error.message })
        }
        console.log('book_id = ', book_id)



    // create new passenger
        for (let j = 0; j < numberOfPassengers; j += 1) {
            let passenger = passengers[j]
            let name = passenger.name
            let phone = passenger.phone
            let passEmail = passenger.email
            try {
                connection.query(`\n
                    INSERT INTO passengers (book_id, passenger_name, phone, email) \n
                    VALUES ('${book_id}', '${name}', '${phone}', '${passEmail}');\n\n`)
            } 
            catch (error) {
                console.log(`\n\n\n\n
                    (In createBooking.js)\n while trying to insert into TABLE 'passengers', but got this error... \n 
                    ${error}`)
                connection.query(`ROLLBACK;`) // Rollback any passengers and booking created in this transaction
                return res.status(500).json({ message: error.message })
            }
        }

// Insert PASSENGERS
        for (let i = 0; i < allFlights.length; i += 1 ) {
            let flight = allFlights[i]
            console.log(`\n\nflight loop ${i}: flight id = ${flight.flight_id}`)
            for (let j = 0; j < numberOfPassengers; j += 1) {
                let passenger = passengers[j]
                let name = passenger.name
                let passEmail = passenger.email

                console.log(name)

                let passenger_id
                try { // get that pasenger's id
                let result1 = await connection.query(`SELECT MAX(passenger_id) FROM passengers;`, { type: Sequelize.QueryTypes.SELECT });
                        console.log(' result1 = ', result1)
                    passenger_id = result1[0].max - numberOfPassengers+j+1 
                } 
                catch (error) {
                    console.log(`\n\n\n\n(In createBooking.js)\n tried to get passenger_id, but got this error... \n
                    ${error}\n\n`)
                    connection.query(`ROLLBACK;`)
                    return res.status(500).json({ message: error.message })
                }
                 

                // Get seats available from flight to check and insert into ticket
                let waitlist_no
                let numSeatsAvailable
                let result
                try {
                    result = await connection.query(`\
                    SELECT waitlist_no, seats_available \n\
                    FROM flights \n\
                    WHERE flight_id = ${flight.flight_id};`, {
                        type: Sequelize.QueryTypes.SELECT});
                        waitlist_no = result[0].seats_available
                        numSeatsAvailable = result[0].seats_available
                } 
                catch (error) {
                    console.log(`\n\n\n\n(In createBooking.js)\n while trying to get seats_available from TABLE 'flights'\n we got this error... \n 
                    ${error}`)
                    connection.query(`ROLLBACK;`)
                    return res.status(500).json({ message: error.message })
                }

                //if there are seats available: decrement availableSeats, create ticket
                // else get waitlist_no from flight to insert into ticket, increment waitlist_no

                console.log(`\n\nseats available: ${numSeatsAvailable}\n\n`)

                if (numSeatsAvailable > 0) {
                    // decrease num of seats available for that flight
                    try {
                        await connection.query(`\
                            UPDATE flights \n
                            SET seats_available = seats_available - 1 \n
                            WHERE flight_id = ${flight.flight_id};`)
                    } catch (error) {
                        console.log(`\n\n\n\n(In createBooking.js)\n tried to decrease num of seats available for flight #${flight.flight_id}, but got this error... \n
                        ${error}\n\n`)
                        connection.query(`ROLLBACK;`)
                        return res.status(500).json({ message: error.message })                        
                    }
                }
                else { // flight is full, increase waitlist
                    try {
                        waitlist_no = waitlist_no + 1
                        await connection.query(`\
                            UPDATE flights \n
                            SET waitlist_no = waitlist_no + 1 \n
                            WHERE flight_id = ${flight.flight_id};`)
                    } catch (error) {
                        console.log(`\n\n\n\n
                        (In createBooking.js)\n 
                        tried to increase waitlist_no for flight #${flight.flight_id}, but got this error... \n
                        ${error}\n\n`)
                        connection.query(`ROLLBACK;`)
                        return res.status(500).json({ message: error.message })                        
                    }
                }

                // // TICKETS
                let ticket_cost = flight.flight_cost // add taxes to this cost
                try {
                    connection.query(`\n
                    INSERT INTO tickets (flight_id, passenger_id, ticket_cost, waitlist_no) \n
                    VALUES ('${flight.flight_id}', '${passenger_id}', '${ticket_cost}', '${waitlist_no}');\n`)
                } 
                catch (error) {
                    console.log(`\n\n\n\n
                    (In createBooking.js)\n 
                    tried to create ticket for passenger '${name}', but got this error... \n
                    ${error}\n\n`)
                    connection.query(`ROLLBACK;`) // Rollback any tickets, passengers, and booking created in this transaction
                    return res.status(500).json({ message: error.message })
                }

            } // End of passenger for loop
        } // end of flight loop
        
        // all tickets made, commit changes to DB
        try {
            connection.query(`\n
                COMMIT;\n`)
            console.log('booking commited to DB!')
        } 
        catch (error) {
            console.log('booking not commited to DB')
            connection.query(`ROLLBACK;`) // Rollback any tickets, passengers, and booking created in this transaction
            return res.status(500).json({ message: error.message })
    }
    // else if (req.method === 'POST') { 
    }
    return
    
}

export default handler
