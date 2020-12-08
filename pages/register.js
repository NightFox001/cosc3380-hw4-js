import axios from "axios"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Alert from "@material-ui/lab/Alert";

const Login = () => {
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
        const response = await axios.get(`/api/cities`)
        setLoadingCities(false)
        if (response.status === 200) {
          setCities(response.data)
        } else {
          setCities([])
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
            {!!error && <Alert severity="error">{error}</Alert>}
            <p>
                <input placeholder="Full Name" type="name" onChange={(e) => setName(e.target.value)} value={name} />
            </p>
            <p>
                <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </p>
            <p>
                <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </p>
            <p>
                <select onChange={(e) => setCity(e.target.value)}>
                    {loadingCities && (
                        <option>Loading</option>
                    )}
                    <option key="0" value="0">City</option>
                    {cities.map(({ city }) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </p>
            <button onClick={handleRegister}>Create Account</button>
        </div>
    )
}

export default Login