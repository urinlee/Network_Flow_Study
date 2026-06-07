// SECSYS: Firewall
TOPICS['secsys_fw'] = {cat:'secsys', label:'방화벽 (Firewall)',
  legend:[{c:'#fff',l:'허용'},{c:'#ff4444',l:'차단'},{c:'#aaa',l:'세션 추적'}],
  devices:[
    {id:'internet',label:'인터넷',          x:0.08,y:0.5,icon:'cloud'},
    {id:'fw',      label:'방화벽',          x:0.38,y:0.5,icon:'firewall'},
    {id:'dmz',     label:'DMZ\n웹/메일',    x:0.68,y:0.28,icon:'server'},
    {id:'lan',     label:'내부 LAN',        x:0.68,y:0.72,icon:'pc'},
    {id:'admin',   label:'관리자 콘솔',     x:0.92,y:0.5,icon:'pc'}
  ],
  steps:[
    {from:'internet',to:'fw', col:'#fff',   lbl:'패킷',    badge:'FW-01',title:'1세대: 패킷 필터링',  desc:'IP/포트/프로토콜 기반 ACL. Stateless.',code:'ACL:\n1. PERMIT TCP any→DMZ:80\n2. PERMIT TCP any→DMZ:443\n3. DENY TCP any→LAN\n4. DENY IP any (묵시적)'},
    {from:'internet',to:'fw', col:'#aaa',   lbl:'세션',    badge:'FW-02',title:'2세대: Stateful 방화벽',desc:'연결 상태 테이블 유지.',code:'연결 테이블:\n1.2.3.4:54321→10.0.0.5:80 ESTABLISHED\n→ 응답 자동 허용\n→ 비정상 플래그 차단'},
    {from:'fw',     to:'dmz', col:'#fff',   lbl:'허용',    badge:'FW-03',title:'3세대: NGFW',          desc:'L7 앱 인식, SSL 복호화, IPS 내장.',code:'NGFW 기능:\n- 앱 인식 (Facebook→차단)\n- SSL/TLS 복호화\n- 사용자 기반 정책 (AD연동)\n- IPS 시그니처 내장'},
    {from:'fw',     to:'lan', col:'#ff4444',lbl:'차단',    badge:'FW-04',title:'DMZ 보안 정책',        desc:'외부↔DMZ↔내부 3단계.',code:'인터넷→DMZ: 80,443,25 허용\nDMZ→LAN: 최소화\n인터넷→LAN: DENY all'},
    {from:'fw',     to:'admin',col:'#aaa',  lbl:'로그',    badge:'FW-05',title:'로깅 & 운영',          desc:'SIEM 연동으로 실시간 모니터링.',code:'로그: Timestamp|Src|Dst|Action\n운영:\n- Implicit Deny 확인\n- 불필요한 규칙 정기 제거\n- 이중화(Active-Standby)'}
  ],
  glossary:[{sec:'방화벽',terms:[
    {t:'패킷 필터링',d:'1세대. IP/포트/프로토콜 ACL. Stateless. 빠르나 상태 추적 불가.'},
    {t:'Stateful Inspection',d:'2세대. 연결 상태 테이블. 비정상 패킷 차단.'},
    {t:'NGFW',d:'3세대. L7 앱 인식, SSL 복호화, IPS 내장.'},
    {t:'묵시적 거부',d:'ACL 마지막에 모든 트래픽 차단. 명시적 허용 없으면 모두 차단.'}
  ]}]
};
