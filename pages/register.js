import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Alert from "@material-ui/lab/Alert";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DropDownInput } from "../components/DropDownInput";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: "rgba(255,255,255,0.9)"
  },
}));

const Register = () => {
    const classes = useStyles()
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [city, setCity] = useState("")
    const [cities, setCities] = useState([])
    const [error, setError] = useState("")
    const [loadingCities, setLoadingCities] = useState(true)
    const [loadingRegister, setLoadingRegister] = useState(false)

    useEffect(() => {
        const getCities = async () => {
            try {
                const response = await axios.get(`/api/cities`)
                setLoadingCities(false)
                if (response.statusText === "OK") {
                    setCities(response.data)
                } else {
                    throw "Could not get cities."
                }
            } catch (error) {
                setCities([])
                setError("Could not get cities from database.")
            }
        }
        setTimeout(getCities, 0)
    }, [])

    const handleRegister = async () => {
        const hasName = !!name && name.trim().length > 0
        const hasEmail = !!email && email.trim().length > 0
        const hasPassword = !!password && password.trim().length > 0
        const hasCity = !!city && city.trim().length > 0
        if (!hasName) {
            return setError("Name is required.")
        }
        if (!hasEmail) {
            return setError("Email is required.")
        }
        if (!hasPassword) {
            return setError("Password is required.")
        }
        if (!hasCity) {
            return setError("City is required.")
        }
        setLoadingRegister(true)
        try {
            const response = await axios.get(`/api/register?email=${email}&password=${password}&name=${name}&city=${city}`)
            localStorage.setItem("user", JSON.stringify(response.data))
            router.push("/") 
        } catch (error) {
            return setError(error.response?.data?.message || "There was an issue creating your account.")
        }
        setLoadingRegister(false)
    }

    return (
        <div>
            <h1 style={{ color: 'white', fontWeight: 900 }}>Create Account</h1>
            <Paper className={classes.paper}>
                {!!error && <Alert severity="error">{error}</Alert>}
                <TextField
                    label="Full Name"
                    type="name"
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br /><br />
                <TextField
                    label="Email"
                    type="email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br /><br />
                <TextField
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />
                <div style={{ width: 172, margin: 'auto' }}>
                    <DropDownInput
                        title="City"
                        options={cities.map(({ city: cityName }) => ({ label: cityName, value: cityName }))}
                        selected={city}
                        onChange={setCity}
                    />
                </div>
                <br /><br />
                <Button color="primary" onClick={handleRegister} variant="contained">Register</Button>
            </Paper>
        </div>
    )
}

export default Register