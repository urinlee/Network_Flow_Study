// L2: ARP
TOPICS['l2_arp'] = {cat:'l2', label:'ARP 프로토콜',
  legend:[{c:'#fff',l:'ARP 요청 (브로드캐스트)'},{c:'#aaa',l:'ARP 응답 (유니캐스트)'}],
  devices:[
    {id:'ha',label:'호스트 A\n192.168.1.1\nAA:AA:01',x:0.1,y:0.5,icon:'pc'},
    {id:'sw',label:'스위치',                          x:0.42,y:0.5,icon:'switch'},
    {id:'hb',label:'호스트 B\n192.168.1.2\nBB:BB:02', x:0.75,y:0.3,icon:'pc'},
    {id:'hc',label:'호스트 C\n192.168.1.3\nCC:CC:03', x:0.75,y:0.7,icon:'pc'}
  ],
  steps:[
    {from:'ha',to:'sw',col:'#fff',lbl:'ARP Req',badge:'ARP-01',title:'ARP 요청 브로드캐스트',desc:'호스트 A가 192.168.1.2의 MAC을 브로드캐스트로 질의.',code:'[ARP Request]\nDst: FF:FF:FF:FF:FF:FF\nOpcode: 1 (Request)\nSender: 192.168.1.1 / AA:AA:01\nTarget IP: 192.168.1.2\nTarget MAC: 00:00:00:00:00:00'},
    {from:'sw',to:'hb', col:'#fff',lbl:'Flood→B',badge:'ARP-02',title:'스위치 플러딩',        desc:'브로드캐스트이므로 전체 플러딩.',code:'Src MAC 학습: AA:AA:01 → Port1\n플러딩 → Port2, Port3'},
    {from:'sw',to:'hc', col:'#fff',lbl:'Flood→C',badge:'ARP-03',title:'호스트 C 무시',        desc:'Target IP가 자신이 아니므로 Drop.',code:'Target IP: 192.168.1.2\n자신: 192.168.1.3 → 불일치\n→ Drop'},
    {from:'hb',to:'sw', col:'#aaa',lbl:'ARP Reply',badge:'ARP-04',title:'ARP Reply 유니캐스트',desc:'호스트 B가 MAC을 유니캐스트로 응답.',code:'[ARP Reply]\nOpcode: 2 (Reply)\nSender: 192.168.1.2 / BB:BB:02\nTarget: 192.168.1.1 / AA:AA:01'},
    {from:'sw',to:'ha', col:'#aaa',lbl:'Forward', badge:'ARP-05',title:'ARP 캐시 저장',        desc:'호스트 A가 캐시에 저장.',         code:'ARP Cache:\n192.168.1.2 → BB:BB:BB:BB:BB:02\n유효시간: ~20분'}
  ],
  glossary:[{sec:'ARP',terms:[
    {t:'ARP',d:'Address Resolution Protocol. IP→MAC 변환. UDP 기반. RFC 826.'},
    {t:'ARP 캐시',d:'IP-MAC 매핑 저장소. 명령어: arp -a.'},
    {t:'Gratuitous ARP',d:'자신의 IP로 ARP Request. IP 충돌 감지, MAC 변경 알림.'},
    {t:'Proxy ARP',d:'라우터가 다른 네트워크 호스트 대신 ARP 응답.'}
  ]}]
};
