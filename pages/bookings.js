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


	usrEffect(() => {
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
      <Button color="primary" onClick={handleGetBookings} variant="contained">Get Bookings</Button>

    </div>
		<div>
		 <Paper className={classes.flightsSection}>
			 <Grid container spacing={2} style={{
					paddingTop: 10,
					paddingBottom: 10,
					borderBottomWidth: 1,
					borderColor: "rgba(0,0,0,0.1)"
					}}>
					<Grid item xs={2}>
						Flight ID(s)
					</Grid>
					<Grid item xs={2}>
						arrival airport
					</Grid>
					<Grid item xs={2}>
						departure airport
					</Grid>
					<Grid item xs={2}>
						scheduled departure
					</Grid>
					<Grid item xs={2}>
						ticket cost
					</Grid>
					<Grid item xs={2}>
						total
					</Grid>
				</Grid>
				{bookings.map((booking) => {
				 <Grid container spacing={2} style={{
						paddingTop: 10,
						paddingBottom: 10,
						borderBottomWidth: 1,
						borderColor: "rgba(0,0,0,0.1)"
						}}>
						<Grid item xs={2}>
						{booking[0]}
						</Grid>
						<Grid item xs={2}>
						{arrival_airport}
						</Grid>
						<Grid item xs={2}>
						{departure_airport}
						</Grid>
						<Grid item xs={2}>
						{scheduled_departure}
						</Grid>
						<Grid item xs={2}>
						{ticket_cost}
						</Grid>
						<Grid item xs={2}>
						{total}
						</Grid>
					</Grid>
				})
				}
			</Paper>
		</div>
		{

		}
    </>
  )
}

export default Bookings
