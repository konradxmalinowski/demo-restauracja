import { Helmet } from 'react-helmet-async'
import { MenuTabs } from '../components/menu/MenuTabs'

export default function Menu() {
  return (
    <>
      <Helmet>
        <title>Menu — Restauracja Złoty Talerz</title>
        <meta name="description" content="Karta dań restauracji Złoty Talerz. Przystawki, dania główne, ryby, desery, wina i napoje." />
      </Helmet>
      <div className="min-h-screen bg-[var(--color-parchment)] dark:bg-restauracja-dark pt-20">
        <MenuTabs />
      </div>
    </>
  )
}
