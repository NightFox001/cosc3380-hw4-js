import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
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
  const router = useRouter()
  const [selectedDepartAirport, setSelectedDepartAirport] = useState("HOU")
  const [selectedArriveAirport, setSelectedArriveAirport] = useState()
  const [selectedDepartDate, setSelectedDepartDate] = useState(new Date())
  const [selectedReturnDate, setSelectedArriveDate] = useState(moment().add(1, "day").toDate())
  const [airports, setAirports] = useState([])
  const [loadingAirports, setLoadingAirports] = useState(true)
  const [tripType, setTripType] = useState("roundTrip")
  const [selectedPassengers, setSelectedPassengers] = useState("1")

  useEffect(() => {
      if (airports.length) {
          const nonDepartAirports = airports.filter(city => (city.airport_code !== selectedDepartAirport))
          const arriveCity = nonDepartAirports[Math.floor(Math.random() * nonDepartAirports.length)]
          setSelectedArriveAirport(arriveCity.airport_code)
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
    const departDateFormatted = moment(selectedDepartDate).format('YYYY-MM-DD')
    const returnDateFormatted = moment(selectedReturnDate).format('YYYY-MM-DD')
    console.log(departDateFormatted, returnDateFormatted)
    router.push(`/flights?departAirport=${selectedDepartAirport}&arriveAirport=${selectedArriveAirport}&departDate=${departDateFormatted}&returnDate=${returnDateFormatted}&tripType=${tripType}`)
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <h1 style={{ color: 'white', fontWeight: 900 }}>Flights</h1>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RadioGroup value={tripType} onChange={({ nativeEvent }) => setTripType(nativeEvent.target.value)}>
              <FormControlLabel value="roundTrip" control={<Radio />} label="Round Trip" />
              <FormControlLabel value="oneWay" control={<Radio />} label="One-way" />
            </RadioGroup>
          </Grid>
          <FlightSchedulerItem> {/* [0,0] */}
            <DropDownInput
              title="Depart"
              options={airports.map(({ city, airport_code }) => ({ label: city, value: airport_code}))}
              selected={selectedDepartAirport}
              defaultOption={{ label: "", value: "0" }}
              onChange={setSelectedDepartAirport}
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
              value={selectedDepartDate}
              onChange={setSelectedDepartDate}
            />
          </FlightSchedulerItem>         
          <FlightSchedulerItem> {/* [0,2] */}
            <DropDownInput
                title="Passengers"
                options={["1","2","3","4","5"].map(number => ({ value: number, label: number }))}
                selected={selectedPassengers}
                defaultOption={{ label: "", value: "0" }}
                onChange={setSelectedPassengers}
              />
          </FlightSchedulerItem>         
          <FlightSchedulerItem> {/* [1,0] */}
            <DropDownInput
              title="Destination"
              options={airports.map(({ city, airport_code }) => ({ label: city, value: airport_code}))}
              selected={selectedArriveAirport}
              defaultOption={{ label: "", value: "0" }}
              onChange={setSelectedArriveAirport}
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
              value={selectedReturnDate}
              onChange={setSelectedArriveDate}
              disabled={tripType === "oneWay"}
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