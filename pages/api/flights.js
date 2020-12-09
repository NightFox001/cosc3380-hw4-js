import moment, { tz } from "moment"
import { connection, Sequelize } from '../../models'

const handler = async (req, res) => {
    const { 
      departAirport, 
      arriveAirport, 
      departDate
    } = req.query
    
    console.log('original', departDate)
    const dayAfterDepartFormatted = moment(departDate).add(1, 'day').format('YYYY-MM-DD')
    const departDateFormatted = moment(departDate).format('YYYY-MM-DD')
    
    console.log('original', departDate)
    console.log("depart date", departDateFormatted)
    console.log("next date", dayAfterDepartFormatted)

    const nonstopFlights = await connection.query(
      `SELECT * \n
      FROM flights \n
      WHERE departure_airport = '${departAirport}' \n
      AND arrival_airport = '${arriveAirport}' \n
      AND scheduled_departure BETWEEN '${departDateFormatted}'
      AND '${dayAfterDepartFormatted}'\n
      LIMIT 50;\n`,
      {
        type: Sequelize.QueryTypes.SELECT
      },
    );

    const connectingFlights = await connection.query(
        `\n
        SELECT \n
            f1.flight_id as f1_flight_id, \n
            f1.scheduled_departure as f1_scheduled_departure, \n
            f1.scheduled_arrival as f1_scheduled_arrival, \n
            f1.departure_airport as f1_departure_airport, \n
            f1.arrival_airport as f1_arrival_airport, \n
            f1.flight_cost as f1_flight_cost, \n
            f2.flight_id as f2_flight_id, \n
            f2.scheduled_departure as f2_scheduled_departure, \n
            f2.scheduled_arrival as f2_scheduled_arrival, \n
            f2.departure_airport as f2_departure_airport, \n
            f2.arrival_airport as f2_arrival_airport, \n
            f2.flight_cost as f2_flight_cost \n
        FROM flights as f1 \n
        INNER JOIN flights as f2 \n
            on f1.flight_id <> f2.flight_id \n
            AND f1.scheduled_departure >= '${departDateFormatted}' \n
            AND f1.scheduled_departure <= '${dayAfterDepartFormatted}' \n
            AND f2.scheduled_departure >= '${departDateFormatted}' \n
            AND f2.scheduled_departure <= '${dayAfterDepartFormatted}' \n
            AND f1.scheduled_arrival <= f2.scheduled_departure \n
            AND f1.departure_airport = '${departAirport}' \n
            AND f1.arrival_airport <> '${arriveAirport}' \n
            AND f2.arrival_airport = '${arriveAirport}' \n
            AND f1.arrival_airport = f2.departure_airport \n
            limit 20\n;\n`,
        {
          type: Sequelize.QueryTypes.SELECT
        },
      );

    const formattedConnectingFlights = connectingFlights.map((flight) => ([
        {
            flight_id: flight.f1_flight_id,
            scheduled_departure: flight.f1_scheduled_departure,
            scheduled_arrival: flight.f1_scheduled_arrival,
            departure_airport: flight.f1_departure_airport,
            arrival_airport: flight.f1_arrival_airport,
            flight_cost: flight.f1_flight_cost,
        },
        {
            flight_id: flight.f2_flight_id,
            scheduled_departure: flight.f2_scheduled_departure,
            scheduled_arrival: flight.f2_scheduled_arrival,
            departure_airport: flight.f2_departure_airport,
            arrival_airport: flight.f2_arrival_airport,
            flight_cost: flight.f2_flight_cost,
        }
    ]))

    return res.json([ ...nonstopFlights, ...formattedConnectingFlights ])
}

export default handler
