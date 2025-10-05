import ServiceCard from '../ServiceCard'
import { Sparkles } from 'lucide-react'

export default function ServiceCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ServiceCard
        icon={Sparkles}
        title="Gesichtsbehandlung"
        description="Verwöhnen Sie Ihre Haut mit unseren professionellen Gesichtsbehandlungen"
        price="ab 65€"
      />
    </div>
  )
}
