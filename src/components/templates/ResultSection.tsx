import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export function ResultSection(
  { title, items }:{ title:string; items:string[] }
){
  return (
    <section className="space-y-2">
      <h3 className="font-semibold">{title}</h3>
      <Card className="p-4">
        <ul className="flex flex-wrap gap-2">
          {items.map(v => <Badge key={v}>{v}</Badge>)}
        </ul>
      </Card>
    </section>
  );
}