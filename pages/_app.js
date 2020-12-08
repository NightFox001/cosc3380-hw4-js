import { useEffect } from "react"
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const user = localStorage.getItem("user")
    console.log(JSON.parse(user))
  })
  return (
    <>
      <h1>Flights</h1>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
