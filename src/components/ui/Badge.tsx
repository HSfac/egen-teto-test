import React from "react";
export default function Badge({ children }: { children: React.ReactNode }){
  return (
    <span className="px-3 py-1 rounded-full border border-border text-muted text-xs">
      {children}
    </span>
  );
}