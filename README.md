# Network Study

네트워크와 정보보호 개념을 애니메이션으로 학습하는 정적 웹 페이지입니다. 별도 빌드 과정 없이 `index.html`을 브라우저에서 열면 실행됩니다.

이 문서는 누구나 쉽게 새 학습 주제를 추가하거나 화면 구조를 고칠 수 있도록 `DATA` 구조와 `HTML` 구조를 자세히 설명합니다.

## 빠른 실행

```text
Network_Flow_Study/
├─ index.html
├─ css/
<<<<<<< HEAD
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
=======
│  └─ style.css
├─ js/
│  ├─ data.js
│  └─ main.js
└─ data/
>>>>>>> ad0a20b (Expand README with data and HTML contribution guide)
```

실행 방법:

1. 저장소를 내려받습니다.
2. 브라우저에서 `index.html`을 엽니다.
3. 왼쪽 토픽 목록에서 원하는 주제를 선택합니다.
4. 오른쪽 패널의 `다음`, `이전`, `자동 재생`, `처음으로` 버튼으로 단계를 확인합니다.

현재 앱은 외부 패키지나 서버가 필요 없는 정적 HTML/CSS/JavaScript 구조입니다.

## 파일 역할

| 파일 | 역할 |
| --- | --- |
| `index.html` | 화면 뼈대입니다. 검색창, 카테고리 영역, 토픽 목록, 캔버스, 설명 패널, 버튼, 툴팁이 정의되어 있습니다. |
| `css/style.css` | 전체 레이아웃과 색상, 패널, 버튼, 토픽 목록, 툴팁 스타일을 담당합니다. |
| `js/data.js` | 학습 콘텐츠 데이터입니다. 카테고리, 토픽, 장치, 단계, 용어, 배경 구역, LAN 그룹을 정의합니다. |
| `js/main.js` | `data.js`의 데이터를 읽어 화면을 만들고 캔버스에 장치/연결/패킷 애니메이션을 그립니다. |
| `data/` | 현재 HTML에서 직접 로드하지 않는 폴더입니다. 향후 이미지나 별도 데이터 파일을 둘 때 사용할 수 있습니다. |

기여자가 새 학습 내용을 추가할 때는 대부분 `js/data.js`만 수정하면 됩니다. 새 아이콘, 새 UI, 새 애니메이션 규칙이 필요할 때만 `js/main.js`와 `css/style.css`를 함께 수정합니다.

## 전체 동작 흐름

1. `index.html`이 먼저 로드됩니다.
2. `index.html` 하단에서 `js/data.js`가 먼저 로드됩니다.
3. 그 다음 `js/main.js`가 로드됩니다.
4. `main.js`가 `CATS`, `TOPICS`, `ZONE_DEFS`, `LAN_GROUPS` 전역 변수를 읽습니다.
5. `initUI()`가 카테고리 버튼과 토픽 목록을 만듭니다.
6. 기본 토픽인 `osi_model`을 `loadTopic('osi_model')`로 불러옵니다.
7. 사용자가 토픽, 검색, 버튼, 캔버스 장치를 조작하면 `main.js`의 전역 함수들이 화면을 갱신합니다.

중요: `data.js`는 반드시 `main.js`보다 먼저 로드되어야 합니다. 순서가 바뀌면 `CATS`나 `TOPICS`를 찾지 못해 화면이 동작하지 않습니다.

## DATA 구조 개요

`js/data.js`에는 네 가지 핵심 데이터가 있습니다.

```js
var CATS = [...];       // 상단 카테고리 목록
var TOPICS = {};        // 실제 학습 토픽 데이터
var ZONE_DEFS = {...};  // 캔버스 배경 구역 데이터
var LAN_GROUPS = {...}; // 장치들을 묶어 보여주는 LAN/그룹 데이터
```

각 토픽은 `TOPICS['토픽ID'] = {...}` 형태로 등록합니다.

```js
TOPICS['l4_tcp'] = {
  cat: 'l4',
  label: 'TCP 연결 & 상태',
  legend: [...],
  devices: [...],
  steps: [...],
  glossary: [...]
};
```

`TOPICS`에 등록된 토픽은 자동으로 왼쪽 토픽 목록에 표시됩니다. 별도 HTML 수정은 필요 없습니다.

## CATS: 카테고리 구조

`CATS`는 상단 카테고리 버튼과 왼쪽 토픽 목록의 섹션 순서를 결정합니다.

