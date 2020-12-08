import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onEmailChange = ({}) => {

    }

    const onPasswordChange = ({}) => {

    }

    return (
        <div>
            <input type="email" onChange={onEmailChange} value={email} />
            <input type="password" onChange={onPasswordChange} value={password} />
            <button onClick={}>Log In</button>
        </div>
    )
}

export default Login