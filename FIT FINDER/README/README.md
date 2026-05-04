# 🕶️ FIT FINDER
### Body-based Fashion Guide Web

> **"Fit is not size. Fit is balance."**

체형을 기준으로 어울리는 핏과 피해야 할 스타일을 안내하는  
데이터 기반 패션 가이드 웹사이트

---

## 🧠 Project Overview

| 항목 | 내용 |
|------|------|
| 프로젝트명 | FIT FINDER |
| 유형 | 패션 가이드 웹사이트 |
| 핵심 기능 | 체형별 핏 추천 |
| 목적 | 옷 선택 실패 줄이기 |
| 대상 | 패션에 관심 있는 사용자 |

---

## 💡 Why This Project?

> ❓ **"왜 나만 옷이 안 어울리지?"**

이 문제를 해결하기 위해 시작된 프로젝트입니다.

- ✔ 체형별로 어울리는 실루엣 제공
- ✔ 추천 / 비추천 스타일 명확하게 구분
- ✔ 직관적인 UI로 빠르게 이해 가능

---

## 🧩 Key Features

### 1️⃣ 체형 선택 시스템

| # | 체형 | 특징 |
|---|------|------|
| 01 | Triangle | 하체가 상대적으로 발달한 체형 |
| 02 | Inverted | 어깨가 넓고 하체가 슬림한 체형 |
| 03 | Rectangle | 상체와 하체 폭이 비슷한 직선형 체형 |
| 04 | Hourglass | 허리선이 뚜렷하고 균형 잡힌 체형 |
| 05 | Round | 상체 중심에 볼륨이 있는 체형 |
| 06 | Trapezoid | 전체 균형이 안정적인 체형 |

--> 선택 시 해당 가이드 섹션으로 이동

---

### 2️⃣ 체형별 스타일 가이드

| 구성 | 설명 |
|------|------|
| 추천 핏 | 체형에 어울리는 스타일 |
| 비추천 핏 | 피해야 할 스타일 |
| 스타일 방향 | 실제 코디 기준 제시 |

---

### 3️⃣ 실전 스타일 팁

- ✔ **DO / DON'T** 방식으로 명확하게 구분
- ✔ 핵심 포인트 강조
- ✔ 쉽게 이해 가능한 카드 구조
- ✔ Guide 페이지로 바로 이동 가능

---

### 4️⃣ 감각적인 UI 디자인

- 🌑 Dark Tone + Glass Morphism UI
- 🎬 Video Background Hero
- 📐 Grid Layout 기반 구성
- ✨ Hover Interaction


---

## 🛠 Tech Stack

| 분류 | 기술 |
|------|------|
| **Frontend** | HTML5, CSS3 |
| **Layout** | Flexbox, Grid |
| **Design** | Glassmorphism, Dark UI, Hover Effect |
| **Version Control** | Git / GitHub |
| **Deployment** | GitHub Pages |

---

## 📁 Project Structure

```
fit-finder/
│
├── index.html          # 메인 페이지 (Hero + 체형 선택)
├── guide.html          # 체형별 핏 가이드 페이지
├── tips.html           # 스타일 팁 페이지
├── about.html          # 프로젝트 소개 페이지
│
├── css/
│   └── style.css       # 전체 스타일 (공통 + 페이지별)
│
├── images/
│   ├── Triangle.jpg
│   ├── Inverted Triangle.jpg
│   ├── Rectangle.webp
│   ├── Hourglass.jpg
│   ├── Round.jpg
│   └── Trapezoid.jpg
│
└── README.md
```

---

## 🖥 UI Structure

```
🏠 Main (index.html)
├── Video Hero Section
├── Fit Finder Intro
└── Body Type Selection Grid (6종)

📘 Guide (guide.html)
└── 체형별 카드 × 6
    ├── 배경 이미지
    ├── 추천 핏
    └── 비추천 핏

💡 Tips (tips.html)
└── 스타일 팁 카드 × 6
    ├── 핵심 전략
    ├── DO / DON'T
    └── Guide 페이지 연결

🧾 About (about.html)
├── Hero Section
├── Project Goal
├── Why This Topic
├── Design Point
└── Tech Stack
```

---

## 🎨 Design Concept

| 요소 | 설명 |
|------|------|
| 🎬 Video Hero | 몰입감 있는 첫 화면 |
| 🌑 Dark Tone | 고급스러운 분위기 연출 |
| 🧊 Glass UI | 현대적인 Glassmorphism 디자인 |
| 📐 Grid Layout | 정돈된 카드 구조 |
| ✨ Hover Effect | 인터랙션 강조 |

---

## ⚙️ Git Convention

```
feat:     기능 추가
fix:      버그 수정
style:    UI 변경
docs:     문서 수정
refactor: 코드 구조 개선
```

**커밋 예시**

```
feat: 체형 선택 카드 UI 구현
style: Guide 페이지 카드 hover 효과 추가
docs: README 프로젝트 개요 작성
fix: 모바일 레이아웃 깨짐 수정
```

---

## 🌱 Future Roadmap

| 단계 | 내용 | 기술 |
|------|------|------|
| ✅ 현재 | HTML/CSS 정적 웹 | HTML5, CSS3 |
| 🔜 다음 | JavaScript 인터랙션 추가 | Vanilla JS |
| 🔜 이후 | React SPA 구조 전환 | React, React Router |
| 🔜 확장 | 백엔드 구축 및 DB 연동 | Spring Boot, MySQL |
| 🔜 최종 | AI 기반 체형 추천 시스템 | AI / ML API |

---

## 🔥 Next Upgrade Plan

- [ ] 체형 자가 테스트 기능 (JavaScript)
- [ ] 자동 핏 추천 시스템
- [ ] 브랜드별 사이즈 비교 기능
- [ ] 사용자 데이터 저장 (로그인)
- [ ] AI 기반 체형 분석

---

## 🏁 Final Statement

> **FIT FINDER는 단순한 웹사이트가 아니라**  
> **"체형 기반 패션 추천 플랫폼"으로 확장 가능한 프로젝트입니다.**

---

<div align="center">

**© 2026 FIT FINDER · made with HTML5 & CSS3**  
[GitHub](https://github.com/psy0635-ctrl) · [Live Site](https://github.com/psy0635-ctrl/HTML_Project.git/)

</div>