```js
var CATS = [
  {id:'osi',    label:'OSI 모델',         atk:false},
  {id:'l2',     label:'L2 데이터링크',    atk:false},
  {id:'sec',    label:'네트워크 공격',    atk:true}
];
```

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `id` | string | 필수 | 카테고리 고유 ID입니다. 토픽의 `cat` 값과 연결됩니다. |
| `label` | string | 필수 | 화면에 보이는 카테고리 이름입니다. |
| `atk` | boolean | 필수 | 공격/보안 위협 계열이면 `true`로 둡니다. 빨간 계열 강조 스타일이 적용됩니다. |

새 카테고리를 만들려면:

1. `CATS`에 새 항목을 추가합니다.
2. 새 토픽의 `cat` 값을 해당 `id`와 동일하게 설정합니다.

예시:

```js
{id:'wireless', label:'무선 네트워크', atk:false}
```

## TOPICS: 토픽 구조

하나의 토픽은 하나의 학습 화면입니다. 장치 배치, 애니메이션 단계, 오른쪽 설명 패널, 용어 정리를 모두 포함합니다.

```js
TOPICS['sample_topic'] = {
  cat: 'l3',
  label: '샘플 토픽',
  legend: [
    {c:'#fff', l:'정상 패킷'},
    {c:'#ff4444', l:'차단/공격 패킷'}
  ],
  devices: [
    {id:'client', label:'클라이언트\n192.168.1.2', x:0.1, y:0.5, icon:'pc'},
    {id:'server', label:'서버\n10.0.0.5', x:0.85, y:0.5, icon:'server'}
  ],
  steps: [
    {
      from:'client',
      to:'server',
      col:'#fff',
      lbl:'Request',
      badge:'SMP-01',
      title:'요청 전송',
      desc:'클라이언트가 서버로 요청을 전송합니다.',
      code:'GET / HTTP/1.1\nHost: example.com'
    }
  ],
  glossary: [
    {sec:'샘플 용어', terms:[
      {t:'요청', d:'클라이언트가 서버에 보내는 메시지입니다.'}
    ]}
  ]
};
```

### 토픽 최상위 필드

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `cat` | string | 필수 | `CATS`의 `id` 중 하나입니다. 이 값으로 카테고리 분류와 공격 테마 여부를 판단합니다. |
| `label` | string | 필수 | 왼쪽 토픽 목록에 보이는 이름입니다. 검색 대상이기도 합니다. |
| `legend` | array | 권장 | 캔버스 왼쪽 아래 범례입니다. 단계 색상의 의미를 설명합니다. |
| `devices` | array | 필수 | 캔버스에 표시할 장치 목록입니다. |
| `steps` | array | 필수 | 애니메이션과 오른쪽 단계 설명에 표시할 순서입니다. |
| `glossary` | array | 권장 | 오른쪽 `용어 정리` 탭에 표시할 용어 목록입니다. |

검색창은 현재 `label`만 검색합니다. `desc`, `code`, `glossary` 내용까지 검색되지는 않습니다.

## legend: 범례 구조

`legend`는 캔버스 왼쪽 아래에 표시됩니다.

```js
legend:[
  {c:'#fff', l:'정상 요청'},
  {c:'#ff4444', l:'차단'},
  {c:'#aaa', l:'응답'}
]
```

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `c` | string | 색상입니다. CSS 색상 문자열이면 됩니다. 예: `#fff`, `#ff4444`, `rgba(...)` |
| `l` | string | 범례에 표시될 설명입니다. |

각 `step.col`과 의미가 맞도록 작성하면 학습자가 흐름을 이해하기 쉽습니다.

## devices: 장치 구조

`devices`는 캔버스 위에 배치되는 노드입니다.

```js
devices:[
  {id:'client', label:'클라이언트\n192.168.1.2', x:0.1, y:0.5, icon:'pc'},
  {id:'router', label:'라우터\n192.168.1.1', x:0.45, y:0.5, icon:'router'},
  {id:'server', label:'서버\n10.0.0.5', x:0.85, y:0.5, icon:'server'}
]
```

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `id` | string | 필수 | 장치 고유 ID입니다. `steps.from`, `steps.to`, `LAN_GROUPS.ids`에서 참조합니다. 같은 토픽 안에서 중복되면 안 됩니다. |
| `label` | string | 필수 | 장치 이름입니다. `\n`으로 줄바꿈할 수 있습니다. 첫 줄은 툴팁 제목, 나머지 줄은 툴팁 본문으로 쓰입니다. |
| `x` | number | 필수 | 캔버스 가로 위치입니다. `0`은 왼쪽 끝, `1`은 오른쪽 끝입니다. |
| `y` | number | 필수 | 캔버스 세로 위치입니다. `0`은 위쪽 끝, `1`은 아래쪽 끝입니다. |
| `icon` | string | 필수 | `main.js`의 `drawIcon()`이 지원하는 아이콘 타입입니다. |

