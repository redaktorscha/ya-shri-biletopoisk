import { MainContent } from "@/components/MainContent/MainContent";
import { QABlock } from "@/components/QA/QABlock";

export default function InfoPage() {
  return (
    <MainContent hasAsideBlock={false}>
      <QABlock />
    </MainContent>
  );
}