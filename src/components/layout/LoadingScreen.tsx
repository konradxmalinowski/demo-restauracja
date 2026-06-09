import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-restauracja-parchment dark:bg-restauracja-dark"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <motion.div
                className="w-full h-full border-2 border-restauracja-burgundy rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              />
              <div className="absolute inset-2 border border-restauracja-gold/50 rounded-full" />
            </div>
            <p className="text-restauracja-burgundy font-serif text-lg tracking-widest uppercase">
              Złoty Talerz
            </p>
            <p className="text-restauracja-gold/60 text-xs tracking-wider mt-1">
              Fine Dining
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
