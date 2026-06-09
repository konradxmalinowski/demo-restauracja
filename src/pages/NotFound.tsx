import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Strona nie istnieje</title>
      </Helmet>
      <div className="min-h-screen bg-restauracja-parchment dark:bg-restauracja-dark flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-8xl font-bold text-restauracja-burgundy mb-4">404</p>
          <h1 className="text-2xl font-semibold text-restauracja-dark dark:text-restauracja-parchment mb-4">
            Strona nie istnieje
          </h1>
          <p className="text-gray-600 dark:text-restauracja-cream mb-8">
            Szukana strona nie została znaleziona.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-restauracja-burgundy text-white rounded-lg font-medium hover:bg-restauracja-wine transition-colors"
          >
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    </>
  )
}
