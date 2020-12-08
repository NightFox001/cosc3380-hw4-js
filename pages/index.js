import { FlightScheduler } from '../components/FlightScheduler';
import { useAuth } from '../hooks/authentication';

export default function Home() {
  const user = useAuth()

  console.log(user)

  if (!user) {
    return null
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <FlightScheduler />
    </div>
  )
}
