import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function DemoResult() {
  return (
    <>
      <Helmet>
        <title>Wersja Demonstracyjna — Restauracja Złoty Talerz</title>
      </Helmet>
      <div className="min-h-screen bg-restauracja-parchment dark:bg-restauracja-dark flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white dark:bg-restauracja-dark border border-restauracja-burgundy/20 rounded-2xl shadow-xl p-10">
          <div className="w-16 h-16 rounded-full bg-restauracja-burgundy/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-restauracja-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-restauracja-dark dark:text-restauracja-parchment mb-4 font-serif">
            Wersja Demonstracyjna
          </h1>
          <p className="text-gray-600 dark:text-restauracja-cream leading-relaxed mb-8">
            To jest wersja demonstracyjna przygotowana w celu prezentacji możliwości wykonania strony internetowej dla klienta.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-restauracja-burgundy text-white rounded-lg font-medium hover:bg-restauracja-wine transition-colors"
          >
            Powrót na stronę główną
          </Link>
        </div>
      </div>
    </>
  )
}
