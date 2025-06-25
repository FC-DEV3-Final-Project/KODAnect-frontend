# KODAnect

## 💞 프로젝트 소개

### [🔗 프로젝트 보러가기](https://kodanect-frontend.netlify.app/home)

이 프로젝트는 한국장기조직기증원(KODA) 공식 홈페이지를 PC와 모바일에서 모두 효율적으로 관리할 수 있는 현대적인 웹사이트로 개편하기 위해 시작되었습니다.
누구나 쉽고 편리하게 정보를 얻고 참여할 수 있도록, 웹 접근성과 사용자 경험을 한층 강화한 새로운 공공 서비스 웹사이트 구축을 목표로 했습니다.

## ⏰ 프로젝트 일정

- **기획 및 설계** : 2025.05.12 ~ 2025.05.16
- **개발 환경 세팅** : 2025.05.19 ~ 2025.05.20
- **공통 컴포넌트 제작** : 2025.05.21 ~ 2025.05.30
- **퍼블리싱 및 컴포넌트 제작** : 2025.06.02 ~ 2025.06.13
- **API 연동 및 기능 구현** : 2025.06.16 ~ 2025.06.23
&nbsp;

## 👨‍🚀 Frontend 팀원 소개

<div align="center">

| **이지원** | **박현아** | **이지선** |
| :---: | :---: | :---: |
| [<img width="160px" src="https://avatars.githubusercontent.com/u/103546376?v=4" style="max-width: 100%; border-radius: 50%;"> <br /> @eas1w0n](https://github.com/eas1w0n) | [<img width="160px" src="https://avatars.githubusercontent.com/u/38741900?v=4" style="max-width: 100%; border-radius: 50%;"> <br /> @pha1155](https://github.com/pha1155) | [<img width="160px" src="https://avatars.githubusercontent.com/u/118454010?v=4" style="max-width: 100%; border-radius: 50%;"> <br /> @ijisun](https://github.com/ijisun) |

</div>
&nbsp;

- [Backend 팀 GitHub 바로가기](https://github.com/FC-DEV3-Final-Project/KODAnect-backend-springboot)
&nbsp;

## 🧚 프로젝트 미리보기

<div align="center">

| **메인 페이지 pc 버전** |
|:---:|
| ![메인페이지pc버전](/public/images/home_pc.gif) |

| **메인 페이지 모바일 버전** |
|:---:|
| ![메인페이지모바일버전](/public/images/home_mo.gif) |

| **기증자 추모관 목록** |
|:---:|
| ![기증자추모관목록](/public/images/remembrance-list.gif)  |

| **하늘나라 편지쓰기** |
|:---:|
| ![하늘나라편지쓰기](/public/images/heavenLetters_01.gif) |

| **편지 수정 및 삭제하기** |
|:---:|
| ![편지수정및삭제하기](/public/images/heavenLetters_02.gif) |


</div>
&nbsp;

## 🔨 기술 스택

<div>

| **TYPE** | **TOOL** |
| :---: | :---: |
| **Library** | ![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![TanstackQuery](https://img.shields.io/badge/tanstackquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=black) |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white) |
| **Styling** | ![TailwindCSS](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindCSS&logoColor=white) |
| **Formatting** | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) |
| **Package Manager** | ![Npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) |
| **Build Tools** | ![VITE](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=Vite&logoColor=white) |
| **Deployment** | ![netlify](https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white) |
| **Version Control** | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) |
| **Collaboration** | ![Slack](https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) |

</div>
&nbsp;

## 📁 폴더 구조

```
- 📁 src
  - 📁 assets
  - 📁 features
    - 📁 home
    - 📁 remembrance
  - 📁 pages
    - 📁 remembrance
    - 📄 Empty
    - 📄 Error
    - 📄 Home
    - 📄 router
  - 📁 shared
    - 📁 api
    - 📁 components
    - 📁 constants
    - 📁 hooks
    - 📁 lib
    - 📁 stores
    - 📁 styles
    - 📁 types
    - 📁 utils
  - 📁 stories
  - 📁 widget
    - 📄 main
```
&nbsp;

## ⚙ 프로젝트 설정 및 실행 방법

### 1. 프로젝트 클론

Git 저장소에서 프로젝트를 로컬로 클론합니다. 터미널(또는 명령 프롬프트)을 열고 명령어를 입력합니다.

```
git clone https://github.com/FC-DEV3-Final-Project/KODAnect-frontend
```

### 2. 의존성 설치

코드 에디터에서 프로젝트 폴더를 열고 터미널에서 'npm' 명령어를 사용하여 의존성을 설치합니다.

```
npm install
```

### 3. 개발 서버 실행

개발 서버를 실행하여 프로젝트를 로컬에서 프로젝트를 실행할 수 있습니다.

```
npm run dev 
```

### ⚠️ 중요: CORS 허용 설정

> 백엔드 서버와 통신 시 CORS 문제가 발생할 수 있습니다. <br/>
> 로컬 주소를 백엔드 담당자에게 전달해 CORS 허용을 요청해 주세요. <br/>
> 📩 **COSR 허용 요청** : 해당 프로젝트의 팀원에게 문의하세요.
&nbsp; 

&nbsp;

## 💡 팀 컨벤션

### 브랜치 전략

**main, dev, feat** 브랜치 사용

- main : 배포 가능한 상태만을 관리하는 브랜치

- dev : 개발 단계에서 통합 역할을 담당하는 브랜치

- feat : 새롭게 추가되거나 변경되는 기능을 개발, merge 후에는 삭제

  - 브랜치 이름 규칙 : `feat/기능명` e.g. `feat/letter-list`

### 커밋 컨벤션

- `feat` : 새로운 기능 추가

- `fix` : 버그 수정

- `docs` : 문서 수정

- `style` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우

- `refactor` : 코드 리펙토링

- `test` : 테스트 코드, 리펙토링 테스트 코드 추가

- `chore` : 빌드 업무 수정, 패키지 매니저 수정

### 파일 컨벤션

- 폴더 : kebab-case

- 파일 : camelCase