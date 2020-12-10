import { connection, Sequelize } from '../../models'


const handler = async (req, res) => {
	let customer = null
	const email = req.query?.email
	const password = req.query?.password
	console.log(email, password)

	try {
		customer = await connection.query('SELECT customer_email, password\nFROM customers\nWHERE customer_email = \'' + email + '\' AND password = \'' + password + '\';', {
			type: Sequelize.QueryTypes.SELECT
		});
		
		if (customer.length === 0) {
			return res.status(400).json({ message: "Incorrect email or password" })
		}

	} catch(error) {
		return res.status(403).json({ message: error.message })
	}

	return res.json(customer[0])
}

export default handler
