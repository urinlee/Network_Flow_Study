// SEC: DNS Spoofing
TOPICS['sec_dns_spoof'] = {cat:'sec', label:'DNS 스푸핑 & 캐시 포이즈닝',
  legend:[{c:'#fff',l:'정상 DNS'},{c:'#ff4444',l:'위조 응답'},{c:'#ff8844',l:'피싱'}],
  devices:[
    {id:'client',  label:'피해자\n192.168.1.2',  x:0.08,y:0.5,icon:'pc'},
    {id:'resolver',label:'DNS 리졸버',           x:0.38,y:0.5,icon:'dns'},
    {id:'auth',    label:'권한 DNS',             x:0.72,y:0.2,icon:'server'},
    {id:'atk',     label:'공격자',               x:0.72,y:0.78,icon:'hacker'},
    {id:'fake',    label:'피싱 서버\n99.99.99.99',x:0.92,y:0.5,icon:'server'}
  ],
  steps:[
    {from:'client',  to:'resolver',col:'#fff',   lbl:'DNS Query',  badge:'DNS-S01',title:'DNS 캐시 포이즈닝 개요',  desc:'리졸버 캐시에 위조 레코드 주입.',code:'목표: bank.com → 99.99.99.99\n(실제: 1.2.3.4)'},
    {from:'atk',     to:'resolver',col:'#ff4444',lbl:'위조 응답×65536',badge:'DNS-S02',title:'Kaminsky 공격',    desc:'Transaction ID 맞추기 위해 65536개 위조 응답.',code:'1) 서브도메인 질의 트리거\n2) 리졸버가 권한 서버 질의\n3) 위조 응답 × 65536:\n   ID: 0x0000~0xFFFF\n   Answer: bank.com→99.99.99.99', warn:'ID 맞으면 캐시에 저장!'},
    {from:'resolver',to:'fake',    col:'#ff8844',lbl:'피싱 서버로', badge:'DNS-S03',title:'캐시 오염 결과',          desc:'모든 클라이언트가 피싱 서버로.',code:'오염된 캐시:\nbank.com → 99.99.99.99 (TTL:3600)\n→ 크리덴셜 탈취', warn:'대응: DNSSEC, DoH, DoT'},
    {from:'atk',     to:'client',  col:'#ff4444',lbl:'로컬 위조',  badge:'DNS-S04',title:'로컬 MITM DNS 스푸핑',   desc:'ARP 스푸핑 후 DNS 응답 실시간 변조.',code:'1) ARP 스푸핑\n2) DNS Query 탐지 (UDP 53)\n3) 권한 응답 전 위조 삽입\n도구: dnsspoof, Ettercap', warn:'대응: DNSSEC, HSTS Preload'}
  ],
  glossary:[{sec:'DNS 스푸핑',terms:[
    {t:'DNS 캐시 포이즈닝',d:'리졸버 캐시에 위조 레코드 주입. Kaminsky 공격.'},
    {t:'DNSSEC',d:'DNS 응답 디지털 서명. 위조 응답 검증 가능.'},
    {t:'DoH/DoT',d:'DNS over HTTPS/TLS. DNS 트래픽 암호화.'}
  ]}]
};
