## 2026-05-08 Sprint 0

### 목표
- Sprint 0-A: 수집형 엔진 기반 구축
- 커피 샘플 카드 8장/기본 캡슐 설정 기반으로 캡슐 1회 오픈 → 신규/중복 판정 → 로컬 저장 → 수집률/점수 표시가 동작하도록 연결
- Sprint 0-B: 테마 선택 화면(/)과 커피 테마 홈(/theme/coffee) UX 정리

### 변경 파일
- src/lib/collection/types.ts
- src/data/themes/coffee/coffeeCards.ts
- src/data/themes/coffee/coffeeCategories.ts
- src/data/themes/coffee/coffeeCapsules.ts
- src/lib/capsule/dropRates.ts
- src/lib/capsule/rollCapsule.ts
- src/lib/capsule/duplicateRewards.ts
- src/lib/capsule/openCapsuleEngine.ts
- src/lib/collection/ownership.ts
- src/lib/collection/progress.ts
- src/lib/collection/scoring.ts
- src/lib/collection/applyRewards.ts
- src/lib/storage/localCollectionStore.ts
- src/components/cards/CollectionCard.tsx
- src/components/collection/CollectionProgress.tsx
- src/components/capsule/CapsuleOpenButton.tsx
- src/components/capsule/CapsuleResultModal.tsx
- src/app/page.tsx
- src/app/theme/[themeId]/page.tsx

### 구현 내용
- Sprint 0-A 요구 타입 정의 및 로컬 저장 포맷(v1) 확정
- 커피 샘플 카드 8장/카테고리 1개/커피 캡슐 2종(기본/광고 보너스) 데이터 추가
- 등급 확률 기반 캡슐 롤(순수 함수) + 신규/중복 판정 + 중복 보상 계산 로직 연결
- 수집률/컬렉션 점수 계산 및 메인 화면 최소 UI에서 결과 모달로 확인
- 로컬스토리지 저장으로 새로고침 후 보유 상태 유지
- 메인 화면을 테마 허브로 정리(커피 컬렉션 카드 + 입장하기, deltaNova/darkRpg Coming Soon)
- 커피 테마 홈 화면 추가(/theme/coffee): 수집률/점수/재화/광고 캡슐(mock)/도감 버튼(Coming Soon) + 기본 캡슐 열기 CTA
- 대표 카드 영역은 placeholder로 준비하고, 보유 카드가 있으면 최근 획득 기준으로 임시 대표/최근 획득 프리뷰 제공
- Sprint 1: 캡슐 결과 모달 정보 강화(카테고리/설명/신규·중복/중복보상/보유수량/별 등급/다음 별까지) 및 등급별 톤 적용
- 중복일 때 “광고 보고 보상 2배” 버튼은 자리만 제공(비활성)하고 Sprint 6에서 mock 고도화 예정
- Sprint 2: 커피 도감(/collection/coffee) 추가, 카테고리별 그룹 표시 및 획득/미획득 카드 구분
- 카드 클릭 시 상세 모달 제공(획득/미획득 상태별 메시지/정보) 및 커피 홈에서 도감 진입 버튼 활성화
- Sprint 3: 커피 카드 데이터를 80장/10카테고리 구조로 확장하고, 데이터 검증 유틸(80장/10카테고리/카테고리별 8장/id 중복/rarity/themeId)을 추가
- Sprint 4: 도감 잠금 카드 표현 강화(잠금 아이콘/등급 힌트/Legendary 잠금 톤), NEW 배지(최근 획득 기준), 카테고리 완성 UI(“완성!/보상 준비 중”)
- 카드 상세 모달에서 대표 카드 설정(UserThemeState.representativeCardId) 가능, 메인/커피 홈에서 대표 카드 표시
- Sprint 5: 캡슐 오픈 시퀀스(대기→흔들림→빛→카드 등장→뒤집기→결과) 및 등급별 결과 체감이 보이도록 애니메이션 스테이지 추가(CSS transition/transform 기반)
- Sprint 6: mock 광고(1초 로딩) 추가 및 광고 보너스 캡슐 오픈/중복 보상 2배 지급 흐름 구현 + 일일 제한/날짜 변경 시 카운트 초기화 적용