지원되는 `icon` 값:

| icon | 의미 |
| --- | --- |
| `pc` | PC/클라이언트 |
| `server` | 서버 |
| `router` | 라우터 |
| `switch` | 스위치 |
| `firewall` | 방화벽 |
| `dns` | DNS 서버 |
| `cloud` | 인터넷/클라우드 |
| `hacker` | 공격자 |
| `hub` | 허브 |

좌표 작성 팁:

- `x`, `y`는 픽셀이 아니라 비율입니다.
- 장치가 가장자리와 너무 붙으면 라벨이 잘릴 수 있으므로 `0.07`에서 `0.93` 사이를 권장합니다.
- 같은 선상에 장치를 배치하면 패킷 흐름이 읽기 쉽습니다.
- 라벨이 긴 경우 `\n`으로 2~3줄로 나누세요.

## steps: 단계 구조

`steps`는 애니메이션 순서이자 오른쪽 `단계 설명` 탭의 내용입니다.

```js
steps:[
  {
    from:'client',
    to:'server',
    col:'#fff',
    lbl:'SYN',
    badge:'TCP-01',
    title:'3-Way Handshake - SYN',
    desc:'클라이언트가 서버에 연결 요청을 보냅니다.',
    code:'Flags: SYN\nSeq: 1000',
    warn:'주의: SYN Flood는 이 과정을 악용합니다.'
  }
]
```

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `from` | string | 필수 | 패킷이 출발하는 장치 ID입니다. `devices.id`와 정확히 일치해야 합니다. |
| `to` | string | 필수 | 패킷이 도착하는 장치 ID입니다. `devices.id`와 정확히 일치해야 합니다. |
| `col` | string | 필수 | 패킷 색상입니다. 공격 흐름은 보통 `#ff4444`, 일반 흐름은 `#fff` 또는 `#aaa`를 사용합니다. |
| `lbl` | string | 필수 | 패킷 위에 작게 표시되는 라벨입니다. 너무 길면 겹칠 수 있으니 짧게 작성합니다. |
| `badge` | string | 권장 | 오른쪽 설명 패널에 표시되는 단계 코드입니다. 예: `TCP-01`, `DNS-03` |
| `title` | string | 필수 | 단계 제목입니다. |
| `desc` | string | 필수 | 단계 설명입니다. 한두 문장 정도가 가장 읽기 좋습니다. |
| `code` | string | 권장 | 프로토콜 헤더, 명령어, 상태 표 등 고정폭 글꼴로 보여줄 내용입니다. 줄바꿈은 `\n`을 사용합니다. |
| `warn` | string | 선택 | 공격/주의/대응 포인트를 빨간 경고 박스로 보여줄 때 사용합니다. |

중요한 연결 규칙:

- `from`과 `to`는 반드시 같은 토픽의 `devices.id` 중 하나여야 합니다.
- `from` 또는 `to`가 틀리면 해당 단계 애니메이션이 보이지 않습니다.
- `steps` 배열 순서가 그대로 `다음` 버튼과 자동 재생 순서가 됩니다.
- `currentStep`은 내부적으로 `-1`에서 시작합니다. 첫 번째 `다음` 클릭 시 `steps[0]`이 재생됩니다.

## glossary: 용어 정리 구조

`glossary`는 오른쪽 `용어 정리` 탭에 표시됩니다.

```js
glossary:[
  {sec:'TCP', terms:[
    {t:'SYN', d:'TCP 연결을 시작할 때 사용하는 제어 플래그입니다.'},
    {t:'ACK', d:'상대가 보낸 데이터를 확인했다는 뜻의 플래그입니다.'}
  ]},
  {sec:'보안', terms:[
    {t:'SYN Flood', d:'대량 SYN으로 서버의 Half-open 큐를 소모시키는 공격입니다.'}
  ]}
]
```

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `sec` | string | 용어 묶음 제목입니다. |
| `terms` | array | 용어 목록입니다. |
| `terms[].t` | string | 용어 이름입니다. |
| `terms[].d` | string | 용어 설명입니다. |

