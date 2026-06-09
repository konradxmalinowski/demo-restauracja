import { GITHUB_URL, PORTFOLIO_URL } from '../../constants/links'

const FOOTER_TEXT = 'Projekt demonstracyjny wykonany przez Konrada Malinowskiego'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-burgundy)] text-[var(--color-parchment)] py-6 px-4 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center sm:text-left">
          {FOOTER_TEXT} &copy; {year}
        </p>
        <nav className="flex gap-4 text-sm" aria-label="Footer navigation">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-gold)] transition-colors underline"
          >
            GitHub
          </a>
          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-gold)] transition-colors underline"
          >
            Portfolio
          </a>
        </nav>
      </div>
    </footer>
  )
}
