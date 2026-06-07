// SEC: DDoS
TOPICS['sec_ddos'] = {cat:'sec', label:'DDoS 공격 유형',
  legend:[{c:'#ff4444',l:'공격'},{c:'#ff8844',l:'증폭'},{c:'#fff',l:'정상(차단됨)'}],
  devices:[
    {id:'botnet',label:'봇넷\n(좀비 수천대)',  x:0.1,y:0.5,icon:'hacker'},
    {id:'amp',   label:'증폭 서버\nDNS/NTP',   x:0.45,y:0.2,icon:'server'},
    {id:'victim',label:'피해자 서버',           x:0.82,y:0.5,icon:'server'},
    {id:'user',  label:'정상 사용자',           x:0.82,y:0.82,icon:'pc'}
  ],
  steps:[
    {from:'botnet',to:'victim',col:'#ff4444',lbl:'SYN×10만', badge:'DDoS-01',title:'SYN Flood',           desc:'위조 IP로 대량 SYN. SYN Backlog 고갈.',code:'SYN × 10만/초\n→ Half-open 연결 누적\n→ Backlog 포화\n→ 정상 연결 불가\n대응: SYN Cookie', warn:'서버 자원 고갈'},
    {from:'botnet',to:'amp',   col:'#ff4444',lbl:'DNS req(위조IP)',badge:'DDoS-02',title:'증폭 반사 (DRDoS)',desc:'피해자 IP 위조해 DNS/NTP 대량 요청.',code:'증폭 비율:\nDNS ANY:     ~75배\nNTP monlist: ~556배\nSSDPP:        ~30배', warn:'대응: BCP38, DNS RRL'},
    {from:'amp',   to:'victim',col:'#ff8844',lbl:'증폭 응답', badge:'DDoS-03',title:'L7 애플리케이션 공격',desc:'HTTP GET Flood, Slowloris. 적은 트래픽으로 자원 고갈.',code:'HTTP GET Flood: 대량 정상 요청\nSlowloris: 헤더 천천히 전송\n→ 연결 슬롯 점유\n→ WAF, Rate Limiting 필요', warn:'L7 DDoS는 대역폭 차단만으로 방어 불가'},
    {from:'victim',to:'user',  col:'#fff',   lbl:'서비스 불가',badge:'DDoS-04',title:'방어 체계',           desc:'CDN, AnyCast, 스크러빙 센터.',code:'1) ISP: BCP38, RTBH\n2) CDN/AnyCast: 분산 흡수\n3) 스크러빙 센터: 필터링\n4) WAF + Rate Limiting'}
  ],
  glossary:[{sec:'DDoS',terms:[
    {t:'DDoS',d:'Distributed Denial of Service. 분산 공격으로 서비스 불능.'},
    {t:'봇넷',d:'악성코드 감염 좀비 PC 집합. C&C 서버로 제어.'},
    {t:'Slowloris',d:'HTTP 헤더를 천천히 전송해 연결 슬롯 점유.'},
    {t:'RTBH',d:'Remote Triggered Black Hole. 공격 트래픽 블랙홀 라우팅.'}
  ]}]
};
