import { useState } from "react"
import { useRouter } from "next/router"
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: "rgba(255,255,255,0.9)"
  },
}));

const Login = () => {
    const classes = useStyles()
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const goToRegister = () => {
        router.push("/register")
    }

    const handleLogin = async () => {
        const hasEmail = !!email && email.trim().length > 0
        const hasPassword = !!password && password.trim().length > 0
        if (!hasEmail) {
            return setError("Email is required.")
        }
        if (!hasPassword) {
            return setError("Password is required.")
        }
    }

    return (
        <div>
            <h1 style={{ color: 'white', fontWeight: 900 }}>Log In</h1>
            <Paper className={classes.paper}>
                <TextField
                    label="Email"
                    type="email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setPassword(e.target.value)}
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
                <Button color="primary" onClick={handleLogin} variant="contained">Log In</Button>
                <br /><br />
                <Button onClick={goToRegister}>Create New Account</Button>
            </Paper>
        </div>
    )
}

export default Login