// INFRA: FW
TOPICS['infra_fw'] = {cat:'infra', label:'방화벽 & IDS/IPS',
  legend:[{c:'#fff',l:'허용'},{c:'#ff4444',l:'차단'},{c:'#aaa',l:'검사'}],
  devices:[
    {id:'internet',label:'인터넷',         x:0.08,y:0.5,icon:'cloud'},
    {id:'fw',      label:'방화벽 (L3/L4)', x:0.35,y:0.5,icon:'firewall'},
    {id:'ids',     label:'IDS/IPS (L7)',   x:0.62,y:0.5,icon:'server'},
    {id:'dmz',     label:'DMZ 웹서버',     x:0.88,y:0.3,icon:'server'},
    {id:'lan',     label:'내부 LAN',       x:0.88,y:0.7,icon:'pc'}
  ],
  steps:[
    {from:'internet',to:'fw', col:'#fff',   lbl:'HTTP 80', badge:'FW-01',title:'패킷 필터링 (Stateless)',desc:'IP/포트 기반 ACL. 각 패킷 독립 검사.',code:'ACL 규칙:\n1. PERMIT TCP any → DMZ:80\n2. PERMIT TCP any → DMZ:443\n3. DENY TCP any → LAN\n4. DENY all (묵시적)'},
    {from:'fw',     to:'ids', col:'#fff',   lbl:'허용',    badge:'FW-02',title:'Stateful 방화벽',         desc:'TCP 연결 상태 추적. 응답 패킷 자동 허용.',code:'연결 테이블:\n1.2.3.4:54321→10.0.0.5:80 ESTABLISHED\n→ 응답 자동 허용\n→ SYN+FIN 등 비정상 차단'},
    {from:'ids',    to:'dmz', col:'#fff',   lbl:'Clean',   badge:'FW-03',title:'IDS/IPS (L7 DPI)',       desc:'딥 패킷 검사. 앱 레이어 공격 분석.',code:'탐지 방식:\n1) 시그니처: 알려진 패턴\n2) 이상행위: 정상 Baseline 기준\nIDS: 탐지만  IPS: 탐지+차단'},
    {from:'ids',    to:'lan', col:'#ff4444',lbl:'BLOCK',   badge:'FW-04',title:'DMZ 아키텍처',            desc:'외부-DMZ-내부 3단계 보안.',code:'인터넷 → FW1 → DMZ → FW2 → LAN\nDMZ: 웹/메일/DNS 서버\n인터넷→LAN: DENY all'}
  ],
  glossary:[{sec:'방화벽/IDS',terms:[
    {t:'Stateless vs Stateful',d:'Stateless: 패킷 독립 검사(빠름). Stateful: 연결 상태 추적(정확).'},
    {t:'DMZ',d:'외부 접근 허용 서버 구역. 내부 LAN과 분리.'},
    {t:'WAF',d:'Web App Firewall. SQL 인젝션, XSS 등 웹 공격 방어. L7 검사.'}
  ]}]
};
