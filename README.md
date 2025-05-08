# WealthWise

![WealthWise Logo](./public/wealthwise-finance-bold-icon.ico)

**WealthWise**는 금융 교육, 시뮬레이션, 커뮤니티, 전문가 상담 등 다양한 기능을 제공하는 종합 자산 관리 및 금융 학습 플랫폼입니다.

React, TypeScript, Redux, Firebase 등 최신 웹 기술을 활용하여 개발되었습니다.

## 주요 기능

- **대시보드**: 자산 현황, 목표, 금융 데이터 시각화
- **시뮬레이션**: 다양한 금융 시나리오 체험 및 분석
- **금융 학습**: 금융 지식, 투자, 자산 관리 등 교육 콘텐츠 제공
- **커뮤니티**: 사용자 간 정보 공유 및 소통
- **전문가 상담**: 금융 전문가와의 1:1 상담 기능
- **프로필 관리**: 개인 정보, 자산, 목표 설정 및 관리

## 기술 스택

- **Frontend**: React, TypeScript, Redux, Styled-components, D3.js
- **Backend/Cloud**: Firebase (인증, DB, 호스팅)
- **기타**: React Router, Axios, Jest, Testing Library

## 폴더 구조

```
src/
  components/      # 공통 UI 컴포넌트
    common/        # Header, Footer, Button 등
  context/         # 전역 상태 관리
  data/            # 데이터 관련 파일
  firebase/        # Firebase 설정
  hooks/           # 커스텀 훅
  pages/           # 주요 페이지 (dashboard, simulations, learning, community, experts, profile, auth 등)
  styles/          # 스타일 파일
  types/           # 타입 정의
  App.tsx          # 앱 엔트리포인트
  index.tsx        # 렌더링 엔트리포인트
```

## 설치 및 실행 방법

1. **의존성 설치**

```bash
npm install
```

2. **개발 서버 실행**

```bash
npm start
```

브라우저에서 http://localhost:3000 접속

3. **테스트 실행**

```bash
npm test
```

4. **프로덕션 빌드**

```bash
npm run build
```

## 기여 방법

1. 이슈 등록 및 포크(Fork)
2. 새로운 브랜치 생성 (feature/your-feature)
3. 코드 작성 및 커밋
4. Pull Request 생성

## 라이선스

본 프로젝트는 MIT 라이선스를 따릅니다.

## 문의

팀원 연락처

- 프론트엔드 / 데이터: [이성운 - sw0523_dr@kakao.com]
- 프론트엔드 / UI: [홍민정 - hminjung99@gmail.com]

GitHub 이슈를 통해서도 문의해주세요.
