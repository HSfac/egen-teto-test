"use client";
import React from "react";
type Props = {
  items: { key: string; label: string }[];
  value?: string;
  onChange?: (k:string)=>void;
  allowNone?: boolean;
};
export default function ToggleChip({ items, value, onChange, allowNone=false }:Props){
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(it=>{
        const active = value===it.key;
        return (
          <button
            key={it.key}
            onClick={()=>{
              if(allowNone && active) onChange?.("");
              else onChange?.(it.key);
            }}
            className={`px-3 h-9 rounded-full border text-sm tap ${active ? "border-white" : "border-border text-muted"}`}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}