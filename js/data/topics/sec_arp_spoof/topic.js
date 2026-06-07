// SEC: ARP Spoofing
TOPICS['sec_arp_spoof'] = {cat:'sec', label:'ARP 스푸핑 (MITM)',
  legend:[{c:'#fff',l:'정상'},{c:'#ff4444',l:'위조 ARP'},{c:'#ff8844',l:'도청'}],
  devices:[
    {id:'victim',label:'피해자 A\n192.168.1.1',   x:0.08,y:0.5,icon:'pc'},
    {id:'gw',    label:'게이트웨이\n192.168.1.254',x:0.5,y:0.18,icon:'router'},
    {id:'atk',   label:'공격자\n192.168.1.99',    x:0.5,y:0.82,icon:'hacker'},
    {id:'hb',    label:'피해자 B\n192.168.1.2',   x:0.88,y:0.5,icon:'pc'}
  ],
  steps:[
    {from:'victim',to:'gw',   col:'#fff',   lbl:'정상 통신',    badge:'ARP-S01',title:'[정상] ARP 기반 통신',        desc:'공격 전 정상 상태.',code:'피해자 A ARP 캐시:\n192.168.1.254 → CC:CC:01 (실제 GW)'},
    {from:'atk',  to:'victim',col:'#ff4444',lbl:'Fake Reply',   badge:'ARP-S02',title:'[공격] 위조 ARP → 피해자 A', desc:'공격자가 요청 없이 위조 Reply 전송.',code:'위조 ARP Reply:\nSrc IP: 192.168.1.254 (GW!)\nSrc MAC: BB:BB:01 (공격자!)\n→ 캐시 오염: GW IP → 공격자 MAC', warn:'ARP는 인증 없음\n요청 없이도 Reply 수신 가능'},
    {from:'atk',  to:'gw',    col:'#ff4444',lbl:'Fake Reply',   badge:'ARP-S03',title:'[공격] 위조 ARP → GW',       desc:'GW에도 피해자 A MAC이 공격자인 것처럼.',code:'GW ARP 캐시 오염:\n192.168.1.1 → BB:BB:01\n→ 양방향 MITM 완성', warn:'IP Forwarding ON:\necho 1 > /proc/sys/net/ipv4/ip_forward'},
    {from:'victim',to:'atk',  col:'#ff8844',lbl:'도청됨',       badge:'ARP-S04',title:'[도청] 트래픽 가로채기',      desc:'모든 패킷이 공격자 경유.',code:'도청 가능:\n- HTTP 평문\n- 쿠키, 세션\n- DNS 질의\n\n변조: SSLStrip (HTTPS→HTTP)', warn:'대응:\n- HTTPS/HSTS\n- DAI (Dynamic ARP Inspection)\n- 정적 ARP 엔트리'}
  ],
  glossary:[{sec:'ARP 스푸핑',terms:[
    {t:'ARP 스푸핑',d:'위조 ARP Reply로 캐시 오염. MITM 기반.'},
    {t:'DAI',d:'Dynamic ARP Inspection. DHCP Snooping DB로 ARP 검증.'},
    {t:'SSLStrip',d:'HTTPS→HTTP 다운그레이드. ARP 스푸핑과 결합.'}
  ]}]
};