용어가 없으면 `glossary: []`로 둘 수 있지만, 학습용 토픽이라면 최소 2~3개는 넣는 것을 권장합니다.

## ZONE_DEFS: 배경 구역 구조

`ZONE_DEFS`는 캔버스 배경에 표시되는 구역입니다. 예를 들어 `Client Zone`, `Network Zone`, `Server Zone` 같은 흐린 영역을 그립니다.

```js
var ZONE_DEFS = {
  'default': [
    {label:'Client Zone', x:0, w:0.22, color:'rgba(255,255,255,0.018)', border:'rgba(255,255,255,0.06)'},
    {label:'Network Zone', x:0.22, w:0.56, color:'rgba(180,200,255,0.012)', border:'rgba(160,180,255,0.05)'},
    {label:'Server Zone', x:0.78, w:0.22, color:'rgba(255,200,100,0.012)', border:'rgba(255,200,100,0.05)'}
  ],
  'osi_model': [
    {label:'Application L5~L7', x:0, w:1, y:0, h:0.28, color:'rgba(...)', border:'rgba(...)', horiz:true}
  ]
};
```

토픽 ID와 같은 키가 있으면 해당 배경을 사용합니다. 없으면 `ZONE_DEFS['default']`를 사용합니다.

세로 구역 필드:

| 필드 | 설명 |
| --- | --- |
| `label` | 구역 이름입니다. |
| `x` | 구역 시작 x 비율입니다. |
| `w` | 구역 너비 비율입니다. |
| `color` | 구역 내부 색상입니다. |
| `border` | 점선 테두리 색상입니다. |

가로 구역 필드:

| 필드 | 설명 |
| --- | --- |
| `label` | 구역 이름입니다. |
| `x` | 보통 `0`입니다. |
| `w` | 보통 `1`입니다. |
| `y` | 구역 시작 y 비율입니다. |
| `h` | 구역 높이 비율입니다. |
| `color` | 구역 내부 색상입니다. |
| `border` | 점선 테두리 색상입니다. |
| `horiz` | 가로 구역이면 `true`입니다. |

새 토픽에 특별한 배경이 필요 없으면 `ZONE_DEFS`를 수정하지 않아도 됩니다.

## LAN_GROUPS: 장치 그룹 구조

`LAN_GROUPS`는 캔버스에서 장치들을 점선 박스로 묶어 보여줍니다.

```js
var LAN_GROUPS = {
  'l2_arp': [
    {label:'LAN 192.168.1.0/24', color:'#4488ff', ids:['ha','sw','hb','hc']}
  ]
};
```

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `label` | string | 그룹 이름입니다. |
| `color` | string | 그룹 박스와 라벨 색상입니다. |
| `ids` | array | 묶을 장치 ID 목록입니다. 각 값은 `devices.id`와 일치해야 합니다. |

토픽 ID와 같은 키가 없으면 그룹 박스는 표시되지 않습니다.

## 새 토픽 추가 방법

가장 흔한 기여는 새 토픽 추가입니다. 아래 순서대로 진행하면 됩니다.

1. `js/data.js`에서 적절한 카테고리를 고릅니다.
2. 새 토픽 ID를 정합니다. 예: `app_smtp`, `l2_stp`, `sec_tls_downgrade`
3. `TOPICS['새토픽ID'] = {...};` 블록을 추가합니다.
4. `devices`에 장치를 배치합니다.
5. `steps`에 패킷 흐름과 설명을 순서대로 작성합니다.
6. `glossary`에 핵심 용어를 추가합니다.
7. 필요하면 `ZONE_DEFS['새토픽ID']`를 추가합니다.
8. 필요하면 `LAN_GROUPS['새토픽ID']`를 추가합니다.
9. 브라우저에서 새로고침 후 왼쪽 목록, 검색, 단계 버튼, 자동 재생, 용어 탭을 확인합니다.

새 토픽 템플릿:

