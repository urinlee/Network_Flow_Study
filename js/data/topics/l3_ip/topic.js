// L3: IP
TOPICS['l3_ip'] = {cat:'l3', label:'IP 패킷 & 라우팅',
  legend:[{c:'#fff',l:'IP 패킷'},{c:'#aaa',l:'포워딩'},{c:'#666',l:'응답'}],
  devices:[
    {id:'ha',label:'호스트 A\n192.168.1.2',x:0.07,y:0.5,icon:'pc'},
    {id:'ra',label:'라우터 A\n192.168.1.1',x:0.28,y:0.5,icon:'router'},
    {id:'rb',label:'라우터 B\n코어',        x:0.5,y:0.25,icon:'router'},
    {id:'rc',label:'라우터 C\n엣지',        x:0.72,y:0.5,icon:'router'},
    {id:'hb',label:'호스트 B\n10.0.0.5',  x:0.90,y:0.5,icon:'server'}
  ],
  steps:[
    {from:'ha',to:'ra',col:'#fff',lbl:'IP Packet',badge:'L3-01',title:'IP 헤더 구조',         desc:'호스트 A가 IP 패킷 생성.',code:'[IPv4 Header 20B]\nVersion:4  IHL:5\nTTL: 64\nProtocol: 6 (TCP)\nSrc IP: 192.168.1.2\nDst IP: 10.0.0.5'},
    {from:'ra',to:'rb',col:'#aaa',lbl:'Forward',  badge:'L3-02',title:'라우팅 테이블 조회',   desc:'라우터 A가 넥스트 홉 결정. TTL 감소.',code:'Routing Table:\n0.0.0.0/0 → 10.1.1.2 (default)\nTTL: 64 → 63'},
    {from:'rb',to:'rc',col:'#aaa',lbl:'Forward',  badge:'L3-03',title:'OSPF/BGP 경로',        desc:'코어 라우터 B가 최적 경로로 포워딩.',code:'OSPF Cost: 10\nTTL: 63 → 62'},
    {from:'rc',to:'hb',col:'#fff',lbl:'Deliver',  badge:'L3-04',title:'Direct Delivery',      desc:'라우터 C에서 직접 전달. ARP로 MAC 조회.',code:'10.0.0.0/24 directly connected\nARP → BB:BB:BB:BB:BB:01\nTTL: 61'},
    {from:'hb',to:'rc',col:'#666',lbl:'ICMP Reply',badge:'L3-05',title:'서브네팅 & CIDR',    desc:'IP 주소 체계와 서브네팅.',code:'192.168.1.0/24\n마스크: 255.255.255.0\n호스트: 254개\nBC: 192.168.1.255'}
  ],
  glossary:[{sec:'L3 핵심',terms:[
    {t:'TTL',d:'Time To Live. 라우터 통과시 1 감소. 0이 되면 패킷 폐기 + ICMP Time Exceeded.'},
    {t:'OSPF',d:'링크 상태 라우팅. 다익스트라 알고리즘. Cost=100/대역폭.'},
    {t:'BGP',d:'AS 간 라우팅. 경로 벡터 방식. AS Path로 루프 방지.'},
    {t:'CIDR',d:'가변 길이 서브넷 마스크(VLSM). IP 주소 효율적 활용.'},
    {t:'NAT',d:'사설 IP↔공인 IP 변환. PAT(포트 기반)으로 여러 호스트가 공인 IP 공유.'}
  ]}]
};
