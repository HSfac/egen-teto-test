"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { resultLabel, compatibility, tips } from "@/lib/scoring";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Link from "next/link";

function ResultContent() {
  const sp = useSearchParams();
  const gender = (sp.get("g") ?? "") as ""|"남"|"녀";
  const energy = (sp.get("e") ?? "밸런스") as "테토"|"에겐"|"밸런스";
  const delta = Number(sp.get("d") ?? 0);
  const strength = sp.get("s") ?? "S";
  const [showConfetti, setShowConfetti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isCompatibilityModalOpen, setIsCompatibilityModalOpen] = useState(false);

  const label = resultLabel(energy, gender);
  const comp = compatibility(energy);
  const t = tips(energy);

  const shareUrl = typeof window !== "undefined" ? window.location.origin + `/result?${sp.toString()}` : "";

  // 결과 공개 애니메이션
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // 에겐 점수에 따른 핑크색 농도 계산 (에겐 타입일 때만)
  const getPinkIntensity = () => {
    if (energy !== "에겐") return "";
    const intensity = Math.abs(delta);
    if (intensity >= 12) return "from-pink-500/30 to-pink-600/20"; // 강한 핑크
    if (intensity >= 8) return "from-pink-400/25 to-pink-500/15";   // 중간 핑크
    return "from-pink-300/20 to-pink-400/10";                      // 연한 핑크
  };

  // 에너지 타입별 이모지와 색상
  const energyConfig = {
    테토: { 
      emoji: "💪", 
      gradient: "from-danger/20 to-danger/5", 
      textColor: "text-danger",
      bgGradient: "from-red-500/10 to-orange-500/5"
    },
    에겐: { 
      emoji: "🧘‍♂️", 
      gradient: getPinkIntensity() || "from-pink-300/20 to-pink-400/10", 
      textColor: "text-pink-400",
      bgGradient: getPinkIntensity() || "from-pink-300/10 to-pink-400/5"
    },
    밸런스: { 
      emoji: "⚖️", 
      gradient: "from-success/20 to-success/5", 
      textColor: "text-success",
      bgGradient: "from-green-500/10 to-blue-500/5"
    },
  };

  const config = energyConfig[energy];

  // 유형별 상세 설명
  const detailDescriptions = {
    테토: {
      title: "테토 타입 완전 분석 💪",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-white mb-2">🔥 테토 에너지란?</h3>
            <p className="text-sm leading-relaxed">
              테스토스테론 에너지에서 유래된 성향으로, <strong>주도적이고 직설적인 성격</strong>을 의미합니다. 
              목표 지향적이며 빠른 의사결정을 선호하는 타입이에요.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">💼 직장에서의 테토</h3>
            <p className="text-sm leading-relaxed">
              • 리더십 역할을 자연스럽게 맡음<br/>
              • 빠른 결정과 실행력으로 성과 창출<br/>
              • 직설적 소통으로 효율성 추구<br/>
              • 경쟁적 환경에서 더욱 빛남
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">💕 연애에서의 테토</h3>
            <p className="text-sm leading-relaxed">
              • 적극적이고 주도적인 어프로치<br/>
              • 솔직한 감정 표현을 선호<br/>
              • 계획보다는 즉흥성을 좋아함<br/>
              • 상대방을 리드하는 것을 선호
            </p>
          </div>
        </div>
      )
    },
    에겐: {
      title: "에겐 타입 완전 분석 🧘‍♂️",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-white mb-2">🌸 에겐 에너지란?</h3>
            <p className="text-sm leading-relaxed">
              에스트로겐 에너지에서 유래된 성향으로, <strong>공감적이고 조화로운 성격</strong>을 의미합니다. 
              관계 중심적이며 신중한 의사결정을 선호하는 타입이에요.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">💼 직장에서의 에겐</h3>
            <p className="text-sm leading-relaxed">
              • 팀 화합과 조율 능력이 뛰어남<br/>
              • 신중한 분석 후 결정을 내림<br/>
              • 감정적 지지와 배려심이 강함<br/>
              • 협력적 환경에서 최고 성과 발휘
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">💕 연애에서의 에겐</h3>
            <p className="text-sm leading-relaxed">
              • 세심하고 배려깊은 애정 표현<br/>
              • 상대방의 감정에 민감하게 반응<br/>
              • 안정적이고 계획적인 관계 선호<br/>
              • 깊은 감정적 교감을 중시
            </p>
          </div>
        </div>
      )
    },
    밸런스: {
      title: "밸런스 타입 완전 분석 ⚖️",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-white mb-2">🌟 밸런스 에너지란?</h3>
            <p className="text-sm leading-relaxed">
              테토와 에겐 성향이 균형잡힌 타입으로, <strong>상황에 따라 유연하게 적응</strong>하는 성격입니다. 
              상황판단력이 뛰어나며 중간자 역할을 잘 해내는 타입이에요.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">💼 직장에서의 밸런스</h3>
            <p className="text-sm leading-relaxed">
              • 상황에 맞는 리더십과 팔로워십 발휘<br/>
              • 다양한 의견을 조율하는 능력<br/>
              • 팀의 완충 역할을 자연스럽게 수행<br/>
              • 변화하는 환경에 빠르게 적응
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">💕 연애에서의 밸런스</h3>
            <p className="text-sm leading-relaxed">
              • 상대방의 성향에 맞춰 유연하게 대응<br/>
              • 때로는 주도하고 때로는 따라가는 밸런스<br/>
              • 갈등 상황에서 중재 역할을 잘함<br/>
              • 안정적이면서도 역동적인 관계 추구
            </p>
          </div>
        </div>
      )
    }
  };

  // 궁합 상세 설명
  const compatibilityDetails = {
    테토: {
      title: "테토 타입의 궁합 분석 💕",
      matches: [
        {
          type: "에겐 중~강",
          reason: "완벽한 상호보완",
          details: {
            why: "테토의 직설적 추진력과 에겐의 공감적 조화력이 만나 균형잡힌 관계를 형성합니다.",
            love: "• 테토가 리드하고 에겐이 서포트하는 자연스러운 역할 분담\n• 갈등 시 테토의 솔직함과 에겐의 중재력으로 빠른 해결\n• 서로 다른 강점으로 시너지 효과 극대화",
            work: "• 프로젝트 추진(테토) + 팀 케어(에겐) = 완벽한 팀워크\n• 의사결정 속도와 신중함의 조화\n• 리더십과 팔로워십의 이상적 조합",
            tips: "🎯 관계 발전 팁:\n• 테토: 에겐의 감정을 충분히 배려하고 들어주기\n• 에겐: 테토의 직설적 표현을 개인적으로 받아들이지 않기\n• 둘 다: 서로의 다른 속도를 인정하고 맞춰가기"
          }
        },
        {
          type: "밸런스",
          reason: "유연한 적응력",
          details: {
            why: "밸런스 타입의 상황적응력이 테토의 강한 성향을 부드럽게 받아주며 조화를 이룹니다.",
            love: "• 밸런스가 테토의 기분과 상황에 맞춰 유연하게 대응\n• 때로는 함께 추진하고, 때로는 브레이크 역할\n• 테토의 일방적 리드를 자연스럽게 균형화",
            work: "• 밸런스의 중재 능력으로 테토의 강한 추진력을 팀에 잘 전달\n• 상황에 따라 서포터와 파트너 역할을 자유롭게 전환\n• 테토의 결정을 다각도로 검토하여 완성도 향상",
            tips: "🎯 관계 발전 팁:\n• 테토: 밸런스의 의견을 적극적으로 들어보기\n• 밸런스: 테토의 열정에 함께 참여하되 과도할 때는 조절해주기\n• 둘 다: 역할이 고정되지 않도록 상황에 따라 주도권 나누기"
          }
        }
      ]
    },
    에겐: {
      title: "에겐 타입의 궁합 분석 💕",
      matches: [
        {
          type: "테토 중",
          reason: "이상적인 균형",
          details: {
            why: "적당한 추진력을 가진 테토와 에겐의 조화력이 만나 안정적이면서도 역동적인 관계를 형성합니다.",
            love: "• 테토의 리드십과 에겐의 공감력으로 서로 성장하는 관계\n• 감정적 안정감과 적절한 자극의 조화\n• 깊은 소통과 이해를 바탕으로 한 신뢰 관계",
            work: "• 에겐의 신중함과 테토의 실행력으로 완성도 높은 결과\n• 팀 분위기 조성(에겐) + 목표 달성(테토)\n• 갈등 상황에서 서로 다른 접근법으로 해결",
            tips: "🎯 관계 발전 팁:\n• 에겐: 테토의 직진성을 응원하고 서포트하기\n• 테토: 에겐의 세심함과 배려를 인정하고 감사 표현하기\n• 둘 다: 서로의 속도 차이를 이해하고 맞춰가기"
          }
        },
        {
          type: "밸런스",
          reason: "포용과 이해",
          details: {
            why: "밸런스의 상황 적응력과 에겐의 공감 능력이 만나 서로를 깊이 이해하는 관계를 만듭니다.",
            love: "• 서로의 감정과 상황을 세심하게 배려하는 관계\n• 갈등을 피하고 평화로운 분위기 유지\n• 깊은 정서적 교감과 안정감",
            work: "• 팀 화합과 협력을 최우선으로 하는 업무 스타일\n• 구성원들의 의견을 골고루 수렴하여 결정\n• 스트레스 상황에서도 서로 격려하며 극복",
            tips: "🎯 관계 발전 팁:\n• 에겐: 밸런스의 다양한 면을 이해하고 지지하기\n• 밸런스: 에겐의 일관된 가치관을 존중하기\n• 둘 다: 때로는 더 적극적인 도전도 함께 시도해보기"
          }
        }
      ]
    },
    밸런스: {
      title: "밸런스 타입의 궁합 분석 💕",
      matches: [
        {
          type: "테토",
          reason: "동적 균형",
          details: {
            why: "밸런스의 유연성이 테토의 강한 에너지를 받아주며, 상황에 따라 역할을 조정하는 역동적 관계입니다.",
            love: "• 밸런스가 테토의 에너지 레벨에 맞춰 적응\n• 테토의 직진성을 부드럽게 조절하며 관계 안정화\n• 예측 불가능한 재미와 안정감의 조화",
            work: "• 테토의 추진력 + 밸런스의 조율 능력 = 완벽한 팀워크\n• 상황에 따라 리더와 서포터 역할을 유연하게 교체\n• 다양한 관점으로 문제를 해결하는 시너지",
            tips: "🎯 관계 발전 팁:\n• 밸런스: 테토의 열정에 함께 참여하되 과도할 때는 조절\n• 테토: 밸런스의 다면적 특성을 이해하고 존중\n• 둘 다: 역할을 고정하지 말고 상황에 따라 유연하게"
          }
        },
        {
          type: "에겐",
          reason: "조화로운 안정",
          details: {
            why: "밸런스의 적응력과 에겐의 일관성이 만나 서로를 이해하고 지지하는 안정적인 관계를 형성합니다.",
            love: "• 서로의 감정과 필요를 깊이 이해하는 관계\n• 갈등보다는 대화와 타협을 통한 문제 해결\n• 편안하고 안정적인 일상 속의 소소한 행복",
            work: "• 팀워크와 협력을 중시하는 업무 환경 조성\n• 구성원들의 의견을 균형있게 수렴하는 의사결정\n• 스트레스 상황에서도 서로 격려하며 극복",
            tips: "🎯 관계 발전 팁:\n• 밸런스: 에겐의 일관된 가치관을 존중하고 지지\n• 에겐: 밸런스의 변화하는 모습을 자연스럽게 받아들이기\n• 둘 다: 가끔은 새로운 도전과 변화도 함께 시도하기"
          }
        }
      ]
    }
  };

  return (
    <main className="space-y-6 animate-in fade-in duration-700">
      {/* 컨페티 효과 */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {["🎉", "✨", "🎊", "⭐"][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      )}

      {/* 결과 헤더 */}
      <div className="text-center space-y-4 animate-in slide-in-from-top duration-500">
        <div 
          className={`inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm bg-gradient-to-r ${config.gradient} cursor-pointer hover:scale-105 transition-transform duration-200`}
          onClick={() => setIsScoreModalOpen(true)}
        >
          <span>강도 {strength}</span>
          <span>Δ {delta >= 0 ? "+" : ""}{delta}</span>
          {energy === "에겐" && Math.abs(delta) >= 8 && (
            <span className="text-pink-300">🌸</span>
          )}
          <span className="text-xs opacity-80 ml-1">ℹ️</span>
        </div>
        
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${config.bgGradient} blur-2xl`}></div>
          <div className="relative space-y-2">
            <div className="text-4xl animate-bounce">{config.emoji}</div>
            <h1 className={`text-3xl font-bold ${config.textColor} animate-in zoom-in duration-700`}>
              {label}
            </h1>
            <p className="text-muted/80 text-sm">
              {energy==="테토" ? "주도·직설·추진 에너지" :
               energy==="에겐" ? "공감·조화·안정 에너지" :
               "문맥 따라 전환하는 균형 에너지"}
            </p>
            <p className="text-xs text-muted/60">
              💡 위 점수 배지를 클릭하면 자세한 분석을 볼 수 있어요
            </p>
          </div>
        </div>
      </div>

      {/* 키워드 섹션 */}
      <section className="space-y-3 animate-in slide-in-from-left duration-500 delay-200">
        <h2 className="font-semibold flex items-center gap-2">
          <span className="text-lg">🏷️</span> 키워드
        </h2>
        <div className="flex flex-wrap gap-2">
          {energy==="테토" && ["결단","직설","리드","실행","돌파"].map((k, i)=>
            <div key={k} className="animate-in slide-in-from-bottom duration-300" style={{animationDelay: `${i * 100 + 400}ms`}}>
              <Badge>{k}</Badge>
            </div>
          )}
          {energy==="에겐" && ["공감","중재","조화","안정","분위기"].map((k, i)=>
            <div key={k} className="animate-in slide-in-from-bottom duration-300" style={{animationDelay: `${i * 100 + 400}ms`}}>
              <Badge>{k}</Badge>
            </div>
          )}
          {energy==="밸런스" && ["유연","상황판단","스위치","팀워크","균형"].map((k, i)=>
            <div key={k} className="animate-in slide-in-from-bottom duration-300" style={{animationDelay: `${i * 100 + 400}ms`}}>
              <Badge>{k}</Badge>
            </div>
          )}
        </div>
      </section>

      {/* 강점 */}
      <section className="space-y-3 animate-in slide-in-from-right duration-500 delay-300">
        <h2 className="font-semibold flex items-center gap-2">
          <span className="text-lg">💪</span> 강점
        </h2>
        <Card className="p-4 hover:shadow-soft transition-shadow duration-300">
          <ul className="space-y-2">
            {t.strengths.map((s, i) => (
              <li key={s} className={`flex items-center gap-2 text-sm text-muted animate-in slide-in-from-left duration-300`} style={{animationDelay: `${i * 100 + 600}ms`}}>
                <span className="text-success">✓</span> {s}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* 주의 포인트 */}
      <section className="space-y-3 animate-in slide-in-from-left duration-500 delay-400">
        <h2 className="font-semibold flex items-center gap-2">
          <span className="text-lg">⚠️</span> 주의 포인트
        </h2>
        <Card className="p-4 hover:shadow-soft transition-shadow duration-300">
          <ul className="space-y-2">
            {t.watch.map((s, i) => (
              <li key={s} className={`flex items-center gap-2 text-sm text-muted animate-in slide-in-from-left duration-300`} style={{animationDelay: `${i * 100 + 700}ms`}}>
                <span className="text-warning">!</span> {s}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* 연애 팁 */}
      <section className="space-y-3 animate-in slide-in-from-right duration-500 delay-500">
        <h2 className="font-semibold flex items-center gap-2">
          <span className="text-lg">💕</span> 연애 팁
        </h2>
        <Card className="p-4 hover:shadow-soft transition-shadow duration-300">
          <ul className="space-y-2">
            {t.date.map((s, i) => (
              <li key={s} className={`flex items-center gap-2 text-sm text-muted animate-in slide-in-from-left duration-300`} style={{animationDelay: `${i * 100 + 800}ms`}}>
                <span className="text-brand">💡</span> {s}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* 궁합 */}
      <section className="space-y-3 animate-in slide-in-from-bottom duration-500 delay-600">
        <h2 className="font-semibold flex items-center gap-2">
          <span className="text-lg">💫</span> 잘 맞는 유형
          <button 
            onClick={() => setIsCompatibilityModalOpen(true)}
            className="text-xs text-muted hover:text-white transition-colors duration-200 ml-auto"
          >
            자세히 보기 →
          </button>
        </h2>
        <Card className="p-4 hover:shadow-soft transition-shadow duration-300 cursor-pointer" onClick={() => setIsCompatibilityModalOpen(true)}>
          <div className="flex gap-2 mb-2">
            {comp.map((c, i) => (
              <div key={c} className="animate-in zoom-in duration-300" style={{animationDelay: `${i * 150 + 900}ms`}}>
                <Badge>{c}</Badge>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted/70 text-center">
            💡 클릭하면 상세한 궁합 분석을 볼 수 있어요
          </p>
        </Card>
      </section>

      {/* 상세 분석 버튼 */}
      <div className="animate-in slide-in-from-bottom duration-500 delay-650">
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="secondary"
          className="w-full h-12 bg-gradient-to-r from-surface to-surface/80 border-2 border-border hover:border-white/30 transition-all duration-300"
        >
          <span className="text-lg mr-2">📊</span>
          <span className="font-semibold">{energy} 타입 완전 분석 보기</span>
        </Button>
      </div>

      {/* 액션 버튼들 */}
      <div className="space-y-4 animate-in slide-in-from-bottom duration-500 delay-700">
        {/* 메인 공유 버튼 */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-brand to-purple-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <Button
            onClick={async ()=>{
              if (navigator.share) {
                await navigator.share({ title: "에겐/테토 결과", url: shareUrl });
              } else {
                await navigator.clipboard.writeText(shareUrl);
                alert("링크를 복사했어요! 🎉");
              }
            }}
            className="relative w-full h-14 bg-gradient-to-r from-brand via-pink-500 to-purple-500 hover:from-pink-500 hover:via-brand hover:to-cyan-500 text-white font-bold text-lg shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(46,116,255,0.6)]"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl animate-bounce">🚀</span>
              <span>결과 공유하기</span>
              <span className="text-2xl animate-pulse">✨</span>
            </div>
          </Button>
        </div>

        {/* 서브 액션들 */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={async ()=>{
              await navigator.clipboard.writeText(shareUrl);
              alert("링크를 복사했어요! 📋");
            }}
            variant="secondary"
            className="h-11 bg-surface/80 hover:bg-surface border border-border hover:border-white/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <span className="mr-2">📋</span>
            링크 복사
          </Button>
          
          <Link 
            href="/" 
            className="h-11 bg-surface/80 hover:bg-surface border border-border hover:border-white/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-[1.02] text-white hover:text-white"
          >
            <span className="mr-2">🔄</span>
            다시 하기
          </Link>
        </div>

        {/* 추가 공유 옵션 */}
        <div className="text-center space-y-2">
          <p className="text-xs text-muted/80">🎯 친구들과 함께 테스트해보세요!</p>
          <div className="flex justify-center gap-4 text-2xl">
            <span className="animate-bounce" style={{animationDelay: '0s'}}>💕</span>
            <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🔥</span>
            <span className="animate-bounce" style={{animationDelay: '0.4s'}}>⚡</span>
          </div>
        </div>
      </div>

      {/* 상세 설명 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={detailDescriptions[energy].title}
      >
        {detailDescriptions[energy].content}
      </Modal>

      {/* 점수 설명 모달 */}
      <Modal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        title="📊 점수 분석 가이드"
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              💪 강도 등급 (S/M/L)
            </h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between items-center">
                <span>🟢 <strong>S (약함)</strong></span>
                <span className="text-muted">|Δ| &lt; 8</span>
              </div>
              <div className="flex justify-between items-center">
                <span>🟡 <strong>M (중간)</strong></span>
                <span className="text-muted">8 ≤ |Δ| &lt; 12</span>
              </div>
              <div className="flex justify-between items-center">
                <span>🔴 <strong>L (강함)</strong></span>
                <span className="text-muted">|Δ| ≥ 12</span>
              </div>
            </div>
            <p className="text-xs text-muted mt-2">
              강도가 높을수록 해당 성향이 더 뚜렷하게 나타납니다.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              📈 델타(Δ) 값의 의미
            </h3>
            <div className="text-sm space-y-2">
              <p><strong>Δ = T점수 - E점수</strong></p>
              <div className="space-y-1">
                <div>• <span className="text-danger">+6 이상</span>: 테토 성향</div>
                <div>• <span className="text-success">-6 ~ +6</span>: 밸런스</div>
                <div>• <span className="text-brand">-6 이하</span>: 에겐 성향</div>
              </div>
            </div>
            <p className="text-xs text-muted mt-2">
              현재 회원님의 델타 값: <strong className={config.textColor}>
                {delta >= 0 ? "+" : ""}{delta}
              </strong>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              🧮 점수 계산 방식
            </h3>
            <div className="text-sm space-y-2">
              <p>24개 문항에 대한 1~5점 응답을 바탕으로:</p>
              <div className="bg-surface/50 p-3 rounded-lg space-y-1">
                <div>1. 각 문항은 T(테토) 또는 E(에겐) 가중치 보유</div>
                <div>2. 응답값에서 중립(3점) 차감 후 가중치 적용</div>
                <div>3. T총점 - E총점 = 델타(Δ) 계산</div>
                <div>4. 델타 절댓값으로 강도 등급 결정</div>
              </div>
            </div>
          </div>

          <div className="bg-brand/10 p-3 rounded-lg">
            <p className="text-xs text-center">
              💡 이 점수는 자기이해를 위한 도구이며, 절대적 기준이 아닙니다.
            </p>
          </div>
        </div>
      </Modal>

      {/* 궁합 분석 모달 */}
      <Modal
        isOpen={isCompatibilityModalOpen}
        onClose={() => setIsCompatibilityModalOpen(false)}
        title={compatibilityDetails[energy].title}
      >
        <div className="space-y-6">
          {compatibilityDetails[energy].matches.map((match, index) => (
            <div key={match.type} className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <span className="text-lg">💕</span>
                <h3 className="font-semibold text-white">{match.type}</h3>
                <span className="text-xs text-muted ml-auto">{match.reason}</span>
              </div>
              
              <div className="text-sm space-y-3">
                <div>
                  <h4 className="font-medium text-white mb-1">🤝 왜 잘 맞는가?</h4>
                  <p className="text-muted leading-relaxed">{match.details.why}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-1">💕 연애 관계</h4>
                  <div className="text-muted text-xs leading-relaxed whitespace-pre-line">
                    {match.details.love}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-1">💼 업무 관계</h4>
                  <div className="text-muted text-xs leading-relaxed whitespace-pre-line">
                    {match.details.work}
                  </div>
                </div>
                
                <div className="bg-brand/10 p-3 rounded-lg">
                  <div className="text-xs leading-relaxed whitespace-pre-line">
                    {match.details.tips}
                  </div>
                </div>
              </div>
              
              {index < compatibilityDetails[energy].matches.length - 1 && (
                <div className="border-b border-border/30 pb-2"></div>
              )}
            </div>
          ))}
          
          <div className="bg-surface/50 p-3 rounded-lg text-center">
            <p className="text-xs text-muted">
              💡 궁합은 참고용이며, 개인의 노력과 이해가 더 중요해요!
            </p>
          </div>
        </div>
      </Modal>
    </main>
  );
}

function LoadingFallback() {
  return (
    <main className="space-y-6 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <div className="w-16 h-6 bg-border rounded-full mx-auto animate-pulse"></div>
        <div className="w-32 h-8 bg-border rounded-lg mx-auto animate-pulse"></div>
        <div className="w-24 h-4 bg-border rounded mx-auto animate-pulse"></div>
      </div>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-4 bg-surface rounded-xl animate-pulse">
          <div className="w-24 h-4 bg-border rounded mb-3"></div>
          <div className="space-y-2">
            <div className="w-full h-3 bg-border rounded"></div>
            <div className="w-3/4 h-3 bg-border rounded"></div>
          </div>
        </div>
      ))}
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultContent />
    </Suspense>
  );
}