import GalleryGrid from '../GalleryGrid'
import beforeAfterImage from '@assets/generated_images/vorher-nachher-hautverbesserung-ergebnis.png'

export default function GalleryGridExample() {
  const sampleImages = [
    { src: beforeAfterImage, alt: "Vorher-Nachher Gesichtsbehandlung" },
    { src: beforeAfterImage, alt: "Behandlungsergebnis" },
    { src: beforeAfterImage, alt: "Hautpflege Ergebnis" },
    { src: beforeAfterImage, alt: "Schönheitsbehandlung" }
  ]

  return (
    <div className="p-8">
      <GalleryGrid images={sampleImages} />
    </div>
  )
}
