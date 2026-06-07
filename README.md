# Network Study Split Version

원본 단일 HTML을 기능별 파일로 분리한 버전입니다.

## 구조

```
network-study-split/
├─ index.html          # 화면 마크업
├─ css/
│  └─ style.css        # 전체 스타일
└─ js/
   ├─ data.js          # 전역 데이터 레지스트리: CATS, TOPICS, ZONE_DEFS, LAN_GROUPS
   ├─ data/
   │  ├─ common/
   │  │  └─ categories.js
   │  ├─ zones/
   │  │  └─ default.js
   │  └─ topics/
   │     └─ <topic-id>/
   │        ├─ topic.js # 토픽 본문 데이터
   │        ├─ zones.js # 토픽별 ZONE_DEFS, 필요 시만 존재
   │        └─ lan.js   # 토픽별 LAN_GROUPS, 필요 시만 존재
   └─ main.js          # 렌더링, 애니메이션, 이벤트 로직
```

## 실행

브라우저에서 `index.html`을 열면 됩니다.
