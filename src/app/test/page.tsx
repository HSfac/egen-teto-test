"use client";
import { useMemo, useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { QUESTIONS, STEPS } from "@/lib/questions";
import { computeScores } from "@/lib/scoring";
import Progress from "@/components/ui/Progress";
import StepHeader from "@/components/StepHeader";
import StepperDots from "@/components/StepperDots";
import Button from "@/components/ui/Button";
import LoadingScreen from "@/components/LoadingScreen";
import { QuestionCard } from "@/components/templates/QuestionCard";

function TestContent() {
  const sp = useSearchParams();
  const router = useRouter();
  const gender = (sp.get("g") ?? "") as ""|"남"|"녀";
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const current = useMemo(()=>{
    const { range } = STEPS[step];
    return QUESTIONS.filter(q => q.id >= range[0] && q.id <= range[1]);
  }, [step]);

  // 스텝이 변경될 때마다 화면 상단으로 스크롤
  useEffect(() => {
    const scrollToTop = () => {
      // 여러 방법을 순차적으로 시도해서 확실하게 스크롤
      try {
        // 방법 1: 브라우저 호환성을 위한 즉시 스크롤 (fallback)
        window.scrollTo(0, 0);
        
        // 방법 2: 부드러운 스크롤 시도
        if (window.scrollTo && typeof window.scrollTo === 'function') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // 방법 3: document.documentElement 시도 (일부 브라우저에서 필요)
        if (document.documentElement && document.documentElement.scrollTo) {
          document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // 방법 4: document.body 시도 (모바일에서 때때로 필요)
        if (document.body && document.body.scrollTo) {
          document.body.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // 방법 5: main 요소로 직접 스크롤 (가장 확실한 방법)
        if (mainRef.current) {
          mainRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
        
        // 방법 6: 모바일에서 viewport 기준 스크롤
        if ('scrollingElement' in document && document.scrollingElement) {
          document.scrollingElement.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
      } catch (error) {
        // 모든 시도가 실패한 경우 최종 fallback
        console.warn('스크롤 실패, fallback 사용:', error);
        try {
          window.scrollTo(0, 0);
          if (mainRef.current) {
            mainRef.current.scrollIntoView();
          }
        } catch (fallbackError) {
          console.error('fallback 스크롤도 실패:', fallbackError);
        }
      }
    };

    // 렌더링 완료를 위한 지연
    const timeoutId = setTimeout(scrollToTop, 50);
    
    // 추가 보정을 위한 두 번째 시도
    const secondTimeoutId = setTimeout(scrollToTop, 200);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(secondTimeoutId);
    };
  }, [step]);

  function setAnswer(id: number, v: number) {
    setAnswers(a => ({ ...a, [id]: v }));
  }

  const progress = Math.round((Object.keys(answers).length / QUESTIONS.length) * 100);

  function next() {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      // useEffect에서 자동으로 스크롤 처리됨
    } else {
      setIsLoading(true);
    }
  }

  function handleLoadingComplete() {
    const s = computeScores(answers, QUESTIONS);
    const params = new URLSearchParams({
      g: gender,
      d: String(s.delta),
      e: s.energy,
      s: s.strength,
    });
    router.push(`/result?${params.toString()}`);
  }

  function handleStepJump(newStep: number) {
    setStep(newStep);
    // useEffect에서 자동으로 스크롤 처리됨
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <main ref={mainRef} className="space-y-4 animate-in slide-in-from-right duration-500">
      <Progress value={progress} />
      
      <div className="flex items-center justify-between">
        <StepHeader title={STEPS[step].title} step={step+1} total={STEPS.length}/>
        <StepperDots total={STEPS.length} current={step} onJump={handleStepJump} />
      </div>

      <ul className="space-y-3">
        {current.map((q, index)=>(
          <div 
            key={q.id}
            className="animate-in slide-in-from-bottom duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <QuestionCard
              id={q.id}
              text={q.text}
              value={answers[q.id]}
              onChange={(v)=>setAnswer(q.id, v)}
            />
          </div>
        ))}
      </ul>

      <Button 
        onClick={next} 
        className="w-full transition-all duration-300 hover:scale-[1.02]"
        disabled={current.some(q => !answers[q.id])}
      >
        {step < STEPS.length - 1 ? "다음 단계 →" : "🎯 결과 확인하기"}
      </Button>

      <p className="text-center text-xs text-muted/80">
        📱 PC에서도 모바일 프레임(420px)로 동일 표시
      </p>
    </main>
  );
}

function TestLoadingFallback() {
  return (
    <main className="space-y-4">
      <div className="h-2 w-full bg-border rounded-full overflow-hidden">
        <div className="h-full bg-brand animate-pulse" style={{ width: "0%" }} />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="w-32 h-6 bg-border rounded animate-pulse"></div>
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 bg-border rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-surface p-4 animate-pulse">
            <div className="w-3/4 h-4 bg-border rounded mb-3"></div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="h-10 bg-border rounded-lg"></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-11 bg-border rounded-xl animate-pulse"></div>
    </main>
  );
}

export default function TestPage() {
  return (
    <Suspense fallback={<TestLoadingFallback />}>
      <TestContent />
    </Suspense>
  );
}