"use client";
import React from "react";
type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

export default function Button(
  { children, className="", variant="primary", size="md", ...props }:
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }
){
  const base =
    "tap inline-flex items-center justify-center rounded-xl font-semibold focus-visible:focus-ring disabled:opacity-60 disabled:cursor-not-allowed";
  const pv = {
    primary: "bg-brand text-black hover:shadow-brand",
    secondary:"bg-surface text-white border border-border hover:shadow-soft",
    ghost:   "bg-transparent text-white border border-border hover:bg-surface",
    danger:  "bg-danger text-white hover:brightness-110",
  }[variant];
  const ps = size==="sm" ? "h-9 px-3 text-sm" : "h-11 px-4 text-[15px]";
  return <button className={[base,pv,ps,className].join(" ")} {...props}>{children}</button>;
}