import { connection, Sequelize } from '../../models'


const handler = async (req, res) => {
	const book_id = req.query?.book_id

	try {
		connection.query(`BEGIN;`);
		connection.query(`
			DELETE FROM boarding_passes
			WHERE boarding_pass_id IN (
				SELECT boarding_pass_id
				FROM tickets
				WHERE passenger_id IN (
					SELECT passenger_id
					FROM passengers
					WHERE book_id = '${book_id}'
				)
			);

			DELETE FROM tickets
			WHERE passenger_id IN (
				SELECT passenger_id
				FROM passengers
				WHERE book_id = '${book_id}'
			);

			DELETE FROM passengers
			WHERE book_id = '${book_id}';

			DELETE FROM bookings
			WHERE book_id = '${book_id}';

		`);
		connection.query(`COMMIT;`);
	} catch(error) {
		connection.query(`ROLLBACK;`);
		return res.status(500).json({ message: error.message });
	}

	return res.status(1).json({ message: "successful deletion" });
}

export default handler
