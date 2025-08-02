"use client";
import React from "react";
type Props = {
  name: string;
  value?: number;
  onChange?: (v:number)=>void;
  labels?: [string, string]; // [왼쪽, 오른쪽] 라벨(선택)
};

export default function Likert({ name, value, onChange, labels }: Props){
  const scaleLabels = [
    "전혀\n아니다", "아니다", "보통", "그렇다", "매우\n그렇다"
  ];

  return (
    <div className="space-y-3">
      {/* 기존 왼쪽/오른쪽 라벨 */}
      {labels && (
        <div className="flex justify-between text-xs text-muted">
          <span>{labels[0]}</span><span>{labels[1]}</span>
        </div>
      )}
      
      {/* 1~5 척도 설명 */}
      <div className="grid grid-cols-5 gap-2 text-xs text-muted/70 text-center">
        {scaleLabels.map((label, i) => (
          <div key={i} className="whitespace-pre-line leading-tight">
            {label}
          </div>
        ))}
      </div>
      
      {/* 1~5 버튼 */}
      <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label={name}>
        {[1,2,3,4,5].map(v=>{
          const selected = value===v;
          return (
            <button
              key={v}
              role="radio"
              aria-checked={selected}
              onClick={()=>onChange?.(v)}
              className={`h-10 rounded-lg border text-sm tap relative group ${
                selected 
                  ? "border-white bg-white/10 text-white font-semibold" 
                  : "border-border text-white/80 hover:border-white/50 hover:bg-white/5"
              }`}
            >
              <span className="relative z-10">{v}</span>
              {selected && (
                <div className="absolute inset-0 bg-brand/20 rounded-lg animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* 선택 도움말 */}
      <div className="text-center">
        <div className="text-xs text-muted/60">
          💡 각 문항에 대해 자신과 가장 가까운 정도를 선택해주세요
        </div>
      </div>
    </div>
  );
}