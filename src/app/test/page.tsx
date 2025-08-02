"use client";
import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { QUESTIONS, STEPS } from "@/lib/questions";
import { computeScores } from "@/lib/scoring";
import Progress from "@/components/ui/Progress";
import StepHeader from "@/components/StepHeader";
import StepperDots from "@/components/StepperDots";
import Button from "@/components/ui/Button";
import LoadingScreen from "@/components/LoadingScreen";
import { QuestionCard } from "@/components/templates/QuestionCard";

export default function TestPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const gender = (sp.get("g") ?? "") as ""|"남"|"녀";
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  const current = useMemo(()=>{
    const { range } = STEPS[step];
    return QUESTIONS.filter(q => q.id >= range[0] && q.id <= range[1]);
  }, [step]);

  function setAnswer(id: number, v: number) {
    setAnswers(a => ({ ...a, [id]: v }));
  }

  const progress = Math.round((Object.keys(answers).length / QUESTIONS.length) * 100);

  function next() {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      // 다음 단계로 넘어갈 때 화면 상단으로 부드럽게 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    // 스텝 점프 시에도 화면 상단으로 부드럽게 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <main className="space-y-4 animate-in slide-in-from-right duration-500">
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