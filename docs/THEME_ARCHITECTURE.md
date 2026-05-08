# THEME ARCHITECTURE

이 문서는 `캡슐 컬렉터`의 **테마 확장 구조(themeId 기반)**를 정리한다.  
원문 기준: `docs/CAPSULE_COLLECTOR_MASTER_DESIGN.md`

---

## 목표

- 테마가 `coffee`로 시작해 `deltaNova`, `darkRpg` 등으로 **무리 없이 확장**되도록 구조/원칙을 명확히 한다.
- **테마 공통 시스템**과 **테마별 커스텀 요소**를 구분한다.
- 카드/카테고리/캡슐/유저 보유 상태의 **타입 구조(개념)**를 정리한다.
- 새 테마 추가 시 필요한 체크리스트를 제공한다.

---

## 1) themeId 기반 설계 원칙

- 모든 콘텐츠는 **반드시 `themeId`로 네임스페이스**가 분리된다.
- 카드/카테고리/캡슐 데이터는 **테마별 폴더로 분리**한다.
- 유저 보유 상태는 **원본 카드 데이터와 분리**한다.
- 뽑기/점수/중복/진행률 계산 로직은 UI와 분리된 **순수 함수**로 구성한다.
- v0.1 저장은 로컬스토리지 기반이며, 서버 저장은 v1 이후 단계에서 붙인다.

---

## 2) 테마가 추가되는 방식

### 2.1 테마의 단위

테마는 다음을 포함하는 “패키지”다.

- **theme metadata**: 테마 id, 이름, 설명, (선택) 커버/팔레트
- **categories**: 카테고리 목록(정렬/설명 포함)
- **cards**: 카드 목록(등급/카테고리/필드 규칙 포함)
- **capsules**: 캡슐 설정(드랍 확률/특수 조건/일일 제한 등)
- **placeholder assets**: 이미지가 없어도 UI가 깨지지 않게 하는 기본 자산(또는 규칙)
- **theme home skin**: 테마 홈 화면의 톤(색/키비주얼/문구)

### 2.2 예시: coffee / deltaNova / darkRpg

- `coffee`
  - Coffee 2048 음료 80종을 카드화한 첫 구현 테마
  - 초반 검증 범위(v0.1): 기본 캡슐 1회 오픈 + 도감 기반
- `deltaNova`
  - 함선/행성/지휘관/유물 등 SF 테마 카드군 확장
- `darkRpg`
  - 장비/몬스터/영웅/유물 등 RPG 테마 카드군 확장

---

## 3) 폴더 구조(권장)

```text
src/
├─ data/
│  └─ themes/
│     └─ <themeId>/
│        ├─ <themeId>Cards.ts
│        ├─ <themeId>Categories.ts
│        └─ <themeId>Capsules.ts
│
├─ lib/
│  ├─ collection/
│  │  ├─ types.ts
│  │  ├─ scoring.ts
│  │  ├─ ownership.ts
│  │  └─ progress.ts
│  ├─ capsule/
│  │  ├─ rollCapsule.ts
│  │  ├─ dropRates.ts
│  │  └─ duplicateRewards.ts
│  └─ storage/
│     └─ localCollectionStore.ts
│
├─ components/
│  ├─ cards/
│  ├─ capsule/
│  └─ collection/
│
└─ app/
   ├─ page.tsx
   └─ theme/[themeId]/page.tsx
```

---

## 4) 테마 공통 시스템 vs 테마별 커스텀 요소

### 4.1 테마 공통 시스템(모든 테마가 공유)

- 캡슐 오픈(뽑기) 로직
- 등급 구조(common/uncommon/rare/signature/legendary)
- 카드 보유 상태 저장/로드(로컬스토리지 v0.1)
- 도감 화면 구조(획득/미획득, 카테고리 그룹, 상세 모달)
- 수집률 계산
- 컬렉션 점수 계산
- 중복 보상 구조
- 광고 보상 mock(향후 실제 SDK로 교체 가능한 구조)
- 대표 카드 설정(향후 기능)

### 4.2 테마별 커스텀 가능 요소(테마마다 달라도 됨)

- 등급별 색상/프레임
- 캡슐 이미지/연출 톤
- 카드 프레임/배경/키비주얼
- 사운드
- 중복 재화 이름/종류(예: 커피 파우더)
- 카테고리명/설명
- 세트 보상/완성 보상(향후)
- 특수 캡슐(시간대/픽업/전설 등)

---

## 5) 타입 구조(개념 정리)

> 아래는 “구조/역할”을 정리한 개념이며, 실제 구현 타입은 `lib/collection/types.ts`를 기준으로 한다.

### 5.1 Theme

- `ThemeId`: `"coffee" | "deltaNova" | "darkRpg" | ...`
- `ThemeMetadata`: `id`, `nameKo`, `descriptionKo`, (선택) `coverImagePath`, `palette`, `isComingSoon`

### 5.2 Category

- `Category`: `id`, `themeId`, `titleKo`, (선택) `descriptionKo`, `sortOrder`

### 5.3 Card

- `Card`: `id`, `themeId`, `categoryId`, `nameKo`, `rarity`, (선택) `description`, `imagePath`, `silhouetteImagePath`, `timeLimited`, `sourceGame`

### 5.4 Capsule

- `Capsule`: `id`, `themeId`, `nameKo`, (선택) `descriptionKo`, `dropRates`, (선택) `targetCategoryId`, `dailyAdLimit`, `isPremium`

### 5.5 User Ownership / Save

- `UserThemeState`: 테마별 카드 보유/중복/재화/오픈 카운트 등
- `Local Save`: `version`, `themes`, `selectedThemeId`, `createdAt`, `updatedAt`

---

## 6) 새 테마 추가 체크리스트

### 필수(데이터/구조)

- [ ] `themeId` 결정(영문 camelCase 또는 소문자 규칙 고정)
- [ ] 테마 메타데이터 정의(이름/설명/노출 상태)
- [ ] 카테고리 목록 정의(정렬 포함)
- [ ] 카드 목록 정의(필드 규칙 준수)
- [ ] 캡슐 설정 정의(기본/광고/향후 확장 캡슐)
- [ ] 미획득 카드 표시 규칙(실루엣/잠금 처리)
- [ ] placeholder 자산(또는 색/프레임 규칙) 준비

### 권장(UX/확장)

- [ ] 테마 컬러 팔레트/톤 가이드
- [ ] 등급별 프레임/연출 차별화 기준
- [ ] 카테고리 완성 보상(기획만 v0.1, 실제 지급은 v0.2+)
- [ ] 시간대/이벤트/픽업 등 특수 캡슐 확장안

