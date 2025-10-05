import { useState } from 'react'
import VoucherModal from '../VoucherModal'
import { Button } from '@/components/ui/button'

export default function VoucherModalExample() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open Voucher Modal</Button>
      <VoucherModal open={open} onOpenChange={setOpen} voucherType="digital" />
    </div>
  )
}
