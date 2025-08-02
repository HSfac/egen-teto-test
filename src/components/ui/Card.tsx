import React from "react";

export default function Card({ className="", ...props }: React.HTMLAttributes<HTMLDivElement>){
  return (
    <div
      className={["rounded-xl border border-border bg-surface", className].join(" ")}
      {...props}
    />
  );
}