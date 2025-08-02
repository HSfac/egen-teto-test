# 이미지 폴더 구조 안내

## 캐릭터 이미지 (`/public/images/characters/`)

다음 경로에 이미지를 추가하시면 자동으로 웹앱에 표시됩니다:

### 에겐 타입 이미지
- `egen-man.png` - 에겐남 캐릭터 (권장 크기: 200x200px)
- `egen-woman.png` - 에겐녀 캐릭터 (권장 크기: 200x200px)

### 테토 타입 이미지  
- `teto-man.png` - 테토남 캐릭터 (권장 크기: 200x200px)
- `teto-woman.png` - 테토녀 캐릭터 (권장 크기: 200x200px)

### 밸런스 타입 이미지
- `balance.png` - 밸런스 타입 캐릭터 (권장 크기: 200x200px)

## 로고/브랜딩 (`/public/images/logos/`)

- `logo.png` - 메인 로고 (권장 크기: 512x512px, 투명 배경)
- `favicon.png` - 파비콘용 (권장 크기: 256x256px)

## 이미지 사용 방법

```jsx
// 컴포넌트에서 사용 예시
import Image from "next/image";

<Image
  src="/images/characters/egen-man.png"
  alt="에겐남 캐릭터"
  width={200}
  height={200}
  className="rounded-full"
/>
```

## 이미지 최적화 팁

1. **포맷**: PNG (투명배경) 또는 WebP (압축률 우수)
2. **크기**: 너무 크지 않게 (200KB 이하 권장)
3. **해상도**: 레티나 디스플레이 대응을 위해 2x 크기로 제작
4. **네이밍**: 소문자, 하이픈(-) 사용 권장

## 이미지가 준비되면 자동 적용됩니다! 🎨