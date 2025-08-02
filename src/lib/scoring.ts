import { Q } from "./questions";

export type GenderLabel = "남" | "녀" | "";

/** Likert 1~5 -> 중앙 3을 0으로: (v-3) */
export function computeScores(answers: Record<number, number>, questions: Q[]) {
  let T = 0, E = 0;
  for (const q of questions) {
    const v = (answers[q.id] ?? 3) - 3; // 미응답은 0
    if (q.weight > 0) T += v * q.weight;
    if (q.weight < 0) E += v * Math.abs(q.weight);
  }
  const delta = T - E;
  let energy: "테토" | "에겐" | "밸런스";
  if (delta >= 6) energy = "테토";
  else if (delta <= -6) energy = "에겐";
  else energy = "밸런스";

  // 강도 배지
  const strength = Math.abs(delta) >= 12 ? "L" : Math.abs(delta) >= 8 ? "M" : "S";
  return { T, E, delta, energy, strength };
}

export function resultLabel(energy: "테토"|"에겐"|"밸런스", gender: GenderLabel, strength: string, delta: number) {
  if (energy === "밸런스") {
    // 밸런스도 세분화
    if (Math.abs(delta) <= 2) return gender ? `완전밸런스${gender}` : "완전밸런스형";
    return gender ? `밸런스${gender}` : "밸런스형";
  }
  
  // 강도별 라벨 매핑
  const intensityLabels: Record<"테토"|"에겐", Record<string, string>> = {
    테토: {
      L: gender ? `극테토${gender}` : "극테토형",      // |Δ| ≥ 12
      M: gender ? `강테토${gender}` : "강테토형",      // 8 ≤ |Δ| < 12  
      S: gender ? `약테토${gender}` : "약테토형"       // |Δ| < 8
    },
    에겐: {
      L: gender ? `극에겐${gender}` : "극에겐형",      // |Δ| ≥ 12
      M: gender ? `강에겐${gender}` : "강에겐형",      // 8 ≤ |Δ| < 12
      S: gender ? `약에겐${gender}` : "약에겐형"       // |Δ| < 8
    }
  };
  
  return (intensityLabels[energy as "테토"|"에겐"])?.[strength] || `${energy}${gender || "형"}`;
}

export function compatibility(energy: "테토"|"에겐"|"밸런스") {
  if (energy === "테토") return ["에겐 중~강", "밸런스"];
  if (energy === "에겐") return ["테토 중", "밸런스"];
  return ["테토", "에겐"];
}

export function tips(energy: "테토"|"에겐"|"밸런스") {
  if (energy === "테토") {
    return {
      strengths: ["결단·실행", "직설 커뮤니케이션", "위기대응"],
      watch: ["감정케어 부족", "과속 의사결정", "양보 부족"],
      date: ["계획·예산 공유", "솔직하되 톤 다운", "상대 페이스 존중"],
    };
  }
  if (energy === "에겐") {
    return {
      strengths: ["공감·조율", "분위기 메이킹", "안정감"],
      watch: ["결정 지연", "직면 회피", "과도한 배려"],
      date: ["요구를 명확히 말하기", "마감·결정선 정하기", "감정 표현 구체화"],
    };
  }
  return {
    strengths: ["상황맞춤 전환", "팀 플레이", "균형감각"],
    watch: ["우유부단", "정체성 모호", "컨텍스트 피로"],
    date: ["역할 분담 합의", "상호 피드백 주기", "상황별 규칙 만들기"],
  };
}