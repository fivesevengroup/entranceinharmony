import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Gift, LucideIcon } from "lucide-react";

interface VoucherCardProps {
  type: "digital" | "physical";
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  shippingCost?: string;
  onSelect: () => void;
}

export default function VoucherCard({
  type,
  icon: Icon,
  title,
  description,
  features,
  shippingCost,
  onSelect,
}: VoucherCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />
      
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        {type === "digital" && (
          <Badge className="mx-auto mb-2 bg-primary text-primary-foreground">Sofort per E-Mail</Badge>
        )}
        <CardTitle className="font-serif text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
        {shippingCost && (
          <p className="mt-4 text-sm text-muted-foreground">+ {shippingCost} Versandkosten</p>
        )}
      </CardContent>
      
      <CardFooter>
        <Button
          className="w-full"
          onClick={onSelect}
          data-testid={`button-voucher-${type}`}
        >
          Gutschein jetzt kaufen
        </Button>
      </CardFooter>
    </Card>
  );
}
