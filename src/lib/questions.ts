export type Q = { id: number; text: string; weight: number }; // T: +, E: -

export const QUESTIONS: Q[] = [
  { id: 1, text: "새로운 모임에서 먼저 말문을 연다.", weight: +2 },
  { id: 2, text: "갈등이 생기면 분위기를 부드럽게 만든다.", weight: -2 },
  { id: 3, text: "토론에서 내 주장을 밀어붙이는 편이다.", weight: +2 },
  { id: 4, text: "팀에서 중재·조율을 자주 맡는다.", weight: -2 },
  { id: 5, text: "리스크가 있어도 추진이 중요하다.", weight: +1 },
  { id: 6, text: "모두가 편하면 조금 느려도 괜찮다.", weight: -1 },
  { id: 7, text: "결정은 빠르게, 실행하며 보정한다.", weight: +2 },
  { id: 8, text: "결정 전 주변 의견을 충분히 모은다.", weight: -2 },
  { id: 9, text: "문제는 정면 돌파가 최선이다.", weight: +2 },
  { id:10, text: "감정을 상하게 하지 않는 게 더 중요하다.", weight: -2 },
  { id:11, text: "애매하면 일단 시도부터 한다.", weight: +1 },
  { id:12, text: "충분히 안전장치를 확인한다.", weight: -1 },
  { id:13, text: "강렬·스포티한 스타일을 선호한다.", weight: +1 },
  { id:14, text: "부드럽고 단정한 인상을 선호한다.", weight: -1 },
  { id:15, text: "운동/경쟁 콘텐츠에 끌린다.", weight: +1 },
  { id:16, text: "힐링/감성 콘텐츠에 끌린다.", weight: -1 },
  { id:17, text: "퍼포먼스가 디자인보다 중요하다.", weight: +1 },
  { id:18, text: "조화·분위기가 스펙보다 중요하다.", weight: -1 },
  { id:19, text: "리드하는 파트너가 좋다(내가 리드면 중립).", weight: +1 },
  { id:20, text: "다정하고 섬세한 표현에 약하다.", weight: -1 },
  { id:21, text: "문제는 솔직·직설이 최선이다.", weight: +2 },
  { id:22, text: "돌려 말해도 상처 적으면 좋다.", weight: -2 },
  { id:23, text: "즉흥 데이트·여행이 좋다.", weight: +1 },
  { id:24, text: "계획적인 루틴 데이트 선호.", weight: -1 },
];

export const STEPS = [
  { title: "사회적 에너지", range: [1,6] },
  { title: "의사결정/갈등", range: [7,12] },
  { title: "라이프스타일", range: [13,18] },
  { title: "연애/관계", range: [19,24] },
];