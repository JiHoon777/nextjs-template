# 인증 통합 Fetch API (fetch.ts)

## 핵심 기능
🔁 자동 토큰 갱신 (401 에러 대응)
📝 개발 환경 로깅 시스템
🔒 인증 헤더 자동 주입

### 주요 특징
```typescript
interface AppFetchOptions extends RequestInit {
  // 커스텀 확장 옵션
}
```

1. **자동 인증 헤더 처리**
   - 세션에 액세스 토큰이 있으면 Authorization 헤더 자동 추가

2. **토큰 갱신 메커니즘**
   - 401 응답 시 리프레시 토큰으로 재시도
   - 중복 갱신 요청 방지

3. **에러 처리**
   - HTTP 에러 → AppError 변환
   - 서버 응답 구조 표준화

4. **개발자 도구**
   - 요청/응답 전체 로그 기록
   - 에러 상세 정보 출력

### 사용 예시
```typescript
const { data } = await appFetch<Profile>('/auth/profile');
```