```js
// ---- APP: SMTP ----
TOPICS['app_smtp'] = {cat:'app', label:'SMTP 메일 전송',
  legend:[
    {c:'#fff', l:'메일 전송'},
    {c:'#aaa', l:'서버 응답'}
  ],
  devices:[
    {id:'client', label:'메일 클라이언트\nuser@example.com', x:0.10, y:0.50, icon:'pc'},
    {id:'smtp', label:'SMTP 서버\n:25/:587', x:0.45, y:0.50, icon:'server'},
    {id:'mailbox', label:'수신자 메일서버\nmx.example.net', x:0.85, y:0.50, icon:'server'}
  ],
  steps:[
    {from:'client', to:'smtp', col:'#fff', lbl:'EHLO', badge:'SMTP-01', title:'SMTP 세션 시작', desc:'클라이언트가 SMTP 서버에 자신을 알립니다.', code:'C: EHLO client.example.com\nS: 250-smtp.example.com'},
    {from:'client', to:'smtp', col:'#fff', lbl:'MAIL FROM', badge:'SMTP-02', title:'발신자 지정', desc:'메일 발신자 주소를 지정합니다.', code:'MAIL FROM:<user@example.com>'},
    {from:'smtp', to:'mailbox', col:'#aaa', lbl:'Relay', badge:'SMTP-03', title:'메일 릴레이', desc:'SMTP 서버가 수신자 도메인의 MX 서버로 메일을 전달합니다.', code:'DNS MX lookup\nexample.net -> mx.example.net'}
  ],
  glossary:[{sec:'SMTP', terms:[
    {t:'SMTP', d:'Simple Mail Transfer Protocol. 메일 서버 간 전송에 사용하는 프로토콜입니다.'},
    {t:'MX 레코드', d:'메일을 받을 서버를 지정하는 DNS 레코드입니다.'}
  ]}]
};

LAN_GROUPS['app_smtp'] = [
  {label:'메일 전송 경로', color:'#4488ff', ids:['client','smtp','mailbox']}
];
```

## HTML 구조

`index.html`은 데이터를 직접 쓰지 않고, 화면이 들어갈 위치를 `id`로 제공하는 역할을 합니다.

```html
<script src="./js/data.js"></script>
<script src="./js/main.js"></script>
```

위 두 줄이 가장 중요합니다. `data.js`가 먼저, `main.js`가 나중입니다.

### 최상단 배너

```html
<div class="top-banner">
  <span>...</span>
  <span>...</span>
</div>
```

앱 제목과 제작/설명 문구를 표시합니다. 동작 로직과 직접 연결된 `id`는 없습니다. 문구를 바꿔도 JavaScript 동작에는 영향이 없습니다.

### 헤더와 검색창

```html
<header>
  <h1>📡 Network Study</h1>
  <input class="search-box" id="searchBox" placeholder="..." oninput="filterTopics(this.value)">
</header>
```

| 요소 | 역할 |
| --- | --- |
| `h1` | 앱 제목입니다. |
| `#searchBox` | 사용자가 토픽 이름을 검색하는 입력창입니다. |
| `oninput="filterTopics(this.value)"` | 입력할 때마다 `main.js`의 `filterTopics()`를 호출합니다. |

검색은 `TOPICS[id].label` 기준입니다.

### 카테고리 네비게이션

```html
<div class="cat-nav" id="catNav"></div>
```

처음에는 비어 있습니다. `main.js`의 `initUI()`가 `CATS` 배열을 읽고 내부에 카테고리 버튼을 자동 생성합니다.

생성되는 버튼은 대략 이런 구조입니다.

```html
<button class="cat-btn" data-cat="l4">L4 전송</button>
```

공격 카테고리(`atk:true`)는 `cat-btn atk` 클래스를 추가로 받습니다.

### 본문 레이아웃

```html
<div class="body-row">
  <div class="topic-list" id="topicList"></div>
  <div class="canvas-wrap" id="canvasWrap">...</div>
  <div class="side-panel">...</div>
</div>
```

본문은 3열 구조입니다.

| 영역 | id/class | 설명 |
| --- | --- | --- |
| 왼쪽 | `#topicList` | 토픽 목록입니다. `TOPICS` 데이터를 바탕으로 자동 생성됩니다. |
| 가운데 | `#canvasWrap` | 네트워크 다이어그램과 패킷 애니메이션이 표시됩니다. |
| 오른쪽 | `.side-panel` | 단계 설명, 용어 정리, 재생 컨트롤이 표시됩니다. |

### 토픽 목록

```html
<div class="topic-list" id="topicList"></div>
```

