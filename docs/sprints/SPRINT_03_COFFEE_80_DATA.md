# Sprint 3: 커피 카드 80장 데이터 확장

## 1. 목표

커피 테마 카드 데이터를 샘플 8장에서 **전체 80장**으로 확장한다.

이번 스프린트는 데이터 정확성이 가장 중요하다.  
UI를 크게 바꾸지 말고, 기존 캡슐/도감 구조가 80장 데이터에서도 정상 동작하게 한다.

---

## 2. 구현 범위

### 2.1 데이터 확장

파일:

```text
data/themes/coffee/coffeeCards.ts
data/themes/coffee/coffeeCategories.ts
```

Coffee 2048 음료 레시피 80종을 카드 데이터로 입력한다.

필드 매핑:

| 원본 필드 | 카드 필드 |
|---|---|
| beverageId | id |
| categoryId | categoryId |
| categoryTitleKo | categoryTitleKo |
| nameKo | nameKo |
| description | description |
| rarity | rarity |
| unlockLevel | unlockLevel |
| timeLimited | timeLimited |
| recipeId | sourceRecipeId 또는 optional |
| recipeKind | sourceRecipeKind 또는 optional |
| shopAvailability | sourceShopAvailability 또는 optional |

공통:

```ts
themeId: "coffee"
sourceGame: "coffee2048"
imagePath: "/assets/cards/coffee/final/{beverageId}.png"
```

이미지가 없더라도 `imagePath`는 규칙대로 넣거나, 안전하게 optional로 둔다.  
UI는 이미지 로딩 실패 시 placeholder를 보여야 한다.

### 2.2 카테고리 10개

반드시 아래 10개 카테고리가 있어야 한다.

```text
espressoBasic
milkCoffee
sweetLatte
mochaDessert
teaLatte
refreshing
rareIngredient
timeLimited
signature
legendaryCollection
```

각 카테고리는 8장씩 있어야 한다.

### 2.3 검증 함수 또는 개발 로그

가능하면 개발 중 검증용 함수를 만든다.

검증 내용:

```text
전체 카드 수 = 80
카테고리 수 = 10
각 카테고리 카드 수 = 8
id 중복 없음
rarity 유효성
themeId 모두 coffee
```

테스트 파일을 만들지 않더라도, 간단한 유틸 함수나 console 검증은 가능하다.

---

## 3. 금지 범위

이번 스프린트에서는 하지 않는다.

```text
UI 대규모 개편
새로운 애니메이션
실제 이미지 생성/적용
광고 SDK
서버 저장
카드 밸런스 대규모 변경
```

---

## 4. 완료 기준

- 커피 카드가 총 80장이다.
- 도감 전체 수집률이 0/80 기준으로 표시된다.
- 10개 카테고리가 모두 표시된다.
- 각 카테고리가 8장씩이다.
- 캡슐 오픈이 80장 카드 풀에서 동작한다.
- 기존 보유 상태와 충돌하지 않는다.

---

## 5. 테스트 방법

```bash
npm run dev
```

확인:

```text
1. /collection/coffee 접속
2. 전체 카드 수 80 확인
3. 카테고리 10개 확인
4. 각 카테고리 8장 확인
5. 캡슐 오픈 반복
6. 수집률이 0/80, 1/80, 2/80 식으로 변하는지 확인
```

가능하면 실행:

```bash
npm run lint
npm run build
```

---

## 6. SPRINT_LOG 기록

완료 후 `docs/SPRINT_LOG.md`에 Sprint 3 기록을 추가한다.

