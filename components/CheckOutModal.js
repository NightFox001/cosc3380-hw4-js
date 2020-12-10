import axios from 'axios';
import moment from 'moment';
import { useState, useEffect, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FlightIcon from '@material-ui/icons/Flight';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 'calc(100% - 40px)',
    maxWidth: 700,
    maxHeight: '80vh',
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  section: {
    color: theme.palette.text.secondary,
    backgroundColor: '#eaeaea',
    marginBottom: 20,
    overflow: 'hidden'
  }
}));

export const CheckOutModal = ({ showModal, handleClose, numberOfPassengers, departFlights, returnFlights, selectedDepartFlightIds, selectedReturnFlightIds }) => {
  const classes = useStyles();
  const [passengers, setPassengers] = useState([])

  useEffect(() => {
    if (!!numberOfPassengers) {
      const emptyPassengers = Array.from(Array(numberOfPassengers).keys())
      const newPassengers = emptyPassengers.map(() => ({ id: uuidv4(), name: "", email: "", phone: "" }))
      setPassengers(newPassengers)
    }
  }, [numberOfPassengers])
  
  if (!numberOfPassengers) {
    return null
  }

  const selectedDepartFlights = selectedDepartFlightIds.map((flightId) => departFlights.flat().find(({ flight_id }) => flight_id === flightId))
  const selectedReturnFlights = selectedReturnFlightIds.map((flightId) => returnFlights.flat().find(({ flight_id }) => flight_id === flightId))

  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const firstFlights = []
  if (selectedDepartFlights[0]) {
    firstFlights.push(selectedDepartFlights[0])
  }
  if (selectedReturnFlights[0]) {
    firstFlights.push(selectedReturnFlights[0])
  }
  const pricePerPass = (firstFlights.reduce((cost = 0, flight) => (cost + flight.flight_cost), 0)).toFixed(2)
  const taxesPerPass = (Number(pricePerPass) * 0.0825).toFixed(2)
  const totalPerPass = (Number(pricePerPass) + Number(taxesPerPass)).toFixed(2)
  const totalCost = (Number(totalPerPass) * numberOfPassengers).toFixed(2)

  const getTravelTime = (flight) => {
    return moment.utc(moment(flight.scheduled_arrival,"YYYY/MM/DD HH:mm:ss").diff(moment(flight.scheduled_departure,"YYYY/MM/DD HH:mm:ss"))).format("h[h] mm[m]")
  }

  const updatePassengerData = (id, key, value) => {
    setPassengers((passengers) => {
      const index = passengers.findIndex(passenger => passenger.id === id)
      passengers[index][key] = value
      return JSON.parse(JSON.stringify(passengers))
    })
  }
  

  // Purchase button clicked
  const handlePurchase = async () => {
    try {
      const userString = localStorage.getItem("user")
      const user = JSON.parse(userString)
      const response = await axios.post(`/api/createBooking`, {
        // send these to createBooking.js
        user,
        passengers,
        totalCost,
        taxesPerPass,
        numberOfPassengers,
        selectedDepartFlights,
        selectedReturnFlights,
        flights : [ ...selectedDepartFlights, ...selectedReturnFlights ]
      })
    } catch (error) {
      console.log(error)
    }
  }

  const body = (
    <div className={classes.modal} style={getModalStyle()}>
      <h2>Passenger & Payment Info</h2>
      <Paper className={classes.section}>
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ display: "flex", flex: 1, flexDirection: 'column' }}>
            {selectedDepartFlights.map((flight, index) => (
              <div style={{ display: "flex", alignItems: "center", padding: 20, borderTopWidth: index === 0 ? 0 : 1, borderTopStyle: 'solid', borderColor: '#ccc' }}>
                <div style={{ minHeight: 40, minWidth: 40, borderRadius: "50%", backgroundColor: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FlightIcon style={{ color: "white", transform: "rotate(45deg)" }} />
                </div>
                <h4 style={{ margin: 0, marginLeft: 20 }}>{moment(flight.scheduled_departure).format('MMM Do')}</h4>
                <h2 style={{ margin: 0, marginLeft: 20 }}>{flight.departure_airport}</h2>
                <ChevronRightIcon />
                <h2 style={{ margin: 0 }}>{flight.arrival_airport}</h2>
                <h4 style={{ margin: 0, marginLeft: 20 }}>{getTravelTime(flight)}</h4>
              </div>
            ))}
            {selectedReturnFlights.map((flight) => (
              <div style={{ display: "flex", alignItems: "center", padding: 20, borderTopWidth: 1, borderTopStyle: 'solid', borderColor: '#ccc' }}>
                <div style={{ minHeight: 40, minWidth: 40, borderRadius: "50%", backgroundColor: "#ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FlightIcon style={{ color: "#222", transform: "rotate(-45deg)" }} />
                </div>
                <h4 style={{ margin: 0, marginLeft: 20 }}>{moment(flight.scheduled_departure).format('MMM Do')}</h4>
                <h2 style={{ margin: 0, marginLeft: 20 }}>{flight.departure_airport}</h2>
                <ChevronRightIcon />
                <h2 style={{ margin: 0 }}>{flight.arrival_airport}</h2>
                <h4 style={{ margin: 0, marginLeft: 20 }}>{getTravelTime(flight)}</h4>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 250, minWidth: 250, width: 250, minHeight: '100%', backgroundColor: '#ccc', padding: 20 }}>
            <div style={{ display: "flex", flex: 1 }}>
              <Typography style={{ display: "flex", flex: 1, marginBottom: 10 }}>Price per Passenger</Typography>
            <h4 style={{ margin: 0 }}>{`$${pricePerPass}`}</h4>
            </div>
            <div style={{ display: "flex", flex: 1, marginBottom: 20 }}>
              <Typography style={{ display: "flex", flex: 1 }}>Taxes and fees per Passenger</Typography>
              <h4 style={{ margin: 0 }}>{`$${taxesPerPass}`}</h4>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Typography style={{ display: "flex", flex: 1, marginBottom: 10 }}>Total per Passenger</Typography>
              <h4 style={{ margin: 0 }}>{`$${totalPerPass}`}</h4>
            </div>
            <div style={{ display: "flex", flex: 1, marginBottom: 20 }}>
              <Typography style={{ display: "flex", flex: 1 }}>Passenger(s)</Typography>
              <h4 style={{ margin: 0 }}>x{numberOfPassengers}</h4>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Typography style={{ display: "flex", flex: 1 }}>Flight total</Typography>
              <h3 style={{ margin: 0 }}>{`$${totalCost}`}</h3>
            </div>
          </div>
        </div>
      </Paper>
      {passengers.map((passenger, index) => (
        <Fragment key={passenger.id}>
          <Typography className={classes.heading}>{`Passenger ${index + 1}`}</Typography>
          <div name={passenger.id}>
            <TextField
              name={`${passenger.id}-fullname`}
              label="Full Name"
              type="name"
              margin="normal"
              value={passenger.name}
              onChange={(e) => updatePassengerData(passenger.id, 'name', e.target.value)}
              required
            />
            <br /><br />
            <TextField
              name={`${passenger.id}-email`}
              label="Email"
              type="email"
              margin="normal"
              value={passenger.email}
              onChange={(e) => updatePassengerData(passenger.id, 'email', e.target.value)}
            />
            <br /><br />
            <TextField
              name={`${passenger.id}-email`}
              label="Phone"
              type="phone"
              margin="normal"
              value={passenger.phone}
              onChange={(e) => updatePassengerData(passenger.id, 'phone', e.target.value)}
            />
          </div>
        </Fragment>
      ))}
      <Button color="primary" onClick={handlePurchase} variant="contained">Log In</Button>
    </div>
  );

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
    >
      {body}
    </Modal>
  )
}