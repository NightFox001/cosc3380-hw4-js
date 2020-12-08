import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { FlightSchedulerItem } from './FlightSchedulerItem';
import { DropDownInput } from './DropDownInput';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: "rgba(255,255,255,0.9)"
  },
}));

export const FlightScheduler = () => {
  const classes = useStyles()
  const [selectedDepartureAirport, setSelectedDepartureAirport] = useState("HOU")
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState()
  const [airports, setAirports] = useState([])
  const [loadingAirports, setLoadingAirports] = useState(true)
  const [tripType, setTripType] = useState("round-trip")
  const [selectedPassengers, setselectedPassengers] = useState("1")

  useEffect(() => {
      if (airports.length) {
          const nonDepartureAirports = airports.filter(city => (city.airport_code !== selectedDepartureAirport))
          const arrivalCity = nonDepartureAirports[Math.floor(Math.random() * nonDepartureAirports.length)]
          setSelectedArrivalAirport(arrivalCity.airport_code)
      }
  }, [airports])

  useEffect(() => {
    const getAirports = async () => {
      const response = await axios.get(`/api/airports`)
      setLoadingAirports(false)
      if (response.statusText === "OK") {
        setAirports(response.data)
      } else {
        setAirports([])
      }
    }
    setTimeout(getAirports, 0)
  }, [])

  const searchFlights = async () => {
    router.push(`/flights?departure_date=${selectedDepartureAirport}&arrival_date=${selectedArrivalAirport}&selected_fl`)

    // setLoadingFlight(true)

    // const flightsLeaveing = await axios.get(`/api/flight`)
    // const flightsReturning =...

    // setLoadingFlight(false)

    // if (response.statusText === "OK") {
    //   setFlights(response.data)
    // } else {
    //   setFlights([])
    // }

  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <h1 style={{ color: 'white', fontWeight: 900 }}>Flights</h1>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RadioGroup value={tripType} onChange={({ nativeEvent }) => setTripType(nativeEvent.target.value)}>
              <FormControlLabel value="round-trip" control={<Radio />} label="Round Trip" />
              <FormControlLabel value="one-way" control={<Radio />} label="One-way" />
            </RadioGroup>
          </Grid>
          <FlightSchedulerItem> {/* [0,0] */}
            <DropDownInput
              title="Departure"
              options={airports.map(({ city, airport_code }) => ({ label: city, value: airport_code}))}
              selected={selectedDepartureAirport}
              defaultOption={{ label: "", value: "0" }}
              onChange={setSelectedDepartureAirport}
            />
          </FlightSchedulerItem>
          <FlightSchedulerItem> {/* [0,1] */}
            <KeyboardDatePicker
              minDate={new Date()}
              maxDate={moment().add(2, "month").add(-1, "days").toDate()}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputVariant="outlined"
              id="date-picker-dialog"
              label="Depart Date"
              format="MM/DD/yyyy"
              clearable
              value={new Date()}
              onChange={() => {}}
            />
          </FlightSchedulerItem>         
          <FlightSchedulerItem> {/* [0,2] */}
            <DropDownInput
                title="Passengers"
                options={["1","2","3","4","5"].map(number => ({ value: number, label: number }))}
                selected={selectedPassengers}
                defaultOption={{ label: "", value: "0" }}
                onChange={setSelectedDepartureAirport}
              />
          </FlightSchedulerItem>         
          <FlightSchedulerItem> {/* [1,0] */}
            <DropDownInput
              title="Destination"
              options={airports.map(({ city, airport_code }) => ({ label: city, value: airport_code}))}
              selected={selectedArrivalAirport}
              defaultOption={{ label: "", value: "0" }}
              onChange={setSelectedArrivalAirport}
            />
          </FlightSchedulerItem>
          <FlightSchedulerItem> {/* [1,1] */}
            <KeyboardDatePicker
              minDate={moment().add(1, "day").toDate()}
              maxDate={moment().add(2, "month").toDate()}
              fullWidth
              InputLabelProps={{ shrink: true }}
              inputVariant="outlined"
              id="date-picker-dialog"
              label="Return Date"
              format="MM/DD/yyyy"
              clearable
              value={moment().add(1, "days").toDate()}
              onChange={() => {}}
            />
          </FlightSchedulerItem>
          <Grid item xs={12}>
            <Button color="primary" onClick={searchFlights} variant="contained">Search</Button>
          </Grid>
        </Grid>
        </Paper>
      </MuiPickersUtilsProvider>
  )
}