import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  link?: string;
}

export default function ServiceCard({ icon: Icon, title, description, price, link = "/gesichtsbehandlungen" }: ServiceCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="font-serif text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <p className="text-2xl font-semibold text-primary">{price}</p>
        <Button variant="outline" className="w-full" asChild data-testid={`button-service-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          <a href={link}>Mehr erfahren</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
