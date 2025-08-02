import React from "react";
export default function Progress({ value }: { value: number }){
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full rounded-full bg-border overflow-hidden">
      <div className="h-full bg-brand" style={{ width: `${v}%` }} />
    </div>
  );
}