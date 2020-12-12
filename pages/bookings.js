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
import moment, { tz } from "moment"


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
	const [bookings, setBookings] = useState({})

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
			// console.log('getting bookings....')
			console.log('getting bookings for', email)

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

	const dropBookings = async (book_id) => {
		try {
			await axios.get(`/api/dropBooking?book_id=${book_id}`);
			
		} catch (error) {
			console.log(error)
		}
		window.location.reload()
	}
	
	const renderBooking = (book_id) => {
		const tickets = bookings[book_id].sort( (ticketA, ticketB) => ticketA.ticket_id - ticketB.ticket_id)
		let predefinedBlock = (
		// map over booking ids
		<div>
			<h2>{`Booking #${book_id}`}</h2>
			{/* {bookings.map((booking, index) => { */}
				<div>
					<Paper className={classes.section}>
					<Button onClick={() => dropBookings(`${book_id}`)} variant="contained">Drop Booking</Button>
					{tickets.map((ticket) => (
					<Paper className={classes.section}>
						<div style={{ display: "flex", flex: 1, flexDirection: 'column' }}>
							<div style={{ display: "flex", alignItems: "center", padding: 20, borderTopWidth: 0, borderTopStyle: 'solid', borderColor: '#ccc' }}>
								<div style={{ minHeight: 40, minWidth: 40, borderRadius: "50%", backgroundColor: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
								<FlightIcon style={{ color: "white", transform: "rotate(45deg)" }} />
								</div>
								<h4 style={{ margin: 0, marginLeft: 20 }}>ticket #{ticket.ticket_id}</h4>
								<h2 style={{ margin: 0, marginLeft: 20 }}>{ticket.departure_airport}</h2>
								<ChevronRightIcon />
								<h2 style={{ margin: 0 }}>{ticket.arrival_airport}</h2>
								<h4 style={{ margin: 0, marginLeft: 20 }}></h4>	

								<h3 style={{ margin: 5, marginLeft: 20 }}>{moment(ticket.scheduled_departure).format('DD/MM/YYYY h:mma')}</h3>
								<h4 style={{ margin: 0 }}></h4>

							</div>
						</div>
					</Paper>
					))}
					</Paper>
				</div>
		</div>

		)
		return predefinedBlock
	}
	console.log(bookings)
	console.log('got bookings in func')
	let book_ids = Object.keys(bookings)
	console.log(book_ids)

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
		{book_ids.map(renderBooking)}
    </>
  )
}

export default Bookings
