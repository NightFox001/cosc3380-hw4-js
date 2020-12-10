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
		const userString = localStorage.getItem("user")
		if (!userString) {
			return router.push("/login")
		  }
		const user = JSON.parse(userString)
		const email = user.customer_email;
		const handleGetBookings = async () => {
			console.log('getting bookings....')
			try {
				let booking_info = await axios.get(`/api/getBookings?email=${email}`)
				setBookings(booking_info.data)
				console.log("got bookings")
				console.log(booking_info)

			} catch (error) {
				console.log(error)
				setBookings([])
			}
		}
		setTimeout(handleGetBookings, 0)
	},[])
	
	const renderBooking = () => {
		console.log(bookings)
		console.log('got bookings in func')
		let book_ids = Array.from(bookings.keys() );
		console.log(book_ids)
		// {bookings.map((booking) => {
		// 	<h2>{booking}</h2>
		// })}

		let predefinedBlock = (
		// map over booking ids
		<div>
			<h2>Your Bookings</h2>
			{/* {bookings.map((booking, index) => { */}
				<div>
					<h2>Booking</h2>
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
				</div>
			{/* })} */}
		</div>

		)
		return predefinedBlock
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
		{/* {handleGetBookings()} */}
		{renderBooking()}
		{renderBooking()}
    </>
  )
}

export default Bookings
