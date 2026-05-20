import { useApp } from '../context/AppContext.jsx'

export default function CreditBadge() {
  const { credits, isPremium } = useApp()
  return (
    <span className="badge" title="Crédits diagnostic">
      {isPremium ? 'Premium' : `${credits} crédits`}
    </span>
  )
}
