"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import ToggleChip from "@/components/ToggleChip";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Home() {
  const [label, setLabel] = useState<"남"|"녀"|"">("");

  return (
    <main className="space-y-8 animate-in fade-in duration-700">
      {/* 히어로 섹션 */}
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-brand/20 via-transparent to-brand/20 blur-3xl -z-10"></div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-brand bg-clip-text text-transparent">
            에겐/테토 에너지 테스트
          </h1>
        </div>
        <p className="text-muted text-sm leading-relaxed">
          요즘 핫한 성격 유형 테스트 ✨<br/>
          <span className="text-xs">24문항 · 1~2분 · 오락용(의학 아님)</span>
        </p>
      </div>

      {/* 캐릭터 이미지 영역 */}
      <div className="flex justify-center">
        <Card className="p-6 bg-gradient-to-br from-surface to-surface/60 border-brand/20">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-brand/30 to-brand/10 rounded-full flex items-center justify-center">
                {/* 에겐남 이미지 자리 */}
                <span className="text-2xl">🧘‍♂️</span>
              </div>
              <div className="text-xs text-muted">에겐남</div>
              <div className="text-xs text-brand font-medium">조화·공감형</div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-danger/30 to-danger/10 rounded-full flex items-center justify-center">
                {/* 테토남 이미지 자리 */}
                <span className="text-2xl">💪</span>
              </div>
              <div className="text-xs text-muted">테토남</div>
              <div className="text-xs text-danger font-medium">직설·추진형</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 통계 섹션 */}
      <Card className="p-4 bg-gradient-to-r from-surface/80 to-surface border-border/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-brand">24</div>
            <div className="text-xs text-muted">문항</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">1-2분</div>
            <div className="text-xs text-muted">소요시간</div>
          </div>
          <div>
            <div className="text-lg font-bold text-warning">🔥</div>
            <div className="text-xs text-muted">요즘 핫함</div>
          </div>
        </div>
      </Card>

      {/* 설정 섹션 */}
      <Card className="p-5 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">👤 성별 선택</span>
            <span className="text-xs text-muted">(선택사항)</span>
          </div>
          <ToggleChip
            items={[
              { key:"", label:"선택안함" },
              { key:"남", label:"👨 남자" },
              { key:"녀", label:"👩 여자" },
            ]}
            value={label}
            onChange={setLabel}
            allowNone
          />
          <div className="text-xs text-muted/70 text-center">
            💡 결과에 성별이 반영됩니다 (예: 테토남, 에겐녀)
          </div>
        </div>
      </Card>

      {/* CTA 섹션 */}
      <div className="space-y-4">
        <Link
          href={`/test?g=${encodeURIComponent(label)}`}
          className="block"
        >
          <Button className="w-full h-12 text-base font-bold bg-gradient-to-r from-brand to-brand/80 hover:from-brand/90 hover:to-brand/70 shadow-brand transition-all duration-300 hover:scale-[1.02] group">
            <span className="inline-block rocket-hover">🚀</span>
            <span className="ml-2">테스트 시작하기</span>
          </Button>
        </Link>
        
        <div className="text-center space-y-2">
          <div className="text-xs text-muted/80">
            📱 PC에서도 모바일 뷰로 최적화
          </div>
          <div className="text-xs text-muted/60">
            * SNS 유행 밈에서 착안한 자기이해 도구입니다
          </div>
        </div>
      </div>
    </main>
  );
}
