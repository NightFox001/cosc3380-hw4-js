import { connection, Sequelize } from '../../models'
import moment from 'moment';


const handler = async (req, res) => {
	if (req.method === 'GET') {
		// const { user: { customer_email: email } } = req.body
		const email = req.query?.email
		let ticket_info
		try { // get book_id from customers where customer_email = 'email'
			ticket_info = await connection.query(`
				SELECT ticket_id, book_id, ticket_cost, flights.flight_id, scheduled_departure, scheduled_arrival, arrival_airport_id, departure_airport_id, movie, meal
				FROM flights, (
					SELECT flight_id, ticket_id, book_id, ticket_cost
					FROM tickets
					INNER JOIN passengers ON passengers.passenger_id = tickets.passenger_id 
					GROUP BY tickets.flight_id, passengers.book_id, tickets.ticket_cost, passengers.passenger_id, tickets.ticket_id
					HAVING passengers.passenger_id IN (
						SELECT passenger_id
						FROM passengers
						WHERE book_id IN (
							SELECT book_id
							FROM bookings
							WHERE customer_id IN (
								SELECT customer_id
								FROM customers
								WHERE customer_email = '${email}'
							)
						)
					)
				)a
				WHERE flights.flight_id = a.flight_id
				GROUP BY flights.flight_id, a.book_id, a.ticket_cost, a.ticket_id
				ORDER BY book_id;
				`, 
				{ type: Sequelize.QueryTypes.SELECT });
			console.log("ticket info: ", ticket_info)
			let book_map = new Map()
			ticket_info.forEach((e) => {
					let book_info = {
						ticket_cost: e.ticket_cost,
						ticket_id: e.ticket_id,
						tickets_purchased: 1,
						scheduled_departure: e.scheduled_departure,
						scheduled_arrival: e.scheduled_arrival,
						arrival_airport: e.arrival_airport_id,
						departure_airport: e.departure_airport_id,
						movie: e.movie,
						meal: e.meal,
						ticket_id: e.ticket_id
					}
					if (book_map[e.book_id] === undefined) {
						book_map[e.book_id] = []
						book_map[e.book_id].push(book_info)
					} else {
						book_map[e.book_id].forEach((e) => {
							book_info.tickets_purchased = ++e.tickets_purchased;
						});
						book_map[e.book_id].push(book_info)
					}
			});
			console.log(book_map);
			return res.json(book_map)
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
