import { Helmet } from 'react-helmet-async'
import { ReservationForm } from '../components/reservations/ReservationForm'

export default function Reservations() {
  return (
    <>
      <Helmet>
        <title>Rezerwacje — Restauracja Złoty Talerz</title>
        <meta name="description" content="Zarezerwuj stolik w restauracji Złoty Talerz. Formularz rezerwacji online." />
      </Helmet>
      <div className="min-h-screen bg-[var(--color-parchment)] dark:bg-restauracja-dark pt-20">
        <ReservationForm />
      </div>
    </>
  )
}
