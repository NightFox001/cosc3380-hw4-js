import { connection, Sequelize } from '../../models'
import moment from 'moment';


const handler = async (req, res) => {
	if (req.method === 'GET') {
		// const { user: { customer_email: email } } = req.body
		const email = req.query?.email
		let ticket_info
		try { // get book_id from customers where customer_email = 'email'
			ticket_info = await connection.query(`
				SELECT COUNT(*) AS tickets_purchased, ticket_cost, scheduled_departure, scheduled_arrival, arrival_airport_id, departure_airport_id, movie, meal
				FROM tickets t, flights f
				WHERE t.flight_id = f.flight_id AND passenger_id IN (
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
				GROUP BY ticket_id, f.flight_id;
				\n`, 
				{ type: Sequelize.QueryTypes.SELECT });
			console.log(ticket_info)
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
