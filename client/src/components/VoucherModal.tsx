import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface VoucherModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  voucherType: "digital" | "physical";
}

export default function VoucherModal({ open, onOpenChange, voucherType }: VoucherModalProps) {
  const { toast } = useToast();
  const [amount, setAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Voucher purchase:", {
      type: voucherType,
      amount: amount === "custom" ? customAmount : amount,
      recipientName,
      message,
    });
    toast({
      title: "Gutschein wird erstellt",
      description: `Sie werden zu PayPal weitergeleitet...`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {voucherType === "digital" ? "Digitaler Gutschein" : "Physischer Gutschein"}
          </DialogTitle>
          <DialogDescription>
            {voucherType === "digital"
              ? "Der Gutschein wird per E-Mail als PDF versendet"
              : "Der Gutschein wird schön verpackt per Post versendet (+2,90€)"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label>Gutscheinbetrag</Label>
            <RadioGroup value={amount} onValueChange={setAmount}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="25" id="25" data-testid="radio-amount-25" />
                <Label htmlFor="25" className="font-normal cursor-pointer">25€</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="50" id="50" data-testid="radio-amount-50" />
                <Label htmlFor="50" className="font-normal cursor-pointer">50€</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="100" id="100" data-testid="radio-amount-100" />
                <Label htmlFor="100" className="font-normal cursor-pointer">100€</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" data-testid="radio-amount-custom" />
                <Label htmlFor="custom" className="font-normal cursor-pointer">Wunschbetrag</Label>
              </div>
            </RadioGroup>
            {amount === "custom" && (
              <Input
                type="number"
                placeholder="Betrag eingeben"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                min="10"
                required
                data-testid="input-custom-amount"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Name der beschenkten Person *</Label>
            <Input
              id="recipient"
              required
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              data-testid="input-recipient-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="personalMessage">Persönliche Nachricht</Label>
            <Textarea
              id="personalMessage"
              rows={3}
              placeholder="Ihre persönliche Nachricht..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              data-testid="input-personal-message"
            />
          </div>

          <div className="bg-accent p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Gutscheinwert:</span>
              <span className="font-semibold">
                {amount === "custom" ? `${customAmount || "0"}€` : `${amount}€`}
              </span>
            </div>
            {voucherType === "physical" && (
              <div className="flex justify-between mb-2">
                <span>Versand:</span>
                <span className="font-semibold">2,90€</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-accent-foreground/10">
              <span className="font-semibold">Gesamt:</span>
              <span className="font-semibold text-primary">
                {amount === "custom"
                  ? `${(parseFloat(customAmount || "0") + (voucherType === "physical" ? 2.9 : 0)).toFixed(2)}€`
                  : `${(parseFloat(amount) + (voucherType === "physical" ? 2.9 : 0)).toFixed(2)}€`}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full" data-testid="button-purchase-voucher">
            Jetzt mit PayPal bezahlen
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
