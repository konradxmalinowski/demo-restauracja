import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UiState {
  demoModalOpen: boolean
  darkMode: boolean
  openDemoModal: () => void
  closeDemoModal: () => void
  toggleDarkMode: () => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      demoModalOpen: false,
      darkMode: false,
      openDemoModal: () => set({ demoModalOpen: true }),
      closeDemoModal: () => set({ demoModalOpen: false }),
      toggleDarkMode: () =>
        set((state) => {
          const next = !state.darkMode
          if (next) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          return { darkMode: next }
        }),
    }),
    {
      name: 'restauracja-ui',
      partialize: (state: UiState) => ({ darkMode: state.darkMode }),
      onRehydrateStorage: () => (state) => {
        if (state?.darkMode) {
          document.documentElement.classList.add('dark')
        }
      },
    }
  )
)
