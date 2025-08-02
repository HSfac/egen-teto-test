export default function StepHeader({ title, step, total }:{ title:string; step:number; total:number }){
  return (
    <div className="flex items-end justify-between">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="text-sm text-muted">{step}/{total}</div>
    </div>
  );
}