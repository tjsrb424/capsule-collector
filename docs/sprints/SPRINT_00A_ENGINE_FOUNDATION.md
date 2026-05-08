# Sprint 0-A: 수집형 엔진 기반 구축

## 1. 목표

캡슐 컬렉터의 가장 기본이 되는 **수집형 엔진 기반**을 구축한다.

이번 스프린트는 화려한 UI나 애니메이션이 목적이 아니다.  
목표는 다음 구조가 안정적으로 동작하는 것이다.

```text
카드 데이터
→ 캡슐 설정
→ 캡슐 오픈
→ 신규/중복 판정
→ 유저 보유 상태 저장
→ 수집률/컬렉션 점수 계산
→ 최소 UI에서 결과 확인
```

---

## 2. 구현 범위

### 2.1 타입 정의

필요 타입을 정의한다.

파일:

```text
lib/collection/types.ts
```

필수 타입:

```ts
ThemeId
CardRarity
CollectionTheme
CollectionCategory
CollectionCard
UserCardState
UserThemeState
CapsuleConfig
CapsuleOpenResult
DuplicateReward
```

### 2.2 커피 샘플 카드 8장

파일:

```text
data/themes/coffee/coffeeCards.ts
data/themes/coffee/coffeeCategories.ts
```

샘플 카드:

| id | nameKo | rarity | categoryId | unlockLevel |
|---|---|---|---|---:|
| americano | 아메리카노 | common | espressoBasic | 1 |
| espresso | 에스프레소 | common | espressoBasic | 2 |
| doppio | 도피오 | common | espressoBasic | 3 |
| lungo | 룽고 | common | espressoBasic | 4 |
| ristretto | 리스트레토 | uncommon | espressoBasic | 6 |
| cafe_crema | 카페 크레마 | uncommon | espressoBasic | 7 |
| cold_brew | 콜드브루 | uncommon | espressoBasic | 9 |
| long_black | 롱 블랙 | uncommon | espressoBasic | 10 |

공통 필드:

```ts
themeId: "coffee"
categoryId: "espressoBasic"
categoryTitleKo: "에스프레소/기본 커피"
sourceGame: "coffee2048"
```

### 2.3 캡슐 설정

파일:

```text
data/themes/coffee/coffeeCapsules.ts
```

기본 커피 캡슐:

```ts
{
  id: "coffee_basic_capsule",
  themeId: "coffee",
  nameKo: "기본 커피 캡슐",
  dropRates: {
    common: 58,
    uncommon: 28,
    rare: 12,
    signature: 1.8,
    legendary: 0.2
  }
}
```

광고 보너스 커피 캡슐:

```ts
{
  id: "coffee_ad_bonus_capsule",
  themeId: "coffee",
  nameKo: "광고 보너스 커피 캡슐",
  dropRates: {
    common: 45,
    uncommon: 32,
    rare: 18,
    signature: 4.5,
    legendary: 0.5
  },
  dailyAdLimit: 10
}
```

### 2.4 캡슐 오픈 로직

파일:

```text
lib/capsule/rollCapsule.ts
lib/capsule/dropRates.ts
```

요구사항:

- 캡슐의 등급 확률을 기준으로 먼저 등급을 결정한다.
- 결정된 등급에 해당하는 카드 풀에서 랜덤 카드 1장을 선택한다.
- 해당 등급 카드가 없으면 인접 하위 등급 또는 전체 카드 풀에서 안전하게 fallback한다.
- UI에 종속되지 않는 순수 함수로 작성한다.

예상 함수:

```ts
rollRarity(dropRates)
rollCapsule(capsule, cards)
```

### 2.5 신규/중복 판정

파일:

```text
lib/collection/ownership.ts
```

요구사항:

- 유저가 해당 카드를 처음 얻으면 `isNew: true`
- 이미 보유한 카드면 `isNew: false`
- 보유 count 증가
- 최초 획득일/마지막 획득일 기록
- 중복이면 중복 보상 지급

### 2.6 중복 보상

파일:

```text
lib/capsule/duplicateRewards.ts
```

규칙:

| rarity | reward |
|---|---:|
| common | coffeePowder 5 |
| uncommon | coffeePowder 12 |
| rare | coffeePowder 35 |
| signature | signatureShard 1 |
| legendary | legendaryBeanShard 1 |

### 2.7 점수 계산

파일:

```text
lib/collection/scoring.ts
```

기본 점수:

| rarity | score |
|---|---:|
| common | 10 |
| uncommon | 25 |
| rare | 60 |
| signature | 150 |
| legendary | 400 |

별 등급 배율:

| star | multiplier |
|---|---:|
| 1 | 1.0 |
| 2 | 1.2 |
| 3 | 1.5 |
| 4 | 2.0 |
| 5 | 3.0 |

### 2.8 수집률 계산

파일:

```text
lib/collection/progress.ts
```

요구사항:

- 전체 카드 수
- 획득 카드 수
- 수집률 %
- 카테고리별 수집률 계산 가능하도록 설계

### 2.9 로컬스토리지 저장소

파일:

```text
lib/storage/localCollectionStore.ts
```

키:

```text
capsuleCollector:userState:v1
```

요구사항:

- version 필드 포함
- themes 상태 포함
- selectedThemeId 포함
- createdAt/updatedAt 포함
- 브라우저 환경에서만 localStorage 접근
- SSR 안전성 고려
- 저장 데이터가 없으면 초기값 생성

### 2.10 최소 UI 연결

필요 컴포넌트:

```text
components/cards/CollectionCard.tsx
components/capsule/CapsuleOpenButton.tsx
components/capsule/CapsuleResultModal.tsx
components/collection/CollectionProgress.tsx
```

최소 UI 요구:

- 메인 화면에서 “캡슐 컬렉터” 제목 표시
- 커피 테마 카드 표시
- 수집률 표시
- 커피 테마 화면 또는 섹션에서 캡슐 열기 가능
- 결과 모달 표시
- 새로고침 후 보유 상태 유지

---

## 3. 금지 범위

이번 스프린트에서는 하지 않는다.

```text
실제 광고 SDK
서버 DB
로그인
결제
80장 전체 데이터 입력
고급 도감 화면
카드 상세 모달
복잡한 애니메이션
고퀄 카드 이미지 적용
```

---

## 4. 완료 기준

- 캡슐을 1회 열 수 있다.
- 랜덤 카드가 지급된다.
- 신규/중복 판정이 된다.
- 중복 보상이 계산된다.
- 로컬스토리지에 저장된다.
- 새로고침 후 상태가 유지된다.
- 수집률과 컬렉션 점수가 표시된다.
- 타입 에러 없이 빌드 가능하다.

---

## 5. 테스트 방법

```bash
npm run dev
```

확인:

```text
1. 메인 화면 접속
2. 커피 테마 확인
3. 기본 커피 캡슐 열기
4. 결과 모달 확인
5. 여러 번 열어 중복 발생 확인
6. 커피 파우더 증가 확인
7. 새로고침 후 상태 유지 확인
```

가능하면 실행:

```bash
npm run lint
npm run build
```

---

## 6. SPRINT_LOG 기록

완료 후 `docs/SPRINT_LOG.md`에 Sprint 0-A 기록을 추가한다.

포함 항목:

```text
목표
변경 파일
구현 내용
테스트 결과
이슈
다음 작업
```

