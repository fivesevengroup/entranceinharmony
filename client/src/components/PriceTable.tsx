import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PriceItem {
  name: string;
  price: string;
  duration?: string;
}

interface PriceTableProps {
  category: string;
  items: PriceItem[];
}

export default function PriceTable({ category, items }: PriceTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-primary">{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-start py-3 ${
                index !== items.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                {item.duration && (
                  <p className="text-sm text-muted-foreground">{item.duration}</p>
                )}
              </div>
              <p className="font-semibold text-primary ml-4">{item.price}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
