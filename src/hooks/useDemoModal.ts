import { useUiStore } from '../store/uiStore'

export function useDemoModal() {
  const openDemoModal = useUiStore((s) => s.openDemoModal)

  const triggerDemo = () => {
    openDemoModal()
  }

  return { triggerDemo }
}
