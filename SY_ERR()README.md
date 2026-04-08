# 🕶️ SY_ERR - Digital Fashion Editorial & Archive

본 프로젝트는 완벽한 시스템 속의 불완전한 미학(Noise)을 탐구하는 디지털 룩북이자, 개인의 패션 아이템을 데이터화하여 관리하는 **익스텐디드 패션 아카이브 플랫폼**입니다. 

---

## 1. 프로젝트 개요 (Overview)

- **프로젝트명**: `SY_ERR` (System Error)  
- **슬로건**: *"The noise is the canvas."*
- **핵심 컨셉**: 시스템 오류와 노이즈를 시각적 예술로 승화시킨 에디토리얼 디자인과 AI 소프트웨어 전공의 정체성 결합

### 🎯 기획 목적
* **디지털 미학 구현**: 글리치(Glitch)와 흑백의 고대비 비주얼을 통한 독창적인 UI/UX 구축
* **전공 융합 아카이빙**: AI 소프트웨어 전공 지식을 바탕으로 패션 데이터를 체계적으로 구조화
* **확장성 고려**: 향후 AI 기반 스타일링 추천 및 데이터 분석 시스템 도입을 위한 기초 설계

---

## 2. 기술 스택 및 확장 로드맵 (Tech Stack & Roadmap)

교수님 가이드에 따라 본 프로젝트는 2학년 과정까지 단계별로 확장될 예정입니다.

| 단계 | 기간 | 주요 기술 | 핵심 목표 |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **현재 (1-1)** | **HTML5, CSS3, Git** | **정적 웹페이지 구현 및 GitHub Pages 배포** |
| Phase 2 | 1학년 기말 | JavaScript (Vanilla) | 글리치(Glitch) 효과 및 동적 필터링 기능 추가 |
| Phase 3 | 1학년 2학기 | React.js | SPA(Single Page Application) 구조 전환 |
| Phase 4 | 2학년 | Spring Boot, MySQL | 백엔드 구축 및 사용자별 패션 DB 연동 |

---

## 3. 핵심 기능 요구사항 (Features)

### 🏠 Home (`index.html`)
* **브랜드 랜딩**: 메인 타이틀에 `mix-blend-mode`와 노이즈 텍스처를 적용한 강렬한 비주얼
* **Visual**: 시스템 로그(Log) 스타일의 텍스트 배치로 개발자로서의 정체성 강조
* **Info**: 하단 영역에 브랜드 좌표 및 오프라인 정보 시각화

### 👕 Collections (`collections.html`)
* **룩북 전시**: CSS Grid를 활용한 비정형적이고 감각적인 화보 배치
* **인터랙션**: 이미지 호버 시 데이터 규격(Exif) 스타일의 상세 정보 노출

### 🎬 Archives & Inspiration
* **Media**: 브랜드 캠페인 영상 및 협업 미디어 콘텐츠 아카이빙
* **Inspiration**: **Bento Grid** 형식을 적용하여 파편화된 영감을 체계적으로 구조화

---

## 4. 디렉토리 구조 (Directory Structure)

GitHub Pages 배포 효율성을 위해 최상위 경로를 유지하며 자원을 엄격히 분리합니다.

```text
.
├── index.html          # Entry Point (SY_ERR 메인 화면)
├── collections.html    # 시즌 룩북 페이지
├── archives.html       # 미디어 아카이브 페이지
├── inspiration.html    # 영감 콘텐츠 페이지
├── SY_ERR().css       # 메인 테마 및 레이아웃 설정
├── images/
│   ├── items/          # 패션 아이템 이미지 자산
│   └── symbols/        # 로고 및 디지털 그래픽 자산
└── README.md           # 프로젝트 기획 및 개발 명세서

```

## 5. 화면 설계 (UI/UX Structure)

🖼️ Layout 레이아웃 구조도

```text

Plaintext
______________________________________________________________________
| [LOGO: SY_ERR]                     [SY_ERR_v1.0 | Collections | Archives] | <- Header
|____________________________________________________________________|
|                                                                    |
|                                                                    |
|                         [ MAIN HERO AREA ]                         |
|                                                                    |
|                             SY_ERR (SY)                            |
|                                                                    |
|____________________________________________________________________|
|                 66 SY_ERR ST, Seoul KR 06164                       | <- Footer
|____________________________________________________________________|
```

📋 영역별 상세 구성
Header: JetBrains Mono 폰트를 사용한 GNB 배치, 0.58rem의 극소 사이즈 텍스트로 미니멀리즘 강조

Main (Hero): Archivo 폰트의 가느다란 자폭(wght 200)과 넓은 자간(16px)을 활용한 타이포그래피

Background: grayscale 필터와 vignette 효과가 적용된 고화질 이미지를 고정 배치(position: fixed)



## 6. 버전 관리 규칙 (Git Convention)
Branch Strategy:

main: 최종 배포 브랜치

feature/*: 개별 페이지 및 기능 개발 전용

Commit Message:

feat: 새로운 기능 추가

style: UI 디자인 및 CSS 수정

fix: 오류 수정

docs: 문서 수정

© 2026 SY_ERR (Park Su-yong). All Rights Reserved.