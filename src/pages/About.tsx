import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Leaf, Award, Heart, Users } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const TIMELINE = [
  {
    year: '2008',
    title: 'Otwarcie restauracji',
    description: 'Paweł Nowak i jego żona Anna otwierają Złoty Talerz przy Placu Teatralnym w Warszawie z 30 miejscami i wizją slow-food fine dining.',
  },
  {
    year: '2011',
    title: 'Pierwsza nagroda',
    description: 'Restauracja zdobywa pierwszą gwiazdkę Bib Gourmand Michelin Guide oraz nagrodę "Restauracja Roku" tygodnika Wprost.',
  },
  {
    year: '2015',
    title: 'Rozbudowa i Ogród',
    description: 'Otwarcie ogrodu letniego, nowej sali degustacyjnej i kuchni otwartej z Chef\'s Table dla 8 gości. Zatrudnienie sommeliera.',
  },
  {
    year: '2019',
    title: 'Akademia Smaku',
    description: 'Uruchomienie programu warsztatów kulinarnych dla miłośników gotowania oraz autorskiego menu degustacyjnego 10-daniowego.',
  },
  {
    year: '2024',
    title: 'Nowa era',
    description: 'Remont i modernizacja wnętrza w duchu biophilic design. Nowe menu z 60% składników od lokalnych rolników w promieniu 100 km.',
  },
]

const TEAM = [
  {
    name: 'Paweł Nowak',
    role: 'Head Chef & Właściciel',
    image: 'https://i.pravatar.cc/300?img=11',
    bio: 'Kucharz z 20-letnim doświadczeniem. Kształcił się w Paryżu, Barcelonie i Tokio. Mistrz połączeń śródziemnomorskich z polską kuchnią.',
  },
  {
    name: 'Anna Nowak',
    role: 'Co-właścicielka & Menedżer',
    image: 'https://i.pravatar.cc/300?img=20',
    bio: 'Absolwentka SGH. Tworzy niezapomniane doświadczenia gości i dba o każdy detal obsługi. Pasjonatka design i hospitality.',
  },
  {
    name: 'Marek Ferrari',
    role: 'Sous Chef',
    image: 'https://i.pravatar.cc/300?img=12',
    bio: 'Włoski mistrz makaronu i risotto. Specjalizuje się w kuchni Piemontu i Toskanii. Autor cotygodniowych włoskich specjałów.',
  },
  {
    name: 'Anna Wiśniewska',
    role: 'Sommelier',
    image: 'https://i.pravatar.cc/300?img=23',
    bio: 'Certyfikowana WSET Level 4. Prowadzi wieczory degustacyjne i dobiera wina do każdego menu. Ekspertka od win naturalnych.',
  },
]

const VALUES = [
  {
    Icon: Leaf,
    title: 'Slow-Food',
    description: 'Sezonowe, lokalne składniki od zaufanych rolników. Żadnych kompromisów w jakości.',
  },
  {
    Icon: Award,
    title: 'Rzemiosło',
    description: 'Każde danie to efekt godzin pracy, najlepszych technik i pasji do perfekcji.',
  },
  {
    Icon: Heart,
    title: 'Gościnność',
    description: 'Tworzymy chwile, które pamiętacie. Personalizowane doświadczenia przy każdym stole.',
  },
  {
    Icon: Users,
    title: 'Wspólnota',
    description: 'Wspieramy lokalnych producentów, rolników i artystów. Razem tworzymy lepszą gastronomię.',
  },
]

export default function About() {
  const headRef = useScrollReveal<HTMLDivElement>()
  const teamRef = useScrollReveal<HTMLDivElement>()

  return (
    <>
      <Helmet>
        <title>O Nas — Restauracja Złoty Talerz</title>
        <meta
          name="description"
          content="Historia, zespół i wartości restauracji Złoty Talerz. Slow-food fine dining w Warszawie od 2008 roku."
        />
      </Helmet>

      {/* Hero */}
      <section
        className="relative h-72 sm:h-96 flex items-end bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-restauracja-dark/80 via-restauracja-dark/40 to-transparent" />
        <div className="relative z-10 px-4 sm:px-8 lg:px-16 pb-10">
          <p className="text-restauracja-cream/70 uppercase tracking-widest text-xs mb-2">O nas</p>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-restauracja-parchment leading-tight">
            Nasza historia
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-[var(--color-parchment)] dark:bg-restauracja-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div ref={headRef}>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-restauracja-cream/80 leading-relaxed mb-6">
              Restauracja Złoty Talerz to miejsce, gdzie czas zwalnia, a jedzenie staje się rytuałem. Łączymy tradycję slow-food z precyzją fine dining, tworząc menu z lokalnych, sezonowych składników.
            </p>
            <div className="w-16 border-t border-dotted border-restauracja-burgundy/40 mx-auto" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-restauracja-burgundy/5 dark:bg-restauracja-dark/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold font-serif text-restauracja-dark dark:text-restauracja-parchment text-center mb-14">
            Kronika restauracji
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-restauracja-burgundy/20 -translate-x-1/2" />

            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 mb-12 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-restauracja-burgundy ring-4 ring-restauracja-burgundy/10" />

                {/* Content */}
                <div className={`pl-10 sm:pl-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'sm:text-right sm:pr-8' : 'sm:pl-8'}`}>
                  <span className="inline-block px-3 py-1 bg-restauracja-burgundy text-white text-xs font-bold rounded-full mb-2">
                    {item.year}
                  </span>
                  <h3 className="font-serif font-semibold text-restauracja-dark dark:text-restauracja-parchment mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-restauracja-cream/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[var(--color-parchment)] dark:bg-restauracja-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={teamRef} className="text-center mb-14">
            <p className="text-restauracja-burgundy/70 uppercase tracking-widest text-xs mb-3">Nasz zespół</p>
            <h2 className="text-3xl font-bold font-serif text-restauracja-dark dark:text-restauracja-parchment">
              Ludzie za kulisami
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-4 border-restauracja-burgundy/20"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif font-semibold text-restauracja-dark dark:text-restauracja-parchment mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-restauracja-burgundy font-medium uppercase tracking-wider mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-gray-500 dark:text-restauracja-cream/60 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-restauracja-burgundy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-serif text-center mb-14 text-restauracja-parchment">
            Nasze wartości
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map(({ Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-restauracja-parchment/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-restauracja-cream" />
                </div>
                <h3 className="font-serif font-semibold text-restauracja-parchment text-lg mb-3">{title}</h3>
                <p className="text-restauracja-cream/70 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
