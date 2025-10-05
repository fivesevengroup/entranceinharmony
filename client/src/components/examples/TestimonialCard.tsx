import TestimonialCard from '../TestimonialCard'

export default function TestimonialCardExample() {
  return (
    <div className="p-8 max-w-md">
      <TestimonialCard
        name="Sarah M."
        text="Eine wunderbare Erfahrung! Die Behandlung war entspannend und das Ergebnis übertrifft meine Erwartungen."
        rating={5}
      />
    </div>
  )
}
