# 캡슐 컬렉터 SPRINT PLAN

> 목적  
> 이 문서는 캡슐 컬렉터 프로젝트의 전체 개발 순서를 관리하기 위한 상위 스프린트 계획서다.  
> Cursor Auto는 이 문서를 참고하되, 사용자가 명시한 **스프린트 하나만** 구현해야 한다.

---

## 1. 운영 원칙

### 1.1 문서는 크게, 구현은 작게

- 전체 기획은 문서로 넓게 제공한다.
- 실제 구현은 스프린트 단위로 나눈다.
- 한 번에 여러 스프린트를 구현하지 않는다.
- 각 스프린트 완료 후 `docs/SPRINT_LOG.md`에 기록한다.

### 1.2 Cursor Auto 작업 규칙

Cursor Auto는 다음 규칙을 반드시 따른다.

```text
1. 사용자가 지정한 Sprint 하나만 구현한다.
2. 다른 Sprint 범위는 건드리지 않는다.
3. themeId 기반 확장 구조를 유지한다.
4. coffee 테마에만 종속된 하드코딩을 피한다.
5. 핵심 로직은 lib 하위 순수 함수로 분리한다.
6. UI 컴포넌트는 components 하위로 분리한다.
7. v0.1에서는 로컬스토리지만 사용한다.
8. 서버 DB, 로그인, 결제, 실제 광고 SDK는 붙이지 않는다.
9. 작업 완료 후 SPRINT_LOG.md를 갱신한다.
10. 완료 보고에는 “이렇게 테스트하세요”를 포함한다.
```

---

## 2. 참고 문서

모든 스프린트는 아래 문서를 기준으로 진행한다.

```text
docs/CAPSULE_COLLECTOR_MASTER_DESIGN.md
docs/THEME_ARCHITECTURE.md
docs/COFFEE_THEME_SPEC.md
docs/COLLECTION_UX_GUIDE.md
docs/ANIMATION_GUIDE.md
docs/SPRINT_LOG.md
```

---

## 3. 스프린트 목록

| Sprint | 문서 | 목표 |
|---|---|---|
| Sprint 0-A | `docs/sprints/SPRINT_00A_ENGINE_FOUNDATION.md` | 수집형 엔진 기반 구축 |
| Sprint 0-B | `docs/sprints/SPRINT_00B_THEME_HOME_UX.md` | 커피 테마 홈 UX 정리 |
| Sprint 1 | `docs/sprints/SPRINT_01_OPEN_RESULT_EXPERIENCE.md` | 캡슐 오픈 결과 경험 개선 |
| Sprint 2 | `docs/sprints/SPRINT_02_COLLECTION_BOOK.md` | 커피 도감 화면 구현 |
| Sprint 3 | `docs/sprints/SPRINT_03_COFFEE_80_DATA.md` | 커피 카드 80장 데이터 확장 |
| Sprint 4 | `docs/sprints/SPRINT_04_COLLECTION_DESIRE_UI.md` | 수집 욕구 UI 고도화 |
| Sprint 5 | `docs/sprints/SPRINT_05_ANIMATION_POLISH.md` | 애니메이션 고도화 |
| Sprint 6 | `docs/sprints/SPRINT_06_AD_REWARD_MOCK.md` | 광고 보상 mock 고도화 |
| Sprint 7 | `docs/sprints/SPRINT_07_CARD_IMAGE_INTEGRATION.md` | 카드 이미지 적용 |

---

## 4. 진행 순서

```text
Sprint 0-A
→ Sprint 0-B
→ Sprint 1
→ Sprint 2
→ Sprint 3
→ Sprint 4
→ Sprint 5
→ Sprint 6
→ Sprint 7
```

중간에 문제가 생기면 새 스프린트를 추가하지 말고, 먼저 해당 스프린트의 수정 작업을 완료한다.

---

## 5. 금지 사항

아래 요청은 피한다.

```text
Sprint 0-A부터 Sprint 7까지 전부 구현해줘.
전체 게임을 한 번에 만들어줘.
광고 SDK까지 붙여줘.
로그인/서버 저장까지 같이 해줘.
80장 데이터와 애니메이션과 도감을 한 번에 해줘.
```

---

## 6. 권장 Cursor 지시문 형식

```text
docs/SPRINT_PLAN.md와 docs/sprints/SPRINT_00A_ENGINE_FOUNDATION.md를 기준으로 Sprint 0-A만 진행해줘.

중요:
- 다른 Sprint 작업은 하지 마.
- 기능 범위를 Sprint 0-A 문서 안으로 제한해.
- 작업 완료 후 docs/SPRINT_LOG.md에 기록해.
- 완료 보고에는 변경 파일, 구현 내용, 남은 작업, 테스트 결과, 이렇게 테스트하세요를 포함해.
```

---

## 7. 완료 보고 형식

Cursor Auto는 매번 아래 형식으로 보고한다.

```md
### 1. 변경 파일
-

### 2. 구현 내용
-

### 3. 남은 작업
-

### 4. 테스트 결과
-

### 5. 이렇게 테스트하세요
-
```

