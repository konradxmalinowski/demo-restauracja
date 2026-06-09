import { useEffect, useRef } from 'react'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', once = true } = options
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            entry.target.classList.remove('reveal-visible')
          }
        })
      },
      { threshold, rootMargin }
    )

    el.classList.add('reveal-hidden')
    observer.observe(el)

    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return ref
}
