import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, CreditCard, Smartphone, Building2 } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useNavigate } from 'react-router-dom'

type CheckoutStep = 'koszyk' | 'dane' | 'platnosc'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, total, updateQty, removeItem, clear } = useCartStore()
  const [step, setStep] = useState<CheckoutStep>('koszyk')
  const [processing, setProcessing] = useState(false)
  const navigate = useNavigate()

  const handleNext = () => {
    if (step === 'koszyk') setStep('dane')
    else if (step === 'dane') setStep('platnosc')
  }

  const handlePayment = async () => {
    setProcessing(true)
    // Demo processing animation (REQ-33) — no real payment
    await new Promise((r) => setTimeout(r, 1400))
    setProcessing(false)
    clear()
    onClose()
    navigate('/demo')
  }

  const stepLabels: CheckoutStep[] = ['koszyk', 'dane', 'platnosc']

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Drawer — paper/linen notebook aesthetic (NOT glassmorphism) */}
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Koszyk zamówień"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col bg-[#FDFCF0] dark:bg-[#1C1510] border-l border-restauracja-burgundy/20 shadow-2xl"
            style={{
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 29px, rgba(124,45,18,0.06) 30px)',
              backgroundSize: '100% 30px',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-restauracja-burgundy/15">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-restauracja-burgundy" />
                <h2 className="font-serif font-semibold text-restauracja-dark dark:text-restauracja-parchment">
                  Zamówienie
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Zamknij koszyk"
                className="p-1.5 rounded-full hover:bg-restauracja-burgundy/10 transition-colors text-restauracja-dark dark:text-restauracja-parchment"
              >
                <X size={18} />
              </button>
            </div>

            {/* Progress steps */}
            <div className="flex items-center gap-0 px-6 py-3 border-b border-restauracja-burgundy/10">
              {stepLabels.map((s, i) => (
                <div key={s} className="flex items-center">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold border ${
                    step === s
                      ? 'bg-restauracja-burgundy text-white border-restauracja-burgundy'
                      : stepLabels.indexOf(step) > i
                      ? 'bg-restauracja-gold text-white border-restauracja-gold'
                      : 'border-restauracja-burgundy/30 text-restauracja-burgundy/50'
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`mx-2 text-[10px] uppercase tracking-wider font-medium ${
                    step === s ? 'text-restauracja-burgundy' : 'text-gray-400'
                  }`}>
                    {s === 'koszyk' ? 'Koszyk' : s === 'dane' ? 'Dane' : 'Płatność'}
                  </span>
                  {i < 2 && <span className="text-restauracja-burgundy/20 mr-2">›</span>}
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <AnimatePresence mode="wait">
                {step === 'koszyk' && (
                  <motion.div key="koszyk" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    {items.length === 0 ? (
                      <div className="text-center py-16">
                        <ShoppingBag size={40} className="mx-auto text-restauracja-burgundy/30 mb-4" />
                        <p className="text-gray-500 text-sm">Koszyk jest pusty</p>
                      </div>
                    ) : (
                      <ul className="space-y-3">
                        {items.map((item) => (
                          <li key={item.id} className="flex items-center gap-3 py-2 border-b border-dotted border-restauracja-burgundy/15">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-restauracja-dark dark:text-restauracja-parchment truncate">{item.name}</p>
                              <p className="text-xs text-gray-400">{item.price} zł / szt.</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded-full border border-restauracja-burgundy/30 flex items-center justify-center hover:bg-restauracja-burgundy/10">
                                <Minus size={10} />
                              </button>
                              <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                              <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded-full border border-restauracja-burgundy/30 flex items-center justify-center hover:bg-restauracja-burgundy/10">
                                <Plus size={10} />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-restauracja-burgundy w-14 text-right">
                              {(item.price * item.qty).toFixed(0)} zł
                            </span>
                            <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                              <X size={14} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}

                {step === 'dane' && (
                  <motion.div key="dane" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <p className="text-sm text-gray-500 mb-4">Wprowadź dane dostawy</p>
                    <div className="space-y-3">
                      {['Imię i nazwisko', 'Adres e-mail', 'Telefon', 'Adres dostawy'].map((field) => (
                        <div key={field}>
                          <label className="text-xs text-restauracja-burgundy/70 uppercase tracking-wider block mb-1">{field}</label>
                          <input
                            type="text"
                            placeholder={field}
                            className="w-full px-3 py-2 border-b border-restauracja-burgundy/30 bg-transparent text-sm focus:outline-none focus:border-restauracja-burgundy"
                            style={{ fontFamily: 'Lora, serif' }}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-gray-400 italic">* To jest demo — żadne dane nie są przesyłane</p>
                  </motion.div>
                )}

                {step === 'platnosc' && (
                  <motion.div key="platnosc" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <p className="text-sm text-gray-500 mb-4">Wybierz metodę płatności</p>
                    <div className="space-y-3">
                      {[
                        { label: 'BLIK', icon: <Smartphone size={18} />, desc: 'Kod BLIK' },
                        { label: 'Karta', icon: <CreditCard size={18} />, desc: 'Visa / Mastercard / Amex' },
                        { label: 'Przelew', icon: <Building2 size={18} />, desc: 'Szybki przelew bankowy' },
                      ].map((method) => (
                        <button
                          key={method.label}
                          className="w-full flex items-center gap-3 p-3 border border-restauracja-burgundy/20 rounded-lg hover:border-restauracja-burgundy hover:bg-restauracja-burgundy/5 transition-colors text-left"
                        >
                          <span className="text-restauracja-burgundy">{method.icon}</span>
                          <div>
                            <p className="font-medium text-sm">{method.label}</p>
                            <p className="text-xs text-gray-400">{method.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-gray-400 italic">* Brak prawdziwych płatności — wersja demo</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-restauracja-burgundy/15">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">Razem</span>
                <span className="text-xl font-bold font-serif text-restauracja-burgundy">{total.toFixed(0)} zł</span>
              </div>

              {step === 'platnosc' ? (
                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full py-3 bg-restauracja-burgundy text-white rounded-full font-medium hover:bg-restauracja-wine transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                      />
                      Przetwarzanie...
                    </>
                  ) : (
                    'Złóż zamówienie (Demo)'
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={items.length === 0}
                  className="w-full py-3 bg-restauracja-burgundy text-white rounded-full font-medium hover:bg-restauracja-wine transition-colors disabled:opacity-40"
                >
                  {step === 'koszyk' ? 'Przejdź do danych' : 'Przejdź do płatności'}
                </button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
