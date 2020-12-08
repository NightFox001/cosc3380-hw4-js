import { useState } from "react"
import { useRouter } from "next/router"

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onEmailChange = ({}) => {

    }

    const onPasswordChange = ({}) => {

    }

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

            <p>
                <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </p>
            <p>
                <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </p>
            <p>
                <button onClick={handleLogin}>Log In</button>
            </p>
            <p></p>
            <p>
                <button onClick={goToRegister}>Create New Account</button> 
            </p>

        </div>
    )
}

export default Login