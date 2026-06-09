# Demo: Restauracja

Działające demo strony dla restauracji premium — zbudowane w React + TypeScript z TanStack Query i Framer Motion.

Część portfolio [Konrad Malinowski](https://malinowski.dev) — pokazuje, jak może wyglądać strona Twojej firmy.

**Live demo:** https://konradxmalinowski.github.io/demo-restauracja/

---

## Co pokazuje to demo

- Karta dań z wyszukiwaniem i filtrami (wegetariańskie, bezglutenowe, bestsellery)
- Rezerwacja stolika z interaktywnym kalendarzem
- Koszyk i zamówienia online z trójstopniowym procesem płatności
- Kalendarz wydarzeń (degustacje, koncerty, kolacje tematyczne)
- Galeria dań — każda sekcja zaprojektowana tak, żeby jedzenie wyglądało dobrze
- Pełna responsywność — mobile-first

## Stack

- **React 18** + TypeScript
- **TanStack Query** — zarządzanie stanem serwera i cache'owanie
- **Framer Motion** — animacje i przejścia
- **Tailwind CSS** — stylowanie
- **Vite** — bundler

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod http://localhost:5173

## Struktura

```
src/
├── components/     # Komponenty UI (Menu, Cart, Calendar, Booking)
├── pages/          # Strony (Home, Menu, Reservations, Events)
├── hooks/          # Custom hooks (useCart, useMenu, useReservation)
└── assets/         # Zdjęcia dań i wystroju
```

## Zainteresowany podobną stroną?

Napisz: [malinowski.konrad45@gmail.com](mailto:malinowski.konrad45@gmail.com)  
Portfolio: [malinowski.dev](https://malinowski.dev)
