// L2: Ethernet
TOPICS['l2_ethernet'] = {cat:'l2', label:'이더넷 & 프레임',
  legend:[{c:'#fff',l:'프레임 전달'},{c:'#888',l:'MAC 학습'}],
  devices:[
    {id:'ha',label:'호스트 A\nAA:AA:AA:AA:AA:01',x:0.1,y:0.5,icon:'pc'},
    {id:'sw',label:'스위치\nMAC Table',           x:0.45,y:0.5,icon:'switch'},
    {id:'hb',label:'호스트 B\nBB:BB:BB:BB:BB:01', x:0.75,y:0.3,icon:'pc'},
    {id:'hc',label:'호스트 C\nCC:CC:CC:CC:CC:01', x:0.75,y:0.7,icon:'pc'}
  ],
  steps:[
    {from:'ha',to:'sw',col:'#fff',lbl:'Frame',badge:'L2-01',title:'이더넷 II 프레임 구조',desc:'호스트 A가 이더넷 프레임 생성.',code:'[Ethernet II]\nPreamble:  7B (동기화)\nSFD:       1B (시작)\nDst MAC:   BB:BB:BB:BB:BB:01\nSrc MAC:   AA:AA:AA:AA:AA:01\nEtherType: 0x0800 (IPv4)\nPayload:   46~1500B\nFCS:       4B (CRC-32)'},
    {from:'sw',to:'hb', col:'#fff',lbl:'Unicast', badge:'L2-02',title:'MAC 테이블 포워딩',   desc:'스위치가 Dst MAC으로 포트 결정.',  code:'[MAC Table]\nAA:AA:01 → Port1 (학습)\nBB:BB:01 → Port2\n→ Port2로 포워딩\nPort3 차단'},
    {from:'sw',to:'hc', col:'#888',lbl:'Flooding',badge:'L2-03',title:'플러딩 vs 유니캐스트',desc:'모르는 MAC은 플러딩.',            code:'플러딩 조건:\n1) Dst MAC 모를 때\n2) 브로드캐스트 FF:FF:FF:FF:FF:FF\n3) 멀티캐스트'},
    {from:'hb',to:'sw', col:'#888',lbl:'Reply',   badge:'L2-04',title:'VLAN',                desc:'하나의 스위치를 논리 분리.',       code:'VLAN 10: 개발팀 Port1,2\nVLAN 20: 영업팀 Port3,4\n→ VLAN간 브로드캐스트 격리\nTrunk: 802.1Q 태그 (4B)'}
  ],
  glossary:[{sec:'L2 핵심',terms:[
    {t:'MAC 주소',d:'48비트 물리 주소. 앞 24비트(OUI):제조사, 뒤 24비트:고유번호.'},
    {t:'FCS',d:'Frame Check Sequence. CRC-32 오류 검출. 오류 시 폐기.'},
    {t:'VLAN',d:'논리적 네트워크 분리. 브로드캐스트 도메인 분리. 802.1Q 태그.'},
    {t:'STP',d:'Spanning Tree Protocol. 스위치 루프 방지. 루프 경로 차단.'}
  ]}]
};
