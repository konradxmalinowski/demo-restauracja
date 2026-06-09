import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { useDemoModal } from '../../hooks/useDemoModal'

const reservationSchema = z.object({
  imie: z.string().min(2, 'Imię musi mieć min. 2 znaki'),
  nazwisko: z.string().min(2, 'Nazwisko musi mieć min. 2 znaki'),
  email: z.string().email('Podaj poprawny adres email'),
  telefon: z.string().regex(/^\+?[0-9\s-]{9,14}$/, 'Podaj poprawny numer telefonu'),
  liczbaOsob: z.string().min(1, 'Podaj liczbę osób').refine(
    (v) => { const n = Number(v); return n >= 1 && n <= 20 },
    { message: 'Min. 1, maks. 20 osób' }
  ),
  data: z.string().min(1, 'Wybierz datę'),
  godzina: z.string().min(1, 'Wybierz godzinę'),
  uwagi: z.string().optional(),
})

type ReservationFormData = z.infer<typeof reservationSchema>

const GODZINY = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '21:30', '22:00']

export function ReservationForm() {
  const navigate = useNavigate()
  const { triggerDemo } = useDemoModal()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    mode: 'onChange',
  })

  const onSubmit = (_data: ReservationFormData) => {
    // REQ-33: Demo mode — no real submission
    triggerDemo()
    navigate('/demo')
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-serif text-restauracja-burgundy mb-2">Rezerwacja stolika</h2>
        <p className="text-gray-500 dark:text-restauracja-cream/60 text-sm">
          Zarezerwuj stolik na wyjątkową kolację
        </p>
      </div>

      {/* Paper-embedded form aesthetic */}
      <div
        className="bg-white dark:bg-restauracja-dark/80 rounded-2xl shadow-lg overflow-hidden border border-restauracja-burgundy/10 p-8"
        style={{
          backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 29px, rgba(124,45,18,0.05) 30px)',
          backgroundSize: '100% 30px',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {/* Imię i Nazwisko */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-restauracja-burgundy/70 block mb-1">Imię *</label>
              <input
                {...register('imie')}
                placeholder="Jan"
                className="w-full border-b-2 border-restauracja-burgundy/20 focus:border-restauracja-burgundy bg-transparent py-2 text-sm focus:outline-none transition-colors"
              />
              {errors.imie && <p className="text-xs text-red-500 mt-1">{errors.imie.message}</p>}
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-restauracja-burgundy/70 block mb-1">Nazwisko *</label>
              <input
                {...register('nazwisko')}
                placeholder="Kowalski"
                className="w-full border-b-2 border-restauracja-burgundy/20 focus:border-restauracja-burgundy bg-transparent py-2 text-sm focus:outline-none transition-colors"
              />
              {errors.nazwisko && <p className="text-xs text-red-500 mt-1">{errors.nazwisko.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs uppercase tracking-wider text-restauracja-burgundy/70 block mb-1">Email *</label>
            <input
              {...register('email')}
              type="email"
              placeholder="jan.kowalski@email.com"
              className="w-full border-b-2 border-restauracja-burgundy/20 focus:border-restauracja-burgundy bg-transparent py-2 text-sm focus:outline-none transition-colors"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Telefon */}
          <div>
            <label className="text-xs uppercase tracking-wider text-restauracja-burgundy/70 block mb-1">Telefon *</label>
            <input
              {...register('telefon')}
              type="tel"
              placeholder="+48 600 000 000"
              className="w-full border-b-2 border-restauracja-burgundy/20 focus:border-restauracja-burgundy bg-transparent py-2 text-sm focus:outline-none transition-colors"
            />
            {errors.telefon && <p className="text-xs text-red-500 mt-1">{errors.telefon.message}</p>}
          </div>

          {/* Liczba osób, Data, Godzina */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-restauracja-burgundy/70 block mb-1">Liczba osób *</label>
              <input
                {...register('liczbaOsob')}
                type="number"
                min="1"
                max="20"
                placeholder="2"
                className="w-full border-b-2 border-restauracja-burgundy/20 focus:border-restauracja-burgundy bg-transparent py-2 text-sm focus:outline-none transition-colors"
              />
              {errors.liczbaOsob && <p className="text-xs text-red-500 mt-1">{errors.liczbaOsob.message}</p>}
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-restauracja-burgundy/70 block mb-1">Data *</label>
              <input
                {...register('data')}
                type="date"
                min={today}
                className="w-full border-b-2 border-restauracja-burgundy/20 focus:border-restauracja-burgundy bg-transparent py-2 text-sm focus:outline-none transition-colors"
              />
              {errors.data && <p className="text-xs text-red-500 mt-1">{errors.data.message}</p>}
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-restauracja-burgundy/70 block mb-1">Godzina *</label>
              <select
                {...register('godzina')}
                className="w-full border-b-2 border-restauracja-burgundy/20 focus:border-restauracja-burgundy bg-transparent py-2 text-sm focus:outline-none transition-colors"
              >
                <option value="">Wybierz</option>
                {GODZINY.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
              {errors.godzina && <p className="text-xs text-red-500 mt-1">{errors.godzina.message}</p>}
            </div>
          </div>

          {/* Uwagi */}
          <div>
            <label className="text-xs uppercase tracking-wider text-restauracja-burgundy/70 block mb-1">Uwagi (opcjonalne)</label>
            <textarea
              {...register('uwagi')}
              rows={3}
              placeholder="Alergie, życzenia specjalne, okazje..."
              className="w-full border-b-2 border-restauracja-burgundy/20 focus:border-restauracja-burgundy bg-transparent py-2 text-sm focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-restauracja-burgundy text-white rounded-full font-medium hover:bg-restauracja-wine transition-colors disabled:opacity-60"
          >
            Zarezerwuj stolik
          </button>
          <p className="text-xs text-center text-gray-400 italic">
            * Wersja demonstracyjna — formularz nie wysyła danych
          </p>
        </form>
      </div>
    </div>
  )
}
