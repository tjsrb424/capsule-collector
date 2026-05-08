/**
 * 등급별 프레임 PNG 오버레이 사용 여부.
 * 에셋이 `public/assets/cards/shared/frames/` 에 준비되면 true 로 바꾼다.
 * 기본값 false: 프레임 Image를 마운트하지 않아 404 요청이 발생하지 않음.
 */
export const ENABLE_CARD_FRAME_OVERLAY = false;

const failedCardFramePaths = new Set<string>();

export function hasCardFrameFailed(path: string): boolean {
  return failedCardFramePaths.has(path);
}

export function registerCardFrameFailure(path: string): void {
  failedCardFramePaths.add(path);
}
