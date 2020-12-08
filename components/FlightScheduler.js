import axios from 'axios'
import { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import { FlightSchedulerItem } from './FlightSchedulerItem';
import { DropDownInput } from './DropDownInput';

export const FlightScheduler = () => {
    const [selectedDeparture, setSelectedDeparture] = useState("HOU")
    const [selectedArrival, setSelectedArrival] = useState()
    const [selectedFlight, setSelectedFlight] = useState()
    const [flights, setFlights] = useState([])
    const [airports, setAirports] = useState([])
    const [loadingAirports, setLoadingAirports] = useState(true)
    const [loadingFlights, setLoadingFlight] = useState(false)

    useEffect(() => {
        if (airports.length) {
            const nonDepartureAirports = airports.filter(city => (city.airport_code !== selectedDeparture))
            const arrivalCity = nonDepartureAirports[Math.floor(Math.random() * nonDepartureAirports.length)]
            setSelectedArrival(arrivalCity.airport_code)
        }
    }, [airports])

    useEffect(() => {
      const getAirports = async () => {
        const response = await axios.get(`/api/airports`)
        setLoadingAirports(false)
        if (response.status === 200) {
          setAirports(response.data)
        } else {
          setAirports([])
        }
      }
      setTimeout(getAirports, 0)
    }, [])
  
    const getFlights = async () => {
        setLoadingFlight(true)
        const response = await axios.get(`/api/flights?limit=50`)
        setLoadingFlight(false)
        if (response.status === 200) {
          setFlights(response.data)
        } else {
          setFlights([])
        }
      }

      console.log(selectedDeparture, selectedArrival)

    return (
        <Grid container spacing={2}>
            {/* <FlightSchedulerItem>
                <DropDownInput options={flights} selected={selectedFlight} onChange={setSelectedFlight} />
            </FlightSchedulerItem> */}
            <FlightSchedulerItem>
                <DropDownInput
                    title="Departure"
                    options={airports.map(({ city, airport_code }) => ({ label: city, value: airport_code}))}
                    selected={selectedDeparture}
                    defaultOption={{ label: "", value: "0" }}
                    onChange={setSelectedDeparture}
                />
            </FlightSchedulerItem>
            <FlightSchedulerItem>
                <DropDownInput
                    title="Arrival"
                    options={airports.map(({ city, airport_code }) => ({ label: city, value: airport_code}))}
                    selected={selectedArrival}
                    defaultOption={{ label: "", value: "0" }}
                    onChange={setSelectedArrival}
                />
            </FlightSchedulerItem>
        </Grid>
    )
}