import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  text: string;
  rating?: number;
}

export default function TestimonialCard({ name, text, rating = 5 }: TestimonialCardProps) {
  return (
    <Card className="bg-accent border-l-4 border-l-primary">
      <CardContent className="pt-6">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
          ))}
        </div>
        <p className="text-accent-foreground italic font-serif mb-4 leading-relaxed">
          "{text}"
        </p>
        <p className="text-sm font-medium text-accent-foreground/80">– {name}</p>
      </CardContent>
    </Card>
  );
}
