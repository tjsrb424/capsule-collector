# Cursor Sprint Workflow

## 1. 목적

이 문서는 캡슐 컬렉터 프로젝트에서 Cursor Auto를 안정적으로 사용하기 위한 작업 방식이다.

---

## 2. 기본 원칙

```text
문서는 크게 제공한다.
구현은 작게 진행한다.
검증은 매 스프린트마다 한다.
로그는 반드시 남긴다.
```

---

## 3. Cursor에게 줄 기본 지시문

아래 형식을 사용한다.

```text
docs/SPRINT_PLAN.md와 docs/sprints/{SPRINT_FILE}.md를 기준으로 {SPRINT_NAME}만 진행해줘.

중요:
- 다른 Sprint 작업은 하지 마.
- 기능 범위를 해당 Sprint 문서 안으로 제한해.
- docs/CAPSULE_COLLECTOR_MASTER_DESIGN.md와 충돌하지 않게 해.
- themeId 기반 확장 구조를 깨지 마.
- coffee 테마에만 종속된 하드코딩은 피하고, 공통 엔진 구조를 유지해.
- 핵심 로직은 lib 하위 순수 함수로 분리해.
- UI 컴포넌트는 components 하위로 분리해.
- 서버 DB, 로그인, 결제, 실제 광고 SDK는 붙이지 마.
- 작업 완료 후 docs/SPRINT_LOG.md에 기록해.

작업 완료 후 아래 형식으로 보고해줘:
1. 변경 파일
2. 구현 내용
3. 남은 작업
4. 테스트 결과
5. 이렇게 테스트하세요
```

---

## 4. Sprint 0-A 실행 지시문

```text
docs/SPRINT_PLAN.md와 docs/sprints/SPRINT_00A_ENGINE_FOUNDATION.md를 기준으로 Sprint 0-A만 진행해줘.

중요:
- 다른 Sprint 작업은 하지 마.
- 기능 범위를 Sprint 0-A 문서 안으로 제한해.
- docs/CAPSULE_COLLECTOR_MASTER_DESIGN.md와 충돌하지 않게 해.
- themeId 기반 확장 구조를 깨지 마.
- coffee 테마에만 종속된 하드코딩은 피하고, 공통 엔진 구조를 유지해.
- 핵심 로직은 lib 하위 순수 함수로 분리해.
- UI 컴포넌트는 components 하위로 분리해.
- 서버 DB, 로그인, 결제, 실제 광고 SDK는 붙이지 마.
- 작업 완료 후 docs/SPRINT_LOG.md에 기록해.

작업 완료 후 아래 형식으로 보고해줘:
1. 변경 파일
2. 구현 내용
3. 남은 작업
4. 테스트 결과
5. 이렇게 테스트하세요
```

---

## 5. 다음 스프린트 실행 지시문 예시

```text
docs/SPRINT_PLAN.md와 docs/sprints/SPRINT_00B_THEME_HOME_UX.md를 기준으로 Sprint 0-B만 진행해줘.
다른 Sprint 작업은 하지 말고, 완료 후 docs/SPRINT_LOG.md에 기록해줘.
```

```text
docs/SPRINT_PLAN.md와 docs/sprints/SPRINT_01_OPEN_RESULT_EXPERIENCE.md를 기준으로 Sprint 1만 진행해줘.
다른 Sprint 작업은 하지 말고, 완료 후 docs/SPRINT_LOG.md에 기록해줘.
```

---

## 6. 검증 명령

가능하면 매번 실행한다.

```bash
npm run lint
npm run build
npm run dev
```

프로젝트 스크립트가 아직 없으면 가능한 명령만 실행한다.

---

## 7. 작업이 커졌을 때

Cursor가 너무 많은 파일을 수정하거나 범위를 벗어나면 즉시 중단하고 아래처럼 지시한다.

```text
이번 작업은 범위가 과해졌어.
현재 Sprint 문서의 구현 범위 안으로만 줄여줘.
다른 Sprint에 해당하는 변경은 되돌리거나 제외해줘.
```

