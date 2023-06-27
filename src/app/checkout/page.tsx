import { MainContent } from "@/components/MainContent/MainContent";
import { Checkout } from "@/components/Checkout/Checkout";

export default function CheckoutPage() {
  return (
    <MainContent hasAsideBlock={false}>
      <Checkout />
    </MainContent>
  );
}