import axios from 'axios';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import moment, { tz } from "moment"


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: "rgba(255,255,255,0.9)"
  }
}));

const Flights = () => {
  const router = useRouter()
  const classes = useStyles()
  const [departFlights, setDepartFlights] = useState([])
  const [returnFlights, setReturnFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(false)
  const {
    departAirport,
    arriveAirport,
    departDate,
    returnDate,
    tripType,
  } = router.query

  useEffect(() => {
    if (departDate) {
      const getFlights = async () => {
        // always do this
        console.log('departDate', departDate)
        const departResponse = await axios.get(`/api/flights?departAirport=${departAirport}&arriveAirport=${arriveAirport}&departDate=${departDate}`)
        console.log(departResponse)
        if (departResponse.statusText === "OK") {
          setDepartFlights(departResponse.data)
        } else {
          setDepartFlights([])
        }

        // do this for round trip
        if (tripType === "roundTrip") {
          const returnResponse = await axios.get(`/api/flights?departAirport=${arriveAirport}&arriveAirport=${departAirport}&departDate=${returnDate}`)
          console.log(returnResponse)
          if (returnResponse.statusText === "OK") {
            setReturnFlights(returnResponse.data)
          } else {
            setReturnFlights([])
          }
        }
        setLoading(false)
      }
      setTimeout(getFlights, 0)
    }
  }, [departDate])

  console.log(departFlights, returnFlights)

  return (
      <div>
        <h1 style={{ color: 'white', fontWeight: 900 }}>{`Depart ${departAirport} -> ${arriveAirport}`}</h1>
         <Paper className={classes.paper}>  {/* make titles for Depart time, arrive time, num of stops, travel time, select flight */}
  
         <Grid container spacing={2} style={{
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderColor: "rgba(0,0,0,0.1)"
            }}>
            <Grid item xs={2}>
              Flight ID
            </Grid>
            <Grid item xs={2}>
              Depart
            </Grid>
            <Grid item xs={2}>
              Arrive
            </Grid>
            <Grid item xs={2}>
              Stops
            </Grid>
            <Grid item xs={2}>
              Travel Time
            </Grid>
          </Grid>

          {departFlights.map((flight) => {
            const isConnectingFlight = !!flight.length
            let firstFlight = null
            let secondFlight = null
            if (isConnectingFlight) {
              firstFlight = flight[0]
              secondFlight = flight[1]
            } else {
              firstFlight = flight
            }
            
            const departTime = moment(firstFlight.scheduled_departure).format('h:mma')
            const arriveTime = moment(
              isConnectingFlight ? secondFlight.scheduled_arrival : firstFlight.scheduled_arrival
            ).format('h:mma')
            const numStops = (isConnectingFlight ? secondFlight.departure_airport : "Nonstop")
            const travelTime = (
              isConnectingFlight ? 
              moment.utc(moment(firstFlight.scheduled_departure,"YYYY/MM/DD HH:mm:ss").diff(moment(secondFlight.scheduled_arrival,"YYYY/MM/DD HH:mm:ss"))).format("h[h] mm[m]") 
              : moment.utc(moment(firstFlight.scheduled_departure,"YYYY/MM/DD HH:mm:ss").diff(moment(firstFlight.scheduled_arrival,"YYYY/MM/DD HH:mm:ss"))).format("h[h] mm[m]")
            )
            return (
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  {`# ${firstFlight.flight_id}`}
                  {!!secondFlight ? ` / ${secondFlight.flight_id}` : ""}
                </Grid>
                <Grid item xs={2}>
                  {departTime}
                </Grid>
                <Grid item xs={2}>
                  {arriveTime}
                </Grid>
                <Grid item xs={2}>
                  {numStops}
                </Grid>
                <Grid>
                  {travelTime}
                </Grid>
              </Grid>
            )
          })}
        </Paper>
        {tripType === "roundTrip" && (
          <>
            <h1 style={{ color: 'white', fontWeight: 900 }}>{`Arrive ${arriveAirport} -> ${departAirport}`}</h1>

            <Paper className={classes.paper}>
            <Grid container spacing={2} style={{
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderColor: "rgba(0,0,0,0.1)"
            }}>
            <Grid item xs={2}>
              Flight ID
            </Grid>
            <Grid item xs={2}>
              Depart
            </Grid>
            <Grid item xs={2}>
              Arrive
            </Grid>
            <Grid item xs={2}>
              Stops
            </Grid>
            <Grid item xs={2}>
              Travel Time
            </Grid>
          </Grid>

              {returnFlights.map((flight) => {
            const isConnectingFlight = !!flight.length
            let firstFlight = null
            let secondFlight = null
            if (isConnectingFlight) {
              firstFlight = flight[0]
              secondFlight = flight[1]
            } else {
              firstFlight = flight
            }
            
            const departTime = moment(firstFlight.scheduled_departure).format('h:mma')
            const arriveTime = moment(
              isConnectingFlight ? secondFlight.scheduled_arrival : firstFlight.scheduled_arrival
            ).format('h:mma')
            const numStops = (isConnectingFlight ? secondFlight.departure_airport : "Nonstop")
            const travelTime = (
              isConnectingFlight ? 
              moment.utc(moment(firstFlight.scheduled_departure,"YYYY/MM/DD HH:mm:ss").diff(moment(secondFlight.scheduled_arrival,"YYYY/MM/DD HH:mm:ss"))).format("h[h] mm[m]") 
              : moment(firstFlight.scheduled_arrival).format("h[h] mm[m]")
            )
                return (
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      {`# ${firstFlight.flight_id}`}
                      {!!secondFlight ? ` / ${secondFlight.flight_id}` : ""}
                    </Grid>
                    <Grid item xs={2}>
                      {departTime}
                    </Grid>
                    <Grid item xs={2}>
                      {arriveTime}
                    </Grid>
                    <Grid item xs={2}>
                      {numStops}
                    </Grid>
                    <Grid>
                      {travelTime}
                    </Grid>
                  </Grid>
                )
              })}
            </Paper>
          </>
        )}
      </div>
  )
}

export default Flights