`renderTopicList()`와 `filterByCat()`가 이 영역을 채웁니다.

자동 생성되는 요소:

```html
<div class="topic-section">L4 전송</div>
<div class="topic-item" data-id="l4_tcp">TCP 연결 & 상태</div>
```

`data-id`는 `TOPICS`의 키입니다. 클릭하면 `loadTopic(data-id)`가 실행됩니다.

### 캔버스 영역

```html
<div class="canvas-wrap" id="canvasWrap">
  <canvas id="bgC"></canvas>
  <canvas id="mainC"></canvas>
  <div class="legend" id="legend"></div>
</div>
```

| 요소 | 역할 |
| --- | --- |
| `#canvasWrap` | 캔버스 크기의 기준이 되는 부모입니다. |
| `#bgC` | 배경 구역과 격자 점을 그리는 캔버스입니다. |
| `#mainC` | 장치, 연결선, 패킷 애니메이션을 그리는 캔버스입니다. |
| `#legend` | 현재 토픽의 `legend`를 HTML로 표시합니다. |

캔버스는 두 장을 겹쳐 씁니다.

- `bgC`: 자주 바뀌지 않는 배경 구역
- `mainC`: 단계마다 바뀌는 장치 강조, 연결선, 패킷 애니메이션

`resize()`가 화면 크기에 맞게 캔버스 픽셀 크기와 CSS 크기를 조정합니다. 고해상도 화면을 위해 `devicePixelRatio`도 반영합니다.

### 오른쪽 설명 패널

```html
<div class="side-panel">
  <div class="panel-tabs">
    <div class="ptab active" id="pt-step" onclick="switchPane('step')">단계 설명</div>
    <div class="ptab" id="pt-gls" onclick="switchPane('gls')">용어 정리</div>
  </div>
  <div class="pane show" id="pane-step"></div>
  <div class="pane" id="pane-gls"></div>
  ...
</div>
```

| 요소 | 역할 |
| --- | --- |
| `#pt-step` | 단계 설명 탭 버튼입니다. |
| `#pt-gls` | 용어 정리 탭 버튼입니다. |
| `#pane-step` | 현재 단계의 `badge`, `title`, `desc`, `code`, `warn`을 표시합니다. |
| `#pane-gls` | 현재 토픽의 `glossary`를 표시합니다. |

`switchPane('step')` 또는 `switchPane('gls')`가 탭 표시 상태를 바꿉니다.

### 재생 컨트롤

```html
<div class="controls">
  <div class="prog-bar"><div class="prog-fill" id="progFill" style="width:0%"></div></div>
  <div class="btn-row">
    <button class="btn" onclick="prevStep()">◀ 이전</button>
    <button class="btn" onclick="nextStep()">다음 ▶</button>
  </div>
  <button class="btn primary" id="playBtn" onclick="togglePlay()">▶ 자동 재생</button>
  <button class="btn" onclick="resetAnim()">↺ 처음으로</button>
</div>
```

| 요소 | 역할 |
| --- | --- |
| `#progFill` | 현재 단계 진행률을 막대로 표시합니다. |
| `prevStep()` | 이전 단계로 이동합니다. 첫 단계에서 누르면 시작 전 상태로 돌아갑니다. |
| `nextStep()` | 다음 단계로 이동합니다. |
| `#playBtn` | 자동 재생/일시 정지 버튼입니다. |
| `togglePlay()` | 자동 재생 상태를 전환합니다. |
| `resetAnim()` | 단계와 애니메이션을 처음 상태로 초기화합니다. |

### 툴팁

```html
<div id="tooltip">
  <div id="ttTitle"></div>
  <div id="ttBody"></div>
</div>
```

캔버스의 장치 위에 마우스를 올리면 표시됩니다.

- `ttTitle`: 장치 `label`의 첫 줄
- `ttBody`: 장치 `label`의 두 번째 줄 이후

장치를 클릭하면 오른쪽 `단계 설명` 패널에 장치 정보가 표시됩니다.

## main.js와 DATA 연결 지점

주요 함수가 어떤 데이터를 쓰는지 알면 수정 범위를 판단하기 쉽습니다.

