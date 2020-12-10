import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FlightIcon from '@material-ui/icons/Flight';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';

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

const Bookings = () => {
  const classes = useStyles();
  const router = useRouter();
	const [bookings, setBookings] = useState([])

  const handleLogOut = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  const navigateToSearch = () => {
    router.push('/')
  }


	useEffect(() => {
		const handleGetBookings = async () => {
			console.log('getting bookings....')
			try {
				const userString = localStorage.getItem("user")
				const user = JSON.parse(userString)
				const email = user.customer_email;
				booking_info = await axios.get(`/api/getBookings?email=${email}`)
				setBookings(booking_info.data)
			} catch (error) {
				console.log(error)
				setBookings([])
			}
		}
	})
	
	const renderBooking = (tickets_purchased, book_id, ticket_cost, scheduled_departure1, scheduled_arrival1, scheduled_departure2, scheduled_arrival2, arrival_airport_id, departure_airport_id, movie, meal) => {
    let predefinedBlock = (
      <Paper className={classes.section}>
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ display: "flex", flex: 1, flexDirection: 'column' }}>
              <div style={{ display: "flex", alignItems: "center", padding: 20, borderTopWidth: 0, borderTopStyle: 'solid', borderColor: '#ccc' }}>
                <div style={{ minHeight: 40, minWidth: 40, borderRadius: "50%", backgroundColor: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FlightIcon style={{ color: "white", transform: "rotate(45deg)" }} />
                </div>
                <h4 style={{ margin: 0, marginLeft: 20 }}>${scheduled_departure1}</h4>
                <h2 style={{ margin: 0, marginLeft: 20 }}>${departure_airport_id}</h2>
                <ChevronRightIcon />
                <h2 style={{ margin: 0 }}>${arrival_airport_id}</h2>
                <h4 style={{ margin: 0, marginLeft: 20 }}>${scheduled_arrival1}</h4>
              </div>
              <div style={{ display: "flex", alignItems: "center", padding: 20, borderTopWidth: 1, borderTopStyle: 'solid', borderColor: '#ccc' }}>
                <div style={{ minHeight: 40, minWidth: 40, borderRadius: "50%", backgroundColor: "#ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FlightIcon style={{ color: "#222", transform: "rotate(-45deg)" }} />
                </div>
                <h4 style={{ margin: 0, marginLeft: 20 }}>${scheduled_departure2}</h4>
                <h2 style={{ margin: 0, marginLeft: 20 }}>${departure_airport_id}</h2>
                <ChevronRightIcon />
                <h2 style={{ margin: 0 }}>${arrival_airport_id}</h2>
                <h4 style={{ margin: 0, marginLeft: 20 }}>${scheduled_arrival2}</h4>
              </div>
          </div>
          <div style={{ maxWidth: 250, minWidth: 250, width: 250, minHeight: '100%', backgroundColor: '#ccc', padding: 20 }}>
            <div style={{ display: "flex", flex: 1 }}>
              <Typography style={{ display: "flex", flex: 1, marginBottom: 10 }}>Price per Passenger</Typography>
            <h4 style={{ margin: 0 }}>`$${ticket_cost}`</h4>
            </div>
            <div style={{ display: "flex", flex: 1, marginBottom: 20 }}>
              <Typography style={{ display: "flex", flex: 1 }}>Passenger(s)</Typography>
              <h4 style={{ margin: 0 }}>`${tickets_purchased}`</h4>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Typography style={{ display: "flex", flex: 1 }}>Subtotal</Typography>
              <h3 style={{ margin: 0 }}>`${tickets_purchased * ticket_cost}`</h3>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Typography style={{ display: "flex", flex: 1, marginBottom: 10 }}>Tax</Typography>
              <h4 style={{ margin: 0 }}>`$${tickets_purchased * ticket_cost * 0.0825}`</h4>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Typography style={{ display: "flex", flex: 1, marginBottom: 10 }}>Total</Typography>
              <h4 style={{ margin: 0 }}>`$${tickets_purchased * ticket_cost * 0.0825 + tickets_purchased * ticket_cost}`</h4>
            </div>
          </div>
        </div>
      </Paper>
    )
	}

  return (
    <>
    <h1 style={{ color: 'white', fontWeight: 900 }}>Bookings</h1>
    <div style={{ display: 'flex' }}>
      <Button
        onClick={navigateToSearch}
        variant="contained"
      >
        Search
      </Button>
      <Button
        onClick={handleLogOut}
        variant="contained"
      >
        Log Out
      </Button>
    </div>
		{renderBooking()}
    </>
  )
}

export default Bookings
