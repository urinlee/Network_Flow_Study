// INFRA: DHCP
TOPICS['infra_dhcp'] = {cat:'infra', label:'DHCP 동작',
  legend:[{c:'#fff',l:'브로드캐스트'},{c:'#aaa',l:'응답'}],
  devices:[
    {id:'client',label:'새 클라이언트\n(IP 없음)',   x:0.12,y:0.5,icon:'pc'},
    {id:'sw',    label:'스위치',                     x:0.42,y:0.5,icon:'switch'},
    {id:'dhcp',  label:'DHCP 서버\n192.168.1.1',     x:0.82,y:0.5,icon:'server'}
  ],
  steps:[
    {from:'client',to:'sw',  col:'#fff',lbl:'DISCOVER',badge:'DHCP-01',title:'DHCP Discover',desc:'새 클라이언트가 DHCP 서버를 찾기 위해 브로드캐스트.',code:'Src IP: 0.0.0.0\nDst IP: 255.255.255.255\nProtocol: UDP 67→68\nXID: 0x3903F326'},
    {from:'sw',  to:'dhcp',  col:'#fff',lbl:'DISCOVER',badge:'DHCP-02',title:'DHCP Offer',   desc:'DHCP 서버가 IP 제안.',code:'Your IP: 192.168.1.100\nSubnet: 255.255.255.0\nGateway: 192.168.1.1\nDNS: 8.8.8.8  Lease: 86400s'},
    {from:'client',to:'sw',  col:'#fff',lbl:'REQUEST', badge:'DHCP-03',title:'DHCP Request', desc:'클라이언트가 제안 수락.',code:'DORA:\nDiscover → Offer\n→ Request → Acknowledge'},
    {from:'dhcp',to:'sw',    col:'#aaa',lbl:'ACK',     badge:'DHCP-04',title:'DHCP ACK & 갱신',desc:'최종 확인. 임대 시간의 50%에 갱신.',code:'임대 갱신:\n50% (12h): 유니캐스트\n87.5% (21h): 브로드캐스트\n100% (24h): IP 반납'}
  ],
  glossary:[{sec:'DHCP',terms:[
    {t:'DHCP',d:'IP, 서브넷, 게이트웨이, DNS 자동 할당. UDP 67(서버)/68(클라이언트).'},
    {t:'DORA',d:'Discover-Offer-Request-Acknowledge. IP 할당 4단계.'},
    {t:'IP 임대',d:'일정 시간 빌려주는 방식. 만료 전 갱신, 만료 시 반납.'}
  ]}]
};
