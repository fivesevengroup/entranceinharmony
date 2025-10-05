import PriceTable from '../PriceTable'

export default function PriceTableExample() {
  return (
    <div className="p-8 max-w-2xl">
      <PriceTable
        category="Gesichtsbehandlungen"
        items={[
          { name: "Klassische Gesichtsbehandlung", price: "65€", duration: "60 Min." },
          { name: "Anti-Aging Behandlung", price: "85€", duration: "75 Min." },
          { name: "Tiefenreinigung", price: "70€", duration: "60 Min." }
        ]}
      />
    </div>
  )
}
