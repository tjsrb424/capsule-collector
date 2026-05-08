# Sprint 7: 카드 이미지 적용

## 1. 목표

커피 테마 카드에 실제 고퀄 카드 이미지를 일부 적용하고, 이미지가 없는 카드도 안정적으로 placeholder를 보여주게 한다.

이번 스프린트는 이미지 경로 규칙과 fallback 구조가 중요하다.

---

## 2. 구현 범위

### 2.1 이미지 경로 규칙

기본 경로:

```text
public/assets/cards/coffee/final/{beverageId}.png
```

placeholder 경로:

```text
public/assets/cards/coffee/placeholder/common.png
public/assets/cards/coffee/placeholder/uncommon.png
public/assets/cards/coffee/placeholder/rare.png
public/assets/cards/coffee/placeholder/signature.png
public/assets/cards/coffee/placeholder/legendary.png
```

### 2.2 우선 적용 카드

1차 고퀄 이미지 적용 추천:

```text
americano
espresso
latte
cappuccino
vanilla_latte
caramel_latte
mocha
affogato
```

파일명 규칙:

```text
americano.png
espresso.png
latte.png
cappuccino.png
vanilla_latte.png
caramel_latte.png
mocha.png
affogato.png
```

### 2.3 이미지 fallback

이미지가 없거나 로딩 실패하면 등급별 placeholder를 보여준다.

요구사항:

- 이미지 없는 카드도 레이아웃이 깨지지 않아야 함
- 도감/결과 모달/대표 카드에서 동일한 fallback 사용
- alt 텍스트 제공

### 2.4 카드 컴포넌트 정리

`CollectionCard` 또는 공통 이미지 컴포넌트에서 이미지 처리 로직을 통합한다.

예상:

```text
components/cards/CardImage.tsx
```

또는 기존 카드 컴포넌트 내부에서 처리.

---

## 3. 금지 범위

이번 스프린트에서는 하지 않는다.

```text
이미지 생성 작업
80장 전체 이미지 강제 적용
이미지 편집
실제 CDN 연결
서버 업로드
```

---

## 4. 완료 기준

- 지정된 카드의 실제 이미지가 표시된다.
- 이미지 없는 카드는 등급별 placeholder가 표시된다.
- 결과 모달/도감/홈에서 동일하게 동작한다.
- 모바일 화면에서 카드 이미지 비율이 깨지지 않는다.

---

## 5. 테스트 방법

```bash
npm run dev
```

확인:

```text
1. public/assets/cards/coffee/final/ 에 이미지 파일 배치
2. 해당 카드가 도감/결과에서 실제 이미지로 보이는지 확인
3. 이미지 없는 카드가 placeholder로 보이는지 확인
4. 잘못된 imagePath에서도 UI가 깨지지 않는지 확인
```

---

## 6. SPRINT_LOG 기록

완료 후 `docs/SPRINT_LOG.md`에 Sprint 7 기록을 추가한다.

