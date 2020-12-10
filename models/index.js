import Sequelize from 'sequelize'
/*
const creds = {
  database: "COSC3380",
  username: "cosc0146",
  password: "",
  host: "code.cs.uh.edu",
  dialect: "postgres"
}
const creds = {
  database: "COSC3380",
  username: "cosc0210",
  password: "",
  host: "76.226.74.200",
  dialect: "postgres"
}
*/
const creds = {
  database: "COSC3380",
  username: "cosc0146",
  password: "",
  host: "code.cs.uh.edu",
  dialect: "postgres"
}
const { database, username, password, ...config } = creds;

const connection = new Sequelize(database, username, password, config);

module.exports = { connection, Sequelize }

/*
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
 */