| 함수 | 사용하는 데이터/HTML | 역할 |
| --- | --- | --- |
| `initUI()` | `CATS`, `#catNav` | 카테고리 버튼을 만들고 기본 토픽을 로드합니다. |
| `renderTopicList(filter)` | `CATS`, `TOPICS`, `#topicList` | 왼쪽 토픽 목록을 카테고리별로 생성합니다. |
| `filterByCat(catId)` | `CATS`, `TOPICS` | 선택한 카테고리의 토픽만 보여줍니다. |
| `filterTopics(q)` | `TOPICS[id].label` | 검색어와 일치하는 토픽을 보여줍니다. |
| `loadTopic(id)` | `TOPICS`, `CATS`, `#legend`, `#pane-*` | 토픽 데이터를 화면 상태로 로드합니다. |
| `resize()` | `#canvasWrap`, `TOPICS[id].devices` | 캔버스 크기와 장치 좌표를 다시 계산합니다. |
| `drawBg()` | `ZONE_DEFS` | 배경 구역을 그립니다. |
| `drawLANGroups()` | `LAN_GROUPS` | 장치 그룹 박스를 그립니다. |
| `drawDevs()` | `devices` | 장치 아이콘과 라벨을 그립니다. |
| `animateStep(idx)` | `steps[idx]` | `from`에서 `to`로 패킷을 움직입니다. |
| `updateStepInfo(idx)` | `steps[idx]` | 오른쪽 단계 설명 HTML을 갱신합니다. |
| `renderGlossary(gls)` | `glossary` | 용어 정리 탭을 만듭니다. |

## 기여 전 확인 체크리스트

새 토픽을 추가했거나 데이터를 수정했다면 아래를 확인하세요.

- 왼쪽 토픽 목록에 새 토픽이 보이는가?
- 상단 카테고리 버튼으로 필터링했을 때 새 토픽이 올바른 카테고리에 보이는가?
- 검색창에서 토픽 이름으로 검색되는가?
- `다음` 버튼을 눌렀을 때 모든 단계 애니메이션이 보이는가?
- 자동 재생이 마지막 단계까지 자연스럽게 진행되는가?
- 단계 설명의 줄바꿈과 코드 블록이 읽기 좋은가?
- 용어 정리 탭에 내용이 보이는가?
- 캔버스 장치 라벨이 서로 겹치거나 화면 밖으로 나가지 않는가?
- `LAN_GROUPS.ids`, `steps.from`, `steps.to`에 오타가 없는가?
- 공격 주제라면 `cat`이 `sec`이거나 해당 카테고리의 `atk:true`가 맞는가?

## 흔한 실수

| 증상 | 원인 | 해결 |
| --- | --- | --- |
| 새 토픽이 목록에 안 보임 | `TOPICS['id']` 블록이 없거나 `cat` 값이 `CATS.id`와 불일치 | `cat` 오타를 확인합니다. |
| 단계 애니메이션이 안 보임 | `from` 또는 `to`가 `devices.id`와 불일치 | 장치 ID와 단계 ID를 동일하게 맞춥니다. |
| LAN 그룹이 안 보임 | `LAN_GROUPS` 키가 토픽 ID와 다르거나 `ids` 오타 | `LAN_GROUPS['토픽ID']`와 `devices.id`를 확인합니다. |
| 배경 구역이 의도와 다름 | `ZONE_DEFS`에 토픽 ID가 없음 | 기본 배경을 쓰는 것이 맞는지 확인하고 필요하면 추가합니다. |
| 라벨이 겹침 | 장치 좌표가 너무 가깝거나 라벨이 김 | `x`, `y`를 조정하거나 `label`에 `\n`을 넣습니다. |
| 공격 테마 색상이 안 나옴 | 카테고리의 `atk`가 `false` | `CATS`에서 해당 카테고리의 `atk` 값을 확인합니다. |
| 브라우저 콘솔 에러 발생 | 쉼표, 따옴표, 중괄호 누락 | 수정한 `TOPICS` 블록 주변 문법을 확인합니다. |

## 코딩 스타일

- 기존 파일은 ES5 스타일의 `var`와 일반 함수를 사용합니다.
- 새 데이터도 기존 형식에 맞춰 작은따옴표와 한 줄 객체 스타일을 유지하면 리뷰가 쉽습니다.
- 토픽 ID는 소문자와 `_`를 사용합니다. 예: `l4_tcp`, `sec_syn_flood`
- 단계 `badge`는 토픽 약어와 번호를 사용합니다. 예: `TCP-01`, `DNS-S02`
- 긴 설명은 `desc`에 전부 넣기보다 `code`와 `glossary`로 나누면 읽기 좋습니다.

