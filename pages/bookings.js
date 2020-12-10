import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FlightIcon from '@material-ui/icons/Flight';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from "next/router";

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

  const handleLogOut = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  const navigateToSearch = () => {
    router.push('/')
  }

    const handleGetBookings = async () => {
    try {
      console.log('getting bookings....')
      const userString = localStorage.getItem("user")
      const user = JSON.parse(userString)
      const response = await axios.get(`/api/getBookings`, {
        user
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const renderBooking = () => {
    return (
      <Paper className={classes.section}>
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ display: "flex", flex: 1, flexDirection: 'column' }}>
              <div style={{ display: "flex", alignItems: "center", padding: 20, borderTopWidth: 0, borderTopStyle: 'solid', borderColor: '#ccc' }}>
                <div style={{ minHeight: 40, minWidth: 40, borderRadius: "50%", backgroundColor: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FlightIcon style={{ color: "white", transform: "rotate(45deg)" }} />
                </div>
                <h4 style={{ margin: 0, marginLeft: 20 }}>Dec 19th</h4>
                <h2 style={{ margin: 0, marginLeft: 20 }}>MIA</h2>
                <ChevronRightIcon />
                <h2 style={{ margin: 0 }}>HOU</h2>
                <h4 style={{ margin: 0, marginLeft: 20 }}>2 hr 20 min</h4>
              </div>
              <div style={{ display: "flex", alignItems: "center", padding: 20, borderTopWidth: 1, borderTopStyle: 'solid', borderColor: '#ccc' }}>
                <div style={{ minHeight: 40, minWidth: 40, borderRadius: "50%", backgroundColor: "#ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FlightIcon style={{ color: "#222", transform: "rotate(-45deg)" }} />
                </div>
                <h4 style={{ margin: 0, marginLeft: 20 }}>Dec 31st</h4>
                <h2 style={{ margin: 0, marginLeft: 20 }}>HOU</h2>
                <ChevronRightIcon />
                <h2 style={{ margin: 0 }}>MIA</h2>
                <h4 style={{ margin: 0, marginLeft: 20 }}>2 hr 20 m</h4>
              </div>
          </div>
          <div style={{ maxWidth: 250, minWidth: 250, width: 250, minHeight: '100%', backgroundColor: '#ccc', padding: 20 }}>
            <div style={{ display: "flex", flex: 1 }}>
              <Typography style={{ display: "flex", flex: 1, marginBottom: 10 }}>Price per Passenger</Typography>
            <h4 style={{ margin: 0 }}>{`$${123}`}</h4>
            </div>
            <div style={{ display: "flex", flex: 1, marginBottom: 20 }}>
              <Typography style={{ display: "flex", flex: 1 }}>Taxes and fees per Passenger</Typography>
              <h4 style={{ margin: 0 }}>{`$${123}`}</h4>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Typography style={{ display: "flex", flex: 1, marginBottom: 10 }}>Total per Passenger</Typography>
              <h4 style={{ margin: 0 }}>{`$${123}`}</h4>
            </div>
            <div style={{ display: "flex", flex: 1, marginBottom: 20 }}>
              <Typography style={{ display: "flex", flex: 1 }}>Passenger(s)</Typography>
              <h4 style={{ margin: 0 }}>x{123}</h4>
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <Typography style={{ display: "flex", flex: 1 }}>Flight total</Typography>
              <h3 style={{ margin: 0 }}>{`$${123}`}</h3>
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
      <Button color="primary" onClick={handleGetBookings} variant="contained">Get Bookings</Button>

    </div>
      {renderBooking()}
      {renderBooking()}
      {renderBooking()}
      {renderBooking()}
    </>
  )
}

export default Bookings