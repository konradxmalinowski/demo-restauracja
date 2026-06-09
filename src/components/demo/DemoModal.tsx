import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useUiStore } from '../../store/uiStore'

const DEMO_TEXT =
  'To jest wersja demonstracyjna przygotowana w celu prezentacji możliwości wykonania strony internetowej dla klienta.'

export function DemoModal() {
  const { demoModalOpen, closeDemoModal } = useUiStore()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (demoModalOpen) {
      closeButtonRef.current?.focus()
    }
  }, [demoModalOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && demoModalOpen) {
        closeDemoModal()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [demoModalOpen, closeDemoModal])

  return (
    <AnimatePresence>
      {demoModalOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={closeDemoModal}
          />
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[var(--color-parchment)] dark:bg-[var(--color-dark)] rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col gap-4">
              <h2
                id="demo-modal-title"
                className="text-xl font-semibold text-[var(--color-dark)] dark:text-[var(--color-parchment)]"
              >
                Wersja demonstracyjna
              </h2>
              <p className="text-[var(--color-dark)] dark:text-[var(--color-cream)] leading-relaxed">
                {DEMO_TEXT}
              </p>
              <button
                ref={closeButtonRef}
                onClick={closeDemoModal}
                className="mt-2 px-6 py-2 bg-[var(--color-burgundy)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity self-end"
              >
                Zamknij
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
