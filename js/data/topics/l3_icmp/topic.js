// L3: ICMP
TOPICS['l3_icmp'] = {cat:'l3', label:'ICMP & ping/traceroute',
  legend:[{c:'#fff',l:'ICMP Request'},{c:'#888',l:'ICMP Reply'},{c:'#555',l:'Time Exceeded'}],
  devices:[
    {id:'ha',label:'호스트 A\n192.168.1.2',x:0.08,y:0.5,icon:'pc'},
    {id:'ra',label:'라우터 A',              x:0.30,y:0.5,icon:'router'},
    {id:'rb',label:'라우터 B',              x:0.55,y:0.5,icon:'router'},
    {id:'hb',label:'호스트 B\n10.0.0.5',  x:0.85,y:0.5,icon:'server'}
  ],
  steps:[
    {from:'ha',to:'ra',col:'#fff',lbl:'Echo Req',badge:'ICMP-01',title:'ping — ICMP Echo Request',desc:'ping은 ICMP Type 8으로 도달성과 RTT 확인.',code:'ICMP Type: 8 (Echo Request)\nIdentifier: 0x1234\nSeq: 1  TTL: 64'},
    {from:'ra',to:'ha',col:'#555',lbl:'TTL Exceeded',badge:'ICMP-02',title:'traceroute — TTL=1 만료',desc:'TTL=1부터 시작. 각 홉에서 Time Exceeded 수신.',code:'ICMP Type: 11 (Time Exceeded)\nSrc: 192.168.1.1 (RA)\n→ 1번 홉 IP 확인!'},
    {from:'rb',to:'ha',col:'#555',lbl:'TTL Exceeded',badge:'ICMP-03',title:'traceroute — TTL=2 만료',desc:'TTL을 하나씩 늘려가며 각 홉 IP 수집.',code:'traceroute 10.0.0.5:\n 1  192.168.1.1  2ms\n 2  10.1.1.2    5ms\n 3  10.0.0.5    8ms'},
    {from:'hb',to:'ha',col:'#888',lbl:'Echo Reply',badge:'ICMP-04',title:'ICMP Echo Reply',desc:'목적지 도달 시 Type 0으로 응답.',code:'ICMP Type: 0 (Echo Reply)\nRTT: ~8ms\nTTL: 61 (64 - 3홉)'}
  ],
  glossary:[{sec:'ICMP',terms:[
    {t:'ICMP',d:'IP 오류/진단 메시지 프로토콜. ping, traceroute에 사용.'},
    {t:'ping',d:'ICMP Echo Request/Reply로 도달성 및 RTT 측정.'},
    {t:'traceroute/tracert',d:'TTL을 1씩 증가시켜 각 홉 라우터 IP와 RTT 측정.'}
  ]}]
};
