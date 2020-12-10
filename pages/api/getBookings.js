import { connection, Sequelize } from '../../models'
import moment from 'moment';


const handler = async (req, res) => {
	if (req.method === 'GET') {
		// const { user: { customer_email: email } } = req.body
		const email = req.query?.email
		let ticket_info
		try { // get book_id from customers where customer_email = 'email'
			ticket_info = await connection.query(`
SELECT COUNT(*) AS tickets_purchased, book_id, ticket_cost, flight_id, scheduled_departure, scheduled_arrival, arrival_airport_id, departure_airport_id, movie, meal\n
				FROM flights, (\n
					SELECT flight_id, book_id, ticket_cost\n
					FROM tickets\n
					INNER JOIN passengers ON passengers.passenger_id = tickets.passenger_id \n
					GROUP BY tickets.flight_id, passengers.book_id, tickets.ticket_cost, passengers.passenger_id\n
					HAVING passengers.passenger_id IN (\n
						SELECT passenger_id\n
						FROM passengers\n
						WHERE book_id IN (\n
							SELECT book_id\n
							FROM bookings\n
							WHERE customer_id IN (\n
								SELECT customer_id\n
								FROM customers\n
								WHERE customer_email = 'youareabitch@aol.com'\n
							)\n
						)\n
					)\n
				)a\n
				WHERE flights.flight_id = a.flight_id\n
				GROUP BY flights.flight_id, a.book_id, a.ticket_cost;\n
				`, 
				{ type: Sequelize.QueryTypes.SELECT });
			return res.json(ticket_info)
		} 
		catch (error) {
			console.log(`\n\n\n\n(In api/getBookins.js)\n tried to get book_id with the customer_email, but got this error... \n
						${error}\n\n`)
			return res.status(500).json({ message: error.message })
		}
		return res.json(ticket_info)
	}
}

export default handler
