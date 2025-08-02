"use client";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "답변을 분석하고 있어요...",
    "에너지 패턴을 계산 중...",
    "성격 유형을 매칭하는 중...",
    "결과를 준비하고 있어요!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-bg/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center space-y-8 p-8">
        {/* 로딩 애니메이션 */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 border-4 border-border rounded-full"></div>
            <div 
              className="absolute inset-0 border-4 border-brand rounded-full border-r-transparent animate-spin"
              style={{ animationDuration: "1s" }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl animate-pulse">
                {progress < 25 ? "🧘‍♂️" : progress < 50 ? "⚡" : progress < 75 ? "💪" : "✨"}
              </div>
            </div>
          </div>
        </div>

        {/* 진행률 */}
        <div className="space-y-2">
          <div className="w-64 h-2 bg-border rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full bg-gradient-to-r from-brand to-brand/80 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="text-sm text-muted">
            {Math.min(Math.round(progress), 100)}%
          </div>
        </div>

        {/* 메시지 */}
        <div className="h-6">
          <p className="text-sm text-white animate-pulse">
            {messages[currentMessage]}
          </p>
        </div>

        {/* 장식 요소 */}
        <div className="flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-brand rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}