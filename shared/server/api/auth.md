# 사용자 인증 API (auth.ts)

## 제공 기능
🔑 이메일/패스워드 기반 인증
👤 사용자 프로필 관리
🚪 로그아웃 처리

### 주요 메소드
1. `signInWithCredentials({email, password})`
   - 자격증명을 통한 로그인
   - 성공 시 세션 생성

2. `signUpWithCredentials({email, password})`
   - 새 사용자 등록

3. `signOut({redirectUrl})`
   - 세션 삭제 및 선택적 리다이렉트
   - `deleteAuthSession` 연동

4. `getProfile()`
   - 현재 사용자 프로필 정보 조회

### 연관 모듈
- [auth-session API](./auth-session.md)
- [fetch API](./fetch.md)
