import { connection, Sequelize } from '../../models'

const handler = async (req, res) => {
    const { 
        departAirport, 
        destAirport, 
        departDate,
        passenger_count, 
        trip_type
        } = req.query

    const dayAfterDepart = moment(depart_date).add(1, "day").toDate()
    
    console.log("depart date", departDate)
    console.log("next date", dayAfterDepart)

    const nonstopFlights = await connection.query(
      `SELECT * \n
      FROM flights \n
      WHERE departure_airport = '${departAirport}' \n
      AND arrival_airport = '${destAirport}' \n
      AND scheduled_departure BETWEEN '${departDate}'
      AND '${dayAfterDepart}'\n
      LIMIT 50;\n`,
      {
        type: Sequelize.QueryTypes.SELECT
      },
    );

    const connectingFlights = await connection.query(
        `SELECT * \
        FROM flights as f1 \
        INNER JOIN flights as f2 \
            on f1.flight_id <> f2.flight_id \
            AND f1.scheduled_departure >= '${departDate}' \
            AND f1.scheduled_departure <= '${dayAfterDepart}' \ 
            AND f2.scheduled_departure >= '${departDate}' \
            AND f2.scheduled_departure <= '${dayAfterDepart}' \
            AND f1.scheduled_arrival <= f2.scheduled_departure \
            AND f1.departure_airport = '${departAirport}' \
            AND f1.arrival_airport <> '${destAirport}' \
            AND f2.arrival_airport = '${destAirport}' \
            AND f1.arrival_airport = f2.departure_airport \
            limit 20\n;`,
        {
          type: Sequelize.QueryTypes.SELECT
        },
      );

    return res.json([ ...nonstopFlights, ...connectingFlights ])
}

export default handler
