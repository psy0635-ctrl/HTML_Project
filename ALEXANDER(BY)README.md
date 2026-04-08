# 🕶️ ALEXANDER(BY) - Digital Fashion Editorial & Archive

본 프로젝트는 힙하고 트렌디한 패션 브랜드를 위한 디지털 룩북이자, 개인의 패션 아이템을 데이터화하여 관리하는 **익스텐디드 패션 아카이브 플랫폼**입니다.

---

## 1. 프로젝트 개요

- **프로젝트명**: ALEXANDER(BY) Digital Editorial  
- **슬로건**: *"The noise is the canvas."*

### 🎯 목적
- 압도적인 시각적 경험 (Full-screen Image & Bold Typography)을 통한 브랜드 무드 전달  
- 스트릿 패션 아이템 및 컬렉션의 체계적인 디지털 아카이빙  
- 향후 AI 기반 트렌드 분석 및 스타일링 추천 시스템 확장을 위한 기초 설계  

### 👤 대상 사용자
- 고유한 브랜드 가치와 힙한 스트릿 감성을 추구하는 패션 트렌드세터 및 개발자  

---

## 2. 기술 스택 (Tech Stack)

- **Frontend**  
  - HTML5  
  - CSS3 (CSS Grid, Flexbox, mix-blend-mode)

- **Typography**  
  - Montserrat (Bold weight)  
  - Apple SD Gothic Neo  

- **Version Control**  
  - Git (Git-flow 전략)  
    - `main`  
    - `develop`  
    - `feature/*`  

- **Deployment**  
  - GitHub Pages  

---

## 3. 핵심 기능 요구사항

### 🏠 Home (`index.html`)
- 전체 화면을 활용한 브랜드 랜딩 페이지 (Alexander 컨셉 레퍼런스 반영)  
- 볼드한 로고 배치  
- 하단 매장 위치 정보 시각화  

### 👕 Collections (`collections.html`)
- 시즌별 룩북을 그리드 형식으로 전시  
- 상세 이미지 연결  

### 🎬 Archives (`archives.html`)
- 브랜드 관련 영상 및 협업 미디어 콘텐츠 아카이빙  

### 💡 Inspiration (`inspiration.html`)
- 스트릿 스냅샷 및 레퍼런스 이미지  
- Bento Grid 형식 데이터 관리  

---

## 4. 디렉토리 구조 (Directory Structure)

```text
.
├── index.html          # 메인 랜딩 페이지 (Hero Section)
├── collections.html    # 시즌 룩북 그리드 페이지
├── archives.html       # 미디어 아카이브 페이지
├── inspiration.html    # 영감 콘텐츠 페이지
│
├── css/
│   ├── reset.css       # 브라우저 기본 스타일 초기화
│   ├── typography.css  # 볼드 타이포그래피 및 텍스트 스타일 정의
│   └── main.css        # 전체 테마 및 레이아웃 설정
│
├── images/
│   ├── items/          # 패션 아이템 이미지
│   └── symbols/        # 로고 및 아이콘 자산
│
└── README.md           # 프로젝트 기획 및 개발 문서

5. 화면 설계 (UI/UX 구조)
🔝 Header 영역
좌측 상단 브랜드 로고 ALEXANDER(BY) 배치
우측 상단 슬림한 네비게이션 메뉴
Home
Collections
Archives
🎥 Main Content 영역
배경: 고해상도 브랜드 컨셉 이미지 또는 흑백 루핑 영상
중앙:
볼드한 메인 타이틀
슬로건
mix-blend-mode 적용
하단:
브랜드 오프라인 스토어 위치 정보 고정 배치
🔻 Footer 영역
저작권 명시 (© 2026 ALEXANDER)
공식 이메일 및 SNS 연락처 기재


6. 버전 관리 및 협업 규칙 (Git Commit Convention)
feat: 새로운 기능 추가
fix: 버그 또는 오류 수정
style: UI / CSS 디자인 변경
docs: 문서 수정
refactor: 코드 구조 개선 (기능 변화 없음)
📌 예시
feat: 메인 페이지 텍스트 레이아웃 구현
style: 타이틀 자간 조정
fix: 모바일 화면 깨짐 수정