### 테스트 결과
- (로컬) npm run dev 기준으로 메인 화면에서 캡슐 오픈/결과 모달/새로고침 유지 확인 가능
- (CI) npm run lint / npm run build는 Sprint 0-A 완료 시점에 확인
- (로컬) / → /theme/coffee 진입 및 모바일 세로 레이아웃 확인 가능
- (로컬) 중복 카드 발생 시: 중복 보상/보유 수량/별 등급/다음 별까지 표시 및 한 번 더 열기 동작 확인
- (로컬) /collection/coffee 진입 → 카테고리 섹션/그리드 표시 → 카드 클릭 시 상세 모달 동작 확인
- (CI) npm run lint / npm run build 통과 (80장 데이터 확장 후)
- (로컬) 도감에서 NEW 배지 표시/대표 카드 설정 후 메인·커피 홈에 반영/카테고리 완성 상태 표시 확인
- (CI) npm run lint / npm run build 통과 (애니메이션 스테이지 추가 후)
- (CI) npm run lint / npm run build 통과 (광고 mock/일일 제한 추가 후)

### 이슈
- Tailwind v4에서 일부 class 네이밍에 대한 경고가 있을 수 있으나 동작에는 영향 없음

### 다음 작업
- Sprint 7: 카드 이미지 적용(경로 규칙/placeholder/fallback 통합)

---

## 2026-05-08 Sprint 7

### 목표
- 커피 카드 이미지 경로 규칙 적용: `public/assets/cards/coffee/final/{beverageId}.png`
- 우선 적용 카드 8종(americano/espresso/latte/cappuccino/vanilla_latte/caramel_latte/mocha/affogato) 실제 이미지 표시
- 이미지 없음/로딩 실패 시 등급 기반 placeholder로 안정적 fallback(도감/결과/홈 공통)

### 변경 파일
- src/components/cards/CardImage.tsx
- src/components/cards/CollectionCard.tsx
- src/components/cards/CollectionCardGridItem.tsx
- src/components/capsule/CapsuleResultModal.tsx
- src/components/collection/CardDetailModal.tsx
- docs/SPRINT_LOG.md

### 구현 내용
- 공통 이미지 컴포넌트 `CardImage` 추가
  - `card.imagePath`가 없거나 로딩 실패(onError) 시 **등급 기반 SVG placeholder(data URI)**로 fallback
  - 미획득 카드(locked)는 “???? / 미획득” placeholder로 표시
  - `next/image`로 표시하여 모바일에서 비율/레이아웃이 깨지지 않도록 `fill + object-cover` 적용
- 기존 카드 UI(`CollectionCard`, `CollectionCardGridItem`, 결과/상세 모달)에서 이미지 영역을 `CardImage`로 통일
- 실제 파일명 이슈(한글 파일명) 대응
  - `final/` 내 한글 파일을 Sprint 7 규칙의 영문 파일명(예: `americano.png`)으로 **복사**하여 경로 규칙을 만족
  - 원본 한글 파일은 유지

### 테스트 결과
- (로컬) `npm run lint` 통과
- (로컬) `npm run build` 통과
- (로컬) 도감/결과/홈에서 이미지가 존재하는 카드(우선 8종)는 실제 이미지 표시, 그 외는 placeholder fallback 표시 확인 가능

### 이슈
- placeholder PNG 파일을 생성하지 않고, data URI SVG로 대체하여 “이미지 생성 작업” 없이도 안정적인 fallback을 우선 구현

### 다음 작업
- (선택) `public/assets/cards/coffee/placeholder/{rarity}.png`를 실제 에셋으로 준비하면 네트워크/콘솔 에러 없이도 동일 UX를 유지 가능
- (선택) 나머지 카드들도 `coffeeCards.ts`의 `imagePath` 규칙과 맞게 파일명(또는 매핑)을 정리하면 실제 이미지 적용 범위를 확장 가능

