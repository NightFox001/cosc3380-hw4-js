import axios from 'axios';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: "rgba(255,255,255,0.9)"
  },
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
    const getFlights = async () => {
      // always do this
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
  }, [])

  console.log(departFlights, returnFlights)

  return (
      <div>
        <h1 style={{ color: 'white', fontWeight: 900 }}>Depart</h1>
        <Paper className={classes.paper}>
          {departFlights.map((flight) => (
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {JSON.stringify(flight)}
              </Grid>
            </Grid>
          ))}
        </Paper>
        {tripType === "roundTrip" && (
          <>
            <h1 style={{ color: 'white', fontWeight: 900 }}>Return</h1>
            <Paper className={classes.paper}>
              {returnFlights.map((flight) => (
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    {JSON.stringify(flight)}
                  </Grid>
                </Grid>
              ))}
            </Paper>
          </>
        )}
      </div>
  )
}

export default Flights