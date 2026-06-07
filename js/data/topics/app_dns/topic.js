// APP: DNS
TOPICS['app_dns'] = {cat:'app', label:'DNS 동작 원리',
  legend:[{c:'#fff',l:'재귀 질의'},{c:'#aaa',l:'반복 질의'},{c:'#666',l:'응답'}],
  devices:[
    {id:'client',  label:'클라이언트',           x:0.08,y:0.5,icon:'pc'},
    {id:'resolver',label:'재귀 리졸버\n(ISP)',    x:0.30,y:0.5,icon:'router'},
    {id:'root',    label:'루트 네임서버\n(.)',     x:0.55,y:0.2,icon:'server'},
    {id:'tld',     label:'TLD 서버\n(.com)',       x:0.75,y:0.5,icon:'server'},
    {id:'auth',    label:'권한 서버\nexample.com', x:0.55,y:0.8,icon:'dns'}
  ],
  steps:[
    {from:'client',  to:'resolver',col:'#fff',lbl:'DNS Query',  badge:'DNS-01',title:'DNS 계층 구조',    desc:'클라이언트가 재귀 리졸버에 질의. 리졸버가 대신 탐색.',code:'질의: www.example.com\nType: A (IPv4)\nProtocol: UDP/53\n계층: . → .com → example.com'},
    {from:'resolver',to:'root',   col:'#aaa',lbl:'Root Query',  badge:'DNS-02',title:'루트 서버 질의',   desc:'.com TLD 서버 주소를 루트 서버에서 획득.',code:'루트 응답: NS 레코드\n→ a.gtld-servers.net\n루트서버: 13개 클러스터'},
    {from:'resolver',to:'tld',    col:'#aaa',lbl:'TLD Query',   badge:'DNS-03',title:'TLD 서버 질의',    desc:'.com TLD에서 example.com 권한 서버 획득.',code:'TLD 응답: ns1.example.com\n→ 권한 서버 주소'},
    {from:'resolver',to:'auth',   col:'#aaa',lbl:'Auth Query',  badge:'DNS-04',title:'권한 서버 질의',   desc:'최종 IP 주소 획득.',code:'DNS 레코드:\nA: IPv4, AAAA: IPv6\nCNAME: 별칭, MX: 메일\nNS: 네임서버, TXT: 텍스트'},
    {from:'resolver',to:'client', col:'#666',lbl:'IP 반환',     badge:'DNS-05',title:'캐싱 & TTL',       desc:'결과 캐시 후 클라이언트에 반환.',code:'응답: 93.184.216.34\nTTL: 3600s\n\n캐싱 계층:\n브라우저 → OS → 리졸버'}
  ],
  glossary:[{sec:'DNS',terms:[
    {t:'재귀 질의',d:'클라이언트가 리졸버에 위임. 리졸버가 직접 각 서버 순차 질의.'},
    {t:'DNS 레코드',d:'A: IPv4, AAAA: IPv6, CNAME: 별칭, MX: 메일, NS: 네임서버, PTR: 역방향.'},
    {t:'TTL',d:'캐시 유지 시간(초). 낮을수록 변경 빠름, 높을수록 효율적.'}
  ]}]
};
