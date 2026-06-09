import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useDemoModal } from '../hooks/useDemoModal'
import { useScrollReveal } from '../hooks/useScrollReveal'

const contactSchema = z.object({
  imie: z.string().min(2, 'Imię musi mieć min. 2 znaki'),
  email: z.string().email('Podaj poprawny adres email'),
  temat: z.string().min(3, 'Temat musi mieć min. 3 znaki'),
  wiadomosc: z.string().min(10, 'Wiadomość musi mieć min. 10 znaków'),
})

type ContactFormData = z.infer<typeof contactSchema>

const CONTACT_INFO = [
  {
    Icon: MapPin,
    label: 'Adres',
    value: 'Plac Teatralny 1, 00-077 Warszawa',
  },
  {
    Icon: Phone,
    label: 'Telefon',
    value: '+48 22 123 45 67',
  },
  {
    Icon: Mail,
    label: 'Email',
    value: 'rezerwacje@zlotypalerz.pl',
  },
  {
    Icon: Clock,
    label: 'Godziny otwarcia',
    value: 'Wt–Czw: 12:00–22:00\nPt–Sob: 12:00–23:00\nNiedz: 12:00–21:00\nPon: nieczynne',
  },
]

export default function Contact() {
  const navigate = useNavigate()
  const { triggerDemo } = useDemoModal()
  const formRef = useScrollReveal<HTMLDivElement>()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  })

  const onSubmit = (_data: ContactFormData) => {
    // REQ-33: Demo mode — no real submission
    triggerDemo()
    navigate('/demo')
  }

  return (
    <>
      <Helmet>
        <title>Kontakt — Restauracja Złoty Talerz</title>
        <meta
          name="description"
          content="Skontaktuj się z restauracją Złoty Talerz. Adres, telefon, email i formularz kontaktowy."
        />
      </Helmet>

      <div className="min-h-screen bg-[var(--color-parchment)] dark:bg-restauracja-dark pt-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-14">
            <p className="text-restauracja-burgundy/70 uppercase tracking-widest text-xs mb-3">Kontakt</p>
            <h1 className="text-4xl font-bold font-serif text-restauracja-dark dark:text-restauracja-parchment mb-4">
              Jak nas znaleźć
            </h1>
            <div className="w-16 border-t border-dotted border-restauracja-burgundy/40 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Map + info */}
            <div>
              {/* Google Maps embed */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-restauracja-burgundy/10 mb-8 h-64">
                <iframe
                  title="Restauracja Złoty Talerz — mapa"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.7!2d21.0!3d52.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8c92692e49%3A0xc2e97552!2sPla%C5%BC%20Teatralny%2C%20Warszawa!5e0!3m2!1spl!2spl!4v1683000000000!5m2!1spl!2spl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {CONTACT_INFO.map(({ Icon, label, value }) => (
                  <div key={label} className="flex gap-3 items-start">
                    <div className="w-9 h-9 rounded-full bg-restauracja-burgundy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-restauracja-burgundy" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-restauracja-burgundy/70 mb-1">{label}</p>
                      <p className="text-sm text-restauracja-dark dark:text-restauracja-parchment whitespace-pre-line leading-relaxed">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact form */}
            <div ref={formRef}>
              <h2 className="text-2xl font-bold font-serif text-restauracja-dark dark:text-restauracja-parchment mb-6">
                Napisz do nas
              </h2>

              <div
                className="bg-white dark:bg-restauracja-dark/80 rounded-2xl shadow-lg border border-restauracja-burgundy/10 p-8"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(to bottom, transparent 0px, transparent 29px, rgba(124,45,18,0.04) 30px)',
                  backgroundSize: '100% 30px',
                }}
              >
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-restauracja-burgundy/70 block mb-1">
                      Imię i nazwisko *
                    </label>
                    <input
                      {...register('imie')}
                      placeholder="Jan Kowalski"
                      className="w-full border-b-2 border-restauracja-burgundy/20 focus:border-restauracja-burgundy bg-transparent py-2 text-sm focus:outline-none transition-colors"
                    />
                    {errors.imie && (
                      <p className="text-xs text-red-500 mt-1">{errors.imie.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-restauracja-burgundy/70 block mb-1">
                      Email *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="jan@email.com"
                      className="w-full border-b-2 border-restauracja-burgundy/20 focus:border-restauracja-burgundy bg-transparent py-2 text-sm focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-restauracja-burgundy/70 block mb-1">
                      Temat *
                    </label>
                    <input
                      {...register('temat')}
                      placeholder="Rezerwacja na urodziny"
                      className="w-full border-b-2 border-restauracja-burgundy/20 focus:border-restauracja-burgundy bg-transparent py-2 text-sm focus:outline-none transition-colors"
                    />
                    {errors.temat && (
                      <p className="text-xs text-red-500 mt-1">{errors.temat.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-restauracja-burgundy/70 block mb-1">
                      Wiadomość *
                    </label>
                    <textarea
                      {...register('wiadomosc')}
                      rows={4}
                      placeholder="Napisz do nas..."
                      className="w-full border-b-2 border-restauracja-burgundy/20 focus:border-restauracja-burgundy bg-transparent py-2 text-sm focus:outline-none transition-colors resize-none"
                    />
                    {errors.wiadomosc && (
                      <p className="text-xs text-red-500 mt-1">{errors.wiadomosc.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-restauracja-burgundy text-white rounded-full font-medium hover:bg-restauracja-wine transition-colors disabled:opacity-60"
                  >
                    Wyślij wiadomość
                  </button>
                  <p className="text-xs text-center text-gray-400 italic">
                    * Wersja demonstracyjna — formularz nie wysyła danych
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
