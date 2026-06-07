// SECSYS: WAF
TOPICS['secsys_waf'] = {cat:'secsys', label:'WAF & 웹 보안',
  legend:[{c:'#fff',l:'정상'},{c:'#ff4444',l:'차단'},{c:'#aaa',l:'로그'}],
  devices:[
    {id:'user',  label:'사용자 브라우저', x:0.08,y:0.5,icon:'pc'},
    {id:'waf',   label:'WAF (웹방화벽)', x:0.38,y:0.5,icon:'firewall'},
    {id:'webapp',label:'웹 앱 서버',     x:0.72,y:0.5,icon:'server'},
    {id:'db',    label:'DB 서버',        x:0.92,y:0.5,icon:'server'}
  ],
  steps:[
    {from:'user', to:'waf',   col:'#ff4444',lbl:'SQL Injection',badge:'WAF-01',title:'WAF — SQL 인젝션 차단',desc:'HTTP L7에서 웹 공격 탐지·차단. OWASP Top 10.',code:'탐지 패턴:\n\' -- /* UNION SELECT 1=1--\n→ 차단!\n\nOWASP Top 10:\n1.SQL Injection 2.XSS 3.CSRF'},
    {from:'user', to:'waf',   col:'#ff4444',lbl:'XSS',          badge:'WAF-02',title:'XSS 차단 & CSP',       desc:'악성 스크립트 삽입 방어.',code:'XSS: [script]...[/script]\nWAF 차단: [script] onerror=\n\nCSP 헤더:\nContent-Security-Policy:\n  script-src "self"'},
    {from:'waf',  to:'webapp',col:'#fff',   lbl:'정상',          badge:'WAF-03',title:'WAF 배치 방식',        desc:'리버스 프록시, 인라인, 클라우드 WAF.',code:'1) 리버스 프록시: 사용자→WAF→서버\n2) 인라인 브릿지: L2 투명 삽입\n3) 클라우드: Cloudflare, AWS WAF'},
    {from:'waf',  to:'db',    col:'#ff4444',lbl:'DB 방화벽',     badge:'WAF-04',title:'DB 방화벽 & 다층 방어',desc:'SQL 쿼리 검사. Defense in Depth.',code:'DB 방화벽:\n- 비정상 SQL 차단\n- 대량 조회 차단\n\n계층:\nWAF→NGFW→IPS→서버→DB방화벽'}
  ],
  glossary:[{sec:'WAF & 웹보안',terms:[
    {t:'WAF',d:'Web Application Firewall. HTTP/HTTPS L7 검사. OWASP Top 10 방어.'},
    {t:'OWASP Top 10',d:'웹 취약점 상위 10개. SQL 인젝션, XSS, CSRF 등.'},
    {t:'CSP',d:'Content Security Policy. 허용된 스크립트 출처 제한. XSS 방어.'},
    {t:'Defense in Depth',d:'다층 방어. WAF+방화벽+IPS+DB방화벽 조합.'}
  ]}]
};
