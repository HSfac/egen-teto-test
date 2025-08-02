import Card from "@/components/ui/Card";
import Likert from "@/components/Likert";

export function QuestionCard(
  { id, text, value, onChange }:
  { id:number; text:string; value?:number; onChange:(v:number)=>void }
){
  return (
    <Card className="p-4">
      <p className="mb-3">{id}. {text}</p>
      <Likert name={`q-${id}`} value={value} onChange={onChange} />
    </Card>
  );
}