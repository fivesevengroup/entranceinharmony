import VoucherCard from '../VoucherCard'
import { Mail } from 'lucide-react'

export default function VoucherCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <VoucherCard
        type="digital"
        icon={Mail}
        title="Digitaler Gutschein"
        description="Per E-Mail in wenigen Minuten"
        features={[
          "Wählbarer Betrag (25€, 50€, 100€, Wunschbetrag)",
          "Persönliche Nachricht möglich",
          "Sofortiger E-Mail-Versand als PDF"
        ]}
        onSelect={() => console.log('Digital voucher selected')}
      />
    </div>
  )
}
