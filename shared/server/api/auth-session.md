# 인증 세션 관리 API (auth-session.ts)

## 주요 기능
- 🛡️ Iron Session을 이용한 암호화된 쿠키 기반 인증 세션 관리
- 🕒 세션 TTL(30일) 및 보안 설정 관리
- 🔄 JWT 토큰 갱신 메커니즘

### 주요 함수
1. `createAuthSession(authData)`
   - 인증 응답 데이터를 받아 암호화된 세션 생성
   - HTTP Only/Secure 쿠키 설정
   - 생성 시간(createdAt) 타임스탬프 추가

2. `getAuthSession()`
   - 저장된 세션 정보 복호화 후 반환
   - 쿠키가 없는 경우 null 반환

3. `deleteAuthSession()`
   - 세션 쿠키 만료 처리

4. `refreshJwtTokens(refreshToken)`
   - 리프레시 토큰으로 새로운 액세스 토큰 발급
   - 동시 요청 방지를 위한 Promise locking 메커니즘

### 보안 설정
- `AUTH_SESSION_SECRET` 환경변수 사용
- 프로덕션 환경에서 Secure 쿠키 활성화
- SameSite=Lax 정책 적용
