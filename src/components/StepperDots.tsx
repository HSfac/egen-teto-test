"use client";
import React from "react";
export default function StepperDots({ total, current, onJump }:{
  total:number; current:number; onJump?:(i:number)=>void;
}){
  return (
    <div className="flex items-center gap-2">
      {Array.from({length: total}).map((_,i) => {
        const active = i===current;
        return (
          <button
            key={i}
            aria-label={`step-${i+1}`}
            onClick={()=>onJump?.(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${active ? "bg-brand" : "bg-border"}`}
          />
        );
      })}
    </div>
  );
}