import { connection, Sequelize } from '../../models'

const handler = async (req, res) => {

    const flight_id = req.query?.flight_id 
    const passenger_id = req.query?.passenger_id
    const ticket_cost = req.query?.ticket_cost
    const waitlist_no = req.query?.waitlist_no 
    // const boarding_pass_id = req.query?.boarding_pass_id

    try {
        connection.query(`INSERT INTO tickets (flight_id, passenger_id, ticket_cost, waitlist_no)  VALUES ('${flight_id}', '${passenger_id}', '${ticket_cost}', '${waitlist_no}');`)
    } catch (error) {
        connection.query(`ROLLBACK;`) // Rollback any tickets, passengers, and booking created in this transaction
        return res.status(500).json({ message: error.message })
    }
}
export default handler