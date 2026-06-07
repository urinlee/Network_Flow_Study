// ================================================================
// CATEGORIES
// ================================================================
var CATS = [
  {id:'osi',    label:'OSI 모델',         atk:false},
  {id:'l2',     label:'L2 데이터링크',    atk:false},
  {id:'l3',     label:'L3 네트워크',      atk:false},
  {id:'l4',     label:'L4 전송',          atk:false},
  {id:'app',    label:'응용 계층',        atk:false},
  {id:'infra',  label:'네트워크 인프라',  atk:false},
  {id:'secsys', label:'정보보호 시스템',  atk:false},
  {id:'sec',    label:'네트워크 공격',    atk:true}
];

// ================================================================
// TOPIC DATA
// ================================================================
var TOPICS = {};

// ---- OSI ----
TOPICS['osi_model'] = {cat:'osi', label:'OSI 7계층 모델',
  legend:[{c:'#fff',l:'데이터 흐름 (송신)'},{c:'#888',l:'데이터 흐름 (수신)'}],
  devices:[
    {id:'app7',  label:'7. 응용 (Application)\nHTTP,FTP,DNS',    x:0.5,y:0.08,icon:'pc'},
    {id:'pres6', label:'6. 표현 (Presentation)\nSSL/TLS,압축',    x:0.5,y:0.20,icon:'pc'},
    {id:'sess5', label:'5. 세션 (Session)\n세션관리,동기화',       x:0.5,y:0.32,icon:'pc'},
    {id:'trans4',label:'4. 전송 (Transport)\nTCP/UDP,포트',        x:0.5,y:0.44,icon:'router'},
    {id:'net3',  label:'3. 네트워크 (Network)\nIP,ICMP,라우팅',    x:0.5,y:0.56,icon:'router'},
    {id:'dl2',   label:'2. 데이터링크 (Data Link)\nMAC,ARP,프레임',x:0.5,y:0.68,icon:'switch'},
    {id:'phy1',  label:'1. 물리 (Physical)\n비트,전기신호,케이블', x:0.5,y:0.82,icon:'hub'}
  ],
  steps:[
    {from:'app7', to:'pres6', col:'#fff',lbl:'L7→L6',badge:'OSI-07',title:'[L7] 응용 계층',   desc:'사용자와 가장 가까운 계층. 사용자 인터페이스 및 프로토콜 제공. PDU: 메시지.',           code:'프로토콜: HTTP, HTTPS, FTP\n        SMTP, DNS, DHCP, SSH\nPDU: 메시지(Message)\n장비: 없음 (소프트웨어)'},
    {from:'pres6',to:'sess5', col:'#fff',lbl:'L6→L5',badge:'OSI-06',title:'[L6] 표현 계층',   desc:'데이터 형식 변환, 암호화/복호화, 압축/해제.',                                             code:'기능: 인코딩(UTF-8)\n     암호화(SSL/TLS)\n     압축(JPEG,ZIP)\nPDU: 데이터(Data)'},
    {from:'sess5',to:'trans4',col:'#fff',lbl:'L5→L4',badge:'OSI-05',title:'[L5] 세션 계층',   desc:'통신 세션 설정·유지·종료 관리. 체크포인트로 복구 지원.',                                  code:'기능: 세션 설정/유지/종료\n     동기화(Sync Point)\n프로토콜: NetBIOS, RPC, NFS'},
    {from:'trans4',to:'net3', col:'#fff',lbl:'L4→L3',badge:'OSI-04',title:'[L4] 전송 계층',   desc:'종단 간 신뢰성 전송. 포트 번호로 프로세스 식별. 흐름·오류 제어.',                         code:'프로토콜: TCP, UDP\nPDU: 세그먼트(TCP)/데이터그램(UDP)\n장비: L4 스위치, 방화벽'},
    {from:'net3', to:'dl2',   col:'#fff',lbl:'L3→L2',badge:'OSI-03',title:'[L3] 네트워크 계층',desc:'IP 기반 경로 결정 및 패킷 전달.',                                                         code:'프로토콜: IPv4/v6, ICMP, OSPF, BGP\nPDU: 패킷(Packet)\n장비: 라우터, L3 스위치'},
    {from:'dl2',  to:'phy1',  col:'#fff',lbl:'L2→L1',badge:'OSI-02',title:'[L2] 데이터링크 계층',desc:'MAC 기반 프레임 전달. 오류 검출(FCS).',                                               code:'프로토콜: Ethernet, Wi-Fi(802.11)\n        ARP, PPP\nPDU: 프레임(Frame)\n장비: 스위치, 브리지'},
    {from:'phy1', to:'dl2',   col:'#888',lbl:'L1→L2',badge:'OSI-01',title:'[L1] 물리 계층',   desc:'비트를 전기·광·전파 신호로 변환해 전송.',                                                  code:'PDU: 비트(Bit)\n매체: UTP, 광케이블, 무선\n장비: 허브, 리피터, 케이블'}
  ],
  glossary:[{sec:'OSI 모델',terms:[
    {t:'OSI 7계층',d:'ISO 정의 네트워크 표준 모델. 통신을 7개 계층으로 분리해 표준화.'},
    {t:'PDU',d:'Protocol Data Unit. L4:세그먼트/데이터그램, L3:패킷, L2:프레임, L1:비트.'},
    {t:'캡슐화/역캡슐화',d:'송신: 상위→하위 계층으로 헤더 추가. 수신: 하위→상위 계층으로 헤더 제거.'},
    {t:'TCP/IP 4계층',d:'네트워크접근(L1+L2) / 인터넷(L3) / 전송(L4) / 응용(L5~L7).'}
  ]}]
};

// ---- L2: Ethernet ----
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

// ---- L2: ARP ----
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

// ---- L3: IP ----
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

// ---- L3: ICMP ----
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

// ---- L4: TCP ----
TOPICS['l4_tcp'] = {cat:'l4', label:'TCP 연결 & 상태',
  legend:[{c:'#fff',l:'TCP 제어'},{c:'#aaa',l:'데이터'},{c:'#666',l:'종료'}],
  devices:[
    {id:'client',label:'클라이언트\n192.168.1.2',x:0.2,y:0.5,icon:'pc'},
    {id:'server',label:'서버\n10.0.0.5:80',     x:0.8,y:0.5,icon:'server'}
  ],
  steps:[
    {from:'client',to:'server',col:'#fff',lbl:'SYN',    badge:'TCP-01',title:'3-Way Handshake — SYN',   desc:'클라이언트가 서버에 연결 요청. ISN 무작위 생성.',code:'Flags: 0x002 (SYN)\nSeq: 1000 (ISN)\nDst Port: 80\nWindow: 65535'},
    {from:'server',to:'client',col:'#fff',lbl:'SYN-ACK',badge:'TCP-02',title:'3-Way Handshake — SYN-ACK',desc:'서버가 자신의 ISN 설정 후 응답.',code:'Flags: 0x012 (SYN+ACK)\nSeq: 5000  Ack: 1001'},
    {from:'client',to:'server',col:'#fff',lbl:'ACK',    badge:'TCP-03',title:'3-Way Handshake — ACK',   desc:'ACK 전송으로 연결 수립.',code:'Flags: 0x010 (ACK)\nAck: 5001\n→ ESTABLISHED'},
    {from:'client',to:'server',col:'#aaa',lbl:'Data',   badge:'TCP-04',title:'슬라이딩 윈도우',          desc:'윈도우 크기만큼 ACK 없이 연속 전송.',code:'Window: 65535\nSend: Seq1,2,3 → ACK 대기\n혼잡제어: Slow Start\ncwnd: 1→2→4→8...'},
    {from:'client',to:'server',col:'#666',lbl:'FIN',    badge:'TCP-05',title:'4-Way Handshake — 종료',   desc:'FIN-ACK-FIN-ACK로 안전하게 종료.',code:'1) Client → FIN\n2) Server → ACK\n3) Server → FIN\n4) Client → ACK\nTIME_WAIT: 2MSL'},
    {from:'server',to:'client',col:'#666',lbl:'FIN-ACK',badge:'TCP-06',title:'TCP 상태',                 desc:'CLOSED→LISTEN→ESTABLISHED→TIME_WAIT→CLOSED.',code:'주요 상태:\nLISTEN: 서버 대기\nSYN_SENT: SYN 전송 후\nESTABLISHED: 연결 수립\nTIME_WAIT: 2MSL 대기'}
  ],
  glossary:[{sec:'TCP',terms:[
    {t:'ISN',d:'Initial Sequence Number. 무작위 생성(RFC 6528). IP 스푸핑 방어.'},
    {t:'슬라이딩 윈도우',d:'ACK 없이 한 번에 전송 가능한 데이터 크기. 수신 버퍼에 따라 동적 조정.'},
    {t:'MSS',d:'Maximum Segment Size. 보통 1460B (1500 MTU - 40 헤더).'},
    {t:'TIME_WAIT',d:'연결 종료 후 2MSL 대기. 지연 패킷 처리.'},
    {t:'혼잡 제어',d:'Slow Start: cwnd 지수 증가 → Congestion Avoidance: 선형 증가.'}
  ]}]
};

// ---- L4: UDP ----
TOPICS['l4_udp'] = {cat:'l4', label:'UDP & 포트',
  legend:[{c:'#fff',l:'UDP 데이터그램'},{c:'#aaa',l:'응답'}],
  devices:[
    {id:'client',label:'클라이언트\n192.168.1.2',x:0.15,y:0.5,icon:'pc'},
    {id:'dns',   label:'DNS 서버\n8.8.8.8:53',  x:0.5,y:0.2,icon:'dns'},
    {id:'server',label:'스트리밍 서버',          x:0.85,y:0.5,icon:'server'}
  ],
  steps:[
    {from:'client',to:'dns',col:'#fff',lbl:'DNS Query',badge:'UDP-01',title:'UDP 헤더',desc:'8바이트 단순 헤더. 연결 없이 즉시 전송.',code:'[UDP Header 8B]\nSrc Port: 54321\nDst Port: 53 (DNS)\nLength: 28\nChecksum: 0x...\n\nTCP 없음: 연결/신뢰성/순서'},
    {from:'dns',to:'client',col:'#aaa',lbl:'DNS Reply',badge:'UDP-02',title:'잘 알려진 포트',desc:'Well-Known Port(0~1023) 표준 서비스.',code:'20/21: FTP\n22: SSH  23: Telnet\n25: SMTP  53: DNS\n80: HTTP  443: HTTPS\n3306: MySQL'},
    {from:'client',to:'server',col:'#fff',lbl:'Stream',badge:'UDP-03',title:'UDP 사용 사례',desc:'실시간성이 중요한 서비스에 사용.',code:'DNS, DHCP: 빠른 응답\nVoIP: 실시간성\n스트리밍: 버퍼로 보완\nQUIC(HTTP/3): UDP+신뢰성'},
    {from:'server',to:'client',col:'#aaa',lbl:'Stream',badge:'UDP-04',title:'TCP vs UDP',desc:'특성 비교.',code:'      TCP     UDP\n연결:  O       X\n신뢰:  O       X\n속도:  느림    빠름\n헤더:  20B     8B'}
  ],
  glossary:[{sec:'UDP & 포트',terms:[
    {t:'UDP',d:'User Datagram Protocol. 비연결, 비신뢰성. 실시간 통신에 적합.'},
    {t:'포트 번호',d:'0~1023: Well-Known, 1024~49151: Registered, 49152~65535: Dynamic.'},
    {t:'소켓',d:'IP주소+포트 쌍. 4-tuple(Src IP, Port, Dst IP, Port)로 연결 식별.'}
  ]}]
};

// ---- APP: DNS ----
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

// ---- APP: HTTP ----
TOPICS['app_http'] = {cat:'app', label:'HTTP/HTTPS',
  legend:[{c:'#fff',l:'요청'},{c:'#aaa',l:'응답'},{c:'#666',l:'TLS'}],
  devices:[
    {id:'client',label:'클라이언트',      x:0.15,y:0.5,icon:'pc'},
    {id:'server',label:'웹 서버\n:443',   x:0.85,y:0.5,icon:'server'}
  ],
  steps:[
    {from:'client',to:'server',col:'#666',lbl:'TLS Hello',badge:'HTTP-01',title:'TLS 핸드셰이크',      desc:'HTTPS는 TLS로 암호화. ClientHello에서 암호화 방식 협상.',code:'TLS 1.3:\n1) ClientHello: 버전,CipherSuite\n2) ServerHello: 인증서\n3) 세션키 교환(ECDHE)\n4) Finished'},
    {from:'server',to:'client',col:'#666',lbl:'ServerHello', badge:'HTTP-02',title:'인증서 검증',        desc:'CA 체인으로 인증서 검증. 공개키로 세션키 교환.',code:'검증:\n1) 유효기간\n2) CA 서명 검증\n3) 도메인 일치\n4) CRL/OCSP 폐기 확인'},
    {from:'client',to:'server',col:'#fff',lbl:'HTTP GET',   badge:'HTTP-03',title:'HTTP 요청 구조',     desc:'HTTP 요청의 메서드, 헤더, 바디.',code:'GET /index.html HTTP/1.1\nHost: www.example.com\nAccept: text/html\nCookie: session=abc\n\nGET/POST/PUT/DELETE'},
    {from:'server',to:'client',col:'#aaa',lbl:'200 OK',     badge:'HTTP-04',title:'HTTP 응답 & 상태코드',desc:'상태코드와 헤더.',code:'HTTP/1.1 200 OK\nContent-Type: text/html\n\n2xx:성공 3xx:리다이렉트\n4xx:클라이언트오류\n5xx:서버오류'}
  ],
  glossary:[{sec:'HTTP/HTTPS',terms:[
    {t:'TLS',d:'Transport Layer Security. HTTPS 암호화 계층. 인증서로 서버 인증.'},
    {t:'HTTP/2',d:'멀티플렉싱, 헤더 압축(HPACK), 서버 푸시 지원.'},
    {t:'HTTP/3 (QUIC)',d:'UDP 기반. 빠른 연결(0-RTT). 멀티플렉싱.'}
  ]}]
};

// ---- INFRA: DHCP ----
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

// ---- INFRA: NAT ----
TOPICS['infra_nat'] = {cat:'infra', label:'NAT & PAT',
  legend:[{c:'#fff',l:'내부→외부'},{c:'#aaa',l:'역변환'}],
  devices:[
    {id:'ha', label:'호스트 A\n192.168.1.2',   x:0.08,y:0.35,icon:'pc'},
    {id:'hb', label:'호스트 B\n192.168.1.3',   x:0.08,y:0.65,icon:'pc'},
    {id:'nat',label:'NAT 라우터\n공인: 1.2.3.4',x:0.45,y:0.5,icon:'router'},
    {id:'web',label:'외부 서버\n5.6.7.8:80',   x:0.88,y:0.5,icon:'server'}
  ],
  steps:[
    {from:'ha', to:'nat',col:'#fff',lbl:'내부 패킷',badge:'NAT-01',title:'PAT 동작',    desc:'여러 내부 호스트가 하나의 공인 IP를 포트로 구분해 공유.',code:'내부: 192.168.1.2:54321\n변환: 1.2.3.4:40001\n\nNAT 테이블:\n1.2.3.4:40001 ↔ 192.168.1.2:54321'},
    {from:'hb', to:'nat',col:'#fff',lbl:'내부 패킷',badge:'NAT-02',title:'NAT 종류',    desc:'Static/Dynamic/PAT 세 종류.',code:'1) Static NAT: 1:1 고정\n2) Dynamic NAT: Pool 동적\n3) PAT (NAPT): 포트 다중화\n   → 가정용 공유기'},
    {from:'nat',to:'web',col:'#fff',lbl:'변환 패킷',badge:'NAT-03',title:'포트 포워딩', desc:'외부에서 내부 서버 접속 시.',code:'[DNAT]\n외부: 1.2.3.4:8080\n→ 내부: 192.168.1.10:80'},
    {from:'web',to:'nat',col:'#aaa',lbl:'응답',    badge:'NAT-04',title:'역변환',       desc:'NAT 테이블로 올바른 호스트에 전달.',code:'응답: Dst=1.2.3.4:40001\n→ 역변환 → 192.168.1.2:54321'}
  ],
  glossary:[{sec:'NAT',terms:[
    {t:'NAT',d:'사설 IP↔공인 IP 변환. IPv4 주소 부족 해결.'},
    {t:'PAT (NAPT)',d:'포트 번호로 다중 호스트를 하나의 공인 IP에 매핑. 가정용 공유기.'},
    {t:'포트 포워딩',d:'특정 포트로 들어온 요청을 내부 서버로 전달.'}
  ]}]
};

// ---- INFRA: FW ----
TOPICS['infra_fw'] = {cat:'infra', label:'방화벽 & IDS/IPS',
  legend:[{c:'#fff',l:'허용'},{c:'#ff4444',l:'차단'},{c:'#aaa',l:'검사'}],
  devices:[
    {id:'internet',label:'인터넷',         x:0.08,y:0.5,icon:'cloud'},
    {id:'fw',      label:'방화벽 (L3/L4)', x:0.35,y:0.5,icon:'firewall'},
    {id:'ids',     label:'IDS/IPS (L7)',   x:0.62,y:0.5,icon:'server'},
    {id:'dmz',     label:'DMZ 웹서버',     x:0.88,y:0.3,icon:'server'},
    {id:'lan',     label:'내부 LAN',       x:0.88,y:0.7,icon:'pc'}
  ],
  steps:[
    {from:'internet',to:'fw', col:'#fff',   lbl:'HTTP 80', badge:'FW-01',title:'패킷 필터링 (Stateless)',desc:'IP/포트 기반 ACL. 각 패킷 독립 검사.',code:'ACL 규칙:\n1. PERMIT TCP any → DMZ:80\n2. PERMIT TCP any → DMZ:443\n3. DENY TCP any → LAN\n4. DENY all (묵시적)'},
    {from:'fw',     to:'ids', col:'#fff',   lbl:'허용',    badge:'FW-02',title:'Stateful 방화벽',         desc:'TCP 연결 상태 추적. 응답 패킷 자동 허용.',code:'연결 테이블:\n1.2.3.4:54321→10.0.0.5:80 ESTABLISHED\n→ 응답 자동 허용\n→ SYN+FIN 등 비정상 차단'},
    {from:'ids',    to:'dmz', col:'#fff',   lbl:'Clean',   badge:'FW-03',title:'IDS/IPS (L7 DPI)',       desc:'딥 패킷 검사. 앱 레이어 공격 분석.',code:'탐지 방식:\n1) 시그니처: 알려진 패턴\n2) 이상행위: 정상 Baseline 기준\nIDS: 탐지만  IPS: 탐지+차단'},
    {from:'ids',    to:'lan', col:'#ff4444',lbl:'BLOCK',   badge:'FW-04',title:'DMZ 아키텍처',            desc:'외부-DMZ-내부 3단계 보안.',code:'인터넷 → FW1 → DMZ → FW2 → LAN\nDMZ: 웹/메일/DNS 서버\n인터넷→LAN: DENY all'}
  ],
  glossary:[{sec:'방화벽/IDS',terms:[
    {t:'Stateless vs Stateful',d:'Stateless: 패킷 독립 검사(빠름). Stateful: 연결 상태 추적(정확).'},
    {t:'DMZ',d:'외부 접근 허용 서버 구역. 내부 LAN과 분리.'},
    {t:'WAF',d:'Web App Firewall. SQL 인젝션, XSS 등 웹 공격 방어. L7 검사.'}
  ]}]
};

// ---- SECSYS: Firewall ----
TOPICS['secsys_fw'] = {cat:'secsys', label:'방화벽 (Firewall)',
  legend:[{c:'#fff',l:'허용'},{c:'#ff4444',l:'차단'},{c:'#aaa',l:'세션 추적'}],
  devices:[
    {id:'internet',label:'인터넷',          x:0.08,y:0.5,icon:'cloud'},
    {id:'fw',      label:'방화벽',          x:0.38,y:0.5,icon:'firewall'},
    {id:'dmz',     label:'DMZ\n웹/메일',    x:0.68,y:0.28,icon:'server'},
    {id:'lan',     label:'내부 LAN',        x:0.68,y:0.72,icon:'pc'},
    {id:'admin',   label:'관리자 콘솔',     x:0.92,y:0.5,icon:'pc'}
  ],
  steps:[
    {from:'internet',to:'fw', col:'#fff',   lbl:'패킷',    badge:'FW-01',title:'1세대: 패킷 필터링',  desc:'IP/포트/프로토콜 기반 ACL. Stateless.',code:'ACL:\n1. PERMIT TCP any→DMZ:80\n2. PERMIT TCP any→DMZ:443\n3. DENY TCP any→LAN\n4. DENY IP any (묵시적)'},
    {from:'internet',to:'fw', col:'#aaa',   lbl:'세션',    badge:'FW-02',title:'2세대: Stateful 방화벽',desc:'연결 상태 테이블 유지.',code:'연결 테이블:\n1.2.3.4:54321→10.0.0.5:80 ESTABLISHED\n→ 응답 자동 허용\n→ 비정상 플래그 차단'},
    {from:'fw',     to:'dmz', col:'#fff',   lbl:'허용',    badge:'FW-03',title:'3세대: NGFW',          desc:'L7 앱 인식, SSL 복호화, IPS 내장.',code:'NGFW 기능:\n- 앱 인식 (Facebook→차단)\n- SSL/TLS 복호화\n- 사용자 기반 정책 (AD연동)\n- IPS 시그니처 내장'},
    {from:'fw',     to:'lan', col:'#ff4444',lbl:'차단',    badge:'FW-04',title:'DMZ 보안 정책',        desc:'외부↔DMZ↔내부 3단계.',code:'인터넷→DMZ: 80,443,25 허용\nDMZ→LAN: 최소화\n인터넷→LAN: DENY all'},
    {from:'fw',     to:'admin',col:'#aaa',  lbl:'로그',    badge:'FW-05',title:'로깅 & 운영',          desc:'SIEM 연동으로 실시간 모니터링.',code:'로그: Timestamp|Src|Dst|Action\n운영:\n- Implicit Deny 확인\n- 불필요한 규칙 정기 제거\n- 이중화(Active-Standby)'}
  ],
  glossary:[{sec:'방화벽',terms:[
    {t:'패킷 필터링',d:'1세대. IP/포트/프로토콜 ACL. Stateless. 빠르나 상태 추적 불가.'},
    {t:'Stateful Inspection',d:'2세대. 연결 상태 테이블. 비정상 패킷 차단.'},
    {t:'NGFW',d:'3세대. L7 앱 인식, SSL 복호화, IPS 내장.'},
    {t:'묵시적 거부',d:'ACL 마지막에 모든 트래픽 차단. 명시적 허용 없으면 모두 차단.'}
  ]}]
};

// ---- SECSYS: IDS ----
TOPICS['secsys_ids'] = {cat:'secsys', label:'IDS — 침입탐지시스템',
  legend:[{c:'#fff',l:'정상'},{c:'#ff4444',l:'공격'},{c:'#ffaa00',l:'탐지 알람'}],
  devices:[
    {id:'internet',label:'인터넷',             x:0.08,y:0.5,icon:'cloud'},
    {id:'tap',     label:'TAP/SPAN\n트래픽 복사',x:0.35,y:0.5,icon:'switch'},
    {id:'ids',     label:'IDS (탐지 전용)',     x:0.35,y:0.82,icon:'server'},
    {id:'server',  label:'내부 서버',           x:0.72,y:0.5,icon:'server'},
    {id:'soc',     label:'SOC / 보안관제',      x:0.72,y:0.82,icon:'pc'}
  ],
  steps:[
    {from:'internet',to:'tap',col:'#fff',   lbl:'트래픽',   badge:'IDS-01',title:'IDS 개요 — Out-of-Band',  desc:'트래픽 복사본 분석. 성능 영향 없음. 탐지만.',code:'배치:\n인터넷→스위치→서버\n         ↓ SPAN/TAP\n        IDS(복사본)\n특징: 탐지만, 차단 불가'},
    {from:'tap',    to:'ids', col:'#ff4444',lbl:'미러링',    badge:'IDS-02',title:'시그니처 기반 탐지',       desc:'알려진 공격 패턴 매칭. Zero-day 탐지 불가.',code:'Snort 시그니처:\nalert tcp any any → any 80\n(content:"../../";\nmsg:"Dir Traversal")'},
    {from:'tap',    to:'ids', col:'#ffaa00',lbl:'이상 탐지', badge:'IDS-03',title:'이상행위 탐지 (Anomaly)',  desc:'Baseline 대비 이탈 탐지. Zero-day 가능하나 FP 높음.',code:'통계 기반:\n평균: 100Mbps → 임계치: 300Mbps\n초과 → 알람\n\nML 기반: 정상 패턴 학습'},
    {from:'ids',    to:'soc', col:'#ffaa00',lbl:'알람',      badge:'IDS-04',title:'NIDS vs HIDS',             desc:'NIDS: 네트워크. HIDS: 호스트 내부.',code:'NIDS: 네트워크 경계, Snort, Suricata\nHIDS: 각 서버 에이전트\n      파일무결성, 시스템콜\n      OSSEC, Wazuh'},
    {from:'ids',    to:'soc', col:'#ff4444',lbl:'이벤트',    badge:'IDS-05',title:'탐지 성능 지표',           desc:'FP/FN 최소화가 목표.',code:'TP: 공격 → 탐지 ✓\nFP: 정상 → 탐지 (오탐)\nFN: 공격 → 미탐 (미탐)\n탐지율=TP/(TP+FN)'}
  ],
  glossary:[{sec:'IDS',terms:[
    {t:'IDS',d:'Intrusion Detection System. 탐지 후 알람만. 차단 불가. Out-of-Band.'},
    {t:'시그니처 탐지',d:'알려진 공격 패턴. 빠르고 정확. Zero-day 불가.'},
    {t:'이상행위 탐지',d:'Baseline 기준 이탈 탐지. Zero-day 가능. FP 높음.'},
    {t:'SIEM',d:'다양한 보안 로그 수집·상관분석·시각화.'}
  ]}]
};

// ---- SECSYS: IPS ----
TOPICS['secsys_ips'] = {cat:'secsys', label:'IPS — 침입방지시스템',
  legend:[{c:'#fff',l:'허용'},{c:'#ff4444',l:'차단'},{c:'#ffaa00',l:'알람'}],
  devices:[
    {id:'internet',label:'인터넷',            x:0.08,y:0.5,icon:'cloud'},
    {id:'ips',     label:'IPS (인라인)',       x:0.42,y:0.5,icon:'firewall'},
    {id:'server',  label:'내부 서버',          x:0.78,y:0.5,icon:'server'},
    {id:'soc',     label:'SOC 콘솔',           x:0.78,y:0.82,icon:'pc'}
  ],
  steps:[
    {from:'internet',to:'ips',col:'#fff',   lbl:'트래픽',       badge:'IPS-01',title:'IPS 인라인 배치',          desc:'트래픽 경로에 직접 배치. 실시간 차단.',code:'배치: 인터넷→IPS→서버\n모든 트래픽 IPS 통과\nIDS vs IPS:\n  IDS: Out-of-Band, 탐지만\n  IPS: Inline, 탐지+차단'},
    {from:'internet',to:'ips',col:'#ff4444',lbl:'SQL Injection', badge:'IPS-02',title:'실시간 차단',               desc:'SQL 인젝션, XSS 등 즉시 탐지·차단.',code:'탐지 후 차단:\n1) Drop: 패킷 폐기\n2) Reset: TCP RST\n3) Shun: 발신 IP 블랙리스트'},
    {from:'ips',    to:'server',col:'#fff',  lbl:'정상',         badge:'IPS-03',title:'IPS 운영 모드',             desc:'학습→혼합→차단 단계적 적용.',code:'1단계: 탐지모드 (2~4주)\n2단계: 혼합모드\n3단계: 차단모드\n→ 오탐 검증 후 적용'},
    {from:'ips',    to:'soc',  col:'#ffaa00',lbl:'이벤트',       badge:'IPS-04',title:'HIPS',                      desc:'호스트에 설치. 시스템 콜·프로세스·파일 감시.',code:'HIPS:\nnotepad→cmd.exe → 차단\n/etc/passwd 변경 → 차단\nSELinux, AppArmor'},
    {from:'ips',    to:'soc',  col:'#ff4444',lbl:'차단 리포트',  badge:'IPS-05',title:'IPS 한계',                  desc:'암호화 트래픽, Zero-day, APT에 한계.',code:'한계:\n1) HTTPS 내부 검사 불가\n   → SSL 프록시 필요\n2) Zero-day: 시그니처 없음\n3) APT: 느린 공격 → 회피'}
  ],
  glossary:[{sec:'IPS',terms:[
    {t:'IPS',d:'Intrusion Prevention System. 인라인 배치. 실시간 탐지+차단.'},
    {t:'인라인 배치',d:'트래픽 경로에 직접 배치. 모든 패킷 IPS 통과. 지연 발생 가능.'},
    {t:'DPI',d:'Deep Packet Inspection. 헤더뿐 아니라 페이로드까지 검사.'},
    {t:'APT',d:'Advanced Persistent Threat. 장기간 은밀한 공격. 방어 어려움.'}
  ]}]
};

// ---- SECSYS: VPN ----
TOPICS['secsys_vpn'] = {cat:'secsys', label:'VPN (가상사설망)',
  legend:[{c:'#fff',l:'암호화 터널'},{c:'#aaa',l:'인증'},{c:'#555',l:'일반 트래픽'}],
  devices:[
    {id:'client',  label:'원격 사용자\n192.168.2.10', x:0.08,y:0.5,icon:'pc'},
    {id:'internet',label:'인터넷',                    x:0.40,y:0.5,icon:'cloud'},
    {id:'vpngw',   label:'VPN 게이트웨이',            x:0.70,y:0.5,icon:'firewall'},
    {id:'intranet',label:'내부망\n172.16.0.0/16',     x:0.92,y:0.5,icon:'server'}
  ],
  steps:[
    {from:'client',  to:'vpngw',  col:'#aaa',lbl:'IKE Phase1',badge:'VPN-01',title:'IPsec — IKE Phase 1',desc:'ISAKMP SA 수립. 보안 채널 생성.',code:'협상:\n- 암호화: AES-256\n- 해시: SHA-256\n- 인증: PSK/인증서\n- DH 그룹: Group14\nMain Mode(6 msg) vs Aggressive(3 msg)'},
    {from:'client',  to:'vpngw',  col:'#aaa',lbl:'IKE Phase2',badge:'VPN-02',title:'IPsec — IKE Phase 2',desc:'IPsec SA 수립. 실제 데이터 암호화 협상.',code:'Quick Mode:\n- ESP (암호화) or AH (인증만)\n- AES-256-GCM\n- PFS (Perfect Forward Secrecy)\n터널모드: 전체 패킷 암호화'},
    {from:'client',  to:'internet',col:'#555',lbl:'암호화 전',  badge:'VPN-03',title:'SSL/TLS VPN',        desc:'웹 브라우저 기반. 포트 443 사용.',code:'방식:\n1) 클라이언트리스: 브라우저만\n2) 씬클라이언트: 플러그인\n3) 풀터널: 클라이언트 설치\nSplit Tunneling 지원'},
    {from:'internet',to:'vpngw',  col:'#fff',lbl:'암호화 패킷', badge:'VPN-04',title:'ESP 패킷 구조',      desc:'ESP로 암호화된 패킷 구조.',code:'[새 IP 헤더]\n[ESP 헤더] SPI + Seq\n[암호화]\n  [원본 IP 헤더]\n  [TCP/UDP]\n  [페이로드]\n[ESP 트레일러] Auth Tag'},
    {from:'vpngw',   to:'intranet',col:'#fff',lbl:'복호화 후',  badge:'VPN-05',title:'VPN 종류',           desc:'Remote Access, Site-to-Site, MPLS.',code:'1) Remote Access: 개인→회사\n2) Site-to-Site: 본사↔지사\n3) MPLS VPN: 통신사 전용선\nZero Trust → ZTNA (차세대 VPN)'}
  ],
  glossary:[{sec:'VPN',terms:[
    {t:'IPsec',d:'IP 계층 암호화. AH(인증), ESP(암호화+인증). IKE로 키 협상.'},
    {t:'IKE',d:'Internet Key Exchange. Phase1: ISAKMP SA. Phase2: IPsec SA. UDP 500/4500.'},
    {t:'ESP',d:'Encapsulating Security Payload. 암호화+인증. 프로토콜 번호 50.'},
    {t:'PFS',d:'Perfect Forward Secrecy. 세션별 독립 키. 과거 세션 안전.'},
    {t:'Split Tunneling',d:'회사 트래픽만 터널, 인터넷은 로컬. 성능↑ vs 보안위험.'}
  ]}]
};

// ---- SECSYS: Secure OS ----
TOPICS['secsys_secureos'] = {cat:'secsys', label:'Secure OS & 접근제어',
  legend:[{c:'#fff',l:'허용'},{c:'#ff4444',l:'거부'},{c:'#aaa',l:'감사 로그'}],
  devices:[
    {id:'user',    label:'사용자/프로세스',        x:0.1,y:0.5,icon:'pc'},
    {id:'kernel',  label:'보안 커널 (TCB)',         x:0.42,y:0.5,icon:'firewall'},
    {id:'resource',label:'자원\n(파일/포트)',       x:0.78,y:0.5,icon:'server'},
    {id:'audit',   label:'감사 서버',               x:0.78,y:0.82,icon:'server'}
  ],
  steps:[
    {from:'user',   to:'kernel',  col:'#fff',   lbl:'접근 요청',badge:'SOS-01',title:'TCB & 참조 모니터',     desc:'Secure OS 핵심: TCB. 모든 접근 참조 모니터 통과.',code:'TCB 구성:\n- 보안 커널\n- 보안 정책 DB\n- 참조 모니터\n참조 모니터 조건:\n완전성·고립성·검증가능성'},
    {from:'kernel', to:'resource',col:'#fff',   lbl:'MAC 허용', badge:'SOS-02',title:'MAC — 강제 접근 제어',  desc:'보안 레이블 기반. 사용자 임의 변경 불가.',code:'Bell-LaPadula (기밀성):\n  No Read Up\n  No Write Down\nBiba (무결성):\n  No Read Down\n  No Write Up'},
    {from:'kernel', to:'resource',col:'#ff4444',lbl:'DAC 거부', badge:'SOS-03',title:'DAC & RBAC',            desc:'DAC: 소유자 권한 설정. RBAC: 역할 기반.',code:'DAC (Linux):\nrwxr-xr-- 754\nchmod 754 file.txt\n\nRBAC:\n홍길동→개발자→코드 읽기/쓰기'},
    {from:'kernel', to:'resource',col:'#fff',   lbl:'SELinux',  badge:'SOS-04',title:'SELinux',               desc:'타입 집행(TE) 기반 MAC. RHEL 기본 탑재.',code:'컨텍스트: user:role:type:level\nhttpd_t → httpd_content_t만 허용\n→ /etc/passwd 접근 거부!\n\ngetenforce\nsetenforce 1'},
    {from:'kernel', to:'audit',   col:'#aaa',   lbl:'감사 로그',badge:'SOS-05',title:'감사 & 최소 권한',      desc:'모든 접근 로그 기록. 최소 권한 원칙.',code:'감사 로그:\nhttpd obj=/etc/passwd DENIED\n\n최소 권한:\n- root 직접 사용 금지 → sudo\n- 서비스 계정: 전용 권한만'}
  ],
  glossary:[{sec:'Secure OS',terms:[
    {t:'TCB',d:'Trusted Computing Base. 보안 정책 집행 핵심 요소.'},
    {t:'MAC',d:'Mandatory Access Control. 보안 레이블 기반. Bell-LaPadula, Biba 모델.'},
    {t:'DAC',d:'Discretionary Access Control. 소유자가 권한 설정. Linux 파일 권한.'},
    {t:'RBAC',d:'역할 기반 접근 제어. 역할에 권한 부여.'},
    {t:'SELinux',d:'NSA 개발. 타입 집행(TE) 기반 MAC. RHEL 기본 탑재.'},
    {t:'최소 권한',d:'필요한 최소 권한만 부여. 침해 피해 최소화.'}
  ]}]
};

// ---- SECSYS: WAF ----
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

// ---- SECSYS: SIEM ----
TOPICS['secsys_siem'] = {cat:'secsys', label:'SIEM & 보안 관제',
  legend:[{c:'#fff',l:'로그 수집'},{c:'#ffaa00',l:'상관 분석'},{c:'#ff4444',l:'인시던트'}],
  devices:[
    {id:'fw',    label:'방화벽 로그',    x:0.08,y:0.28,icon:'firewall'},
    {id:'ids',   label:'IDS/IPS 이벤트',x:0.08,y:0.5,icon:'server'},
    {id:'server',label:'서버 로그',      x:0.08,y:0.72,icon:'server'},
    {id:'siem',  label:'SIEM\n상관 분석',x:0.48,y:0.5,icon:'switch'},
    {id:'soc',   label:'SOC\n보안관제',  x:0.88,y:0.5,icon:'pc'}
  ],
  steps:[
    {from:'fw',    to:'siem',col:'#fff',   lbl:'방화벽 로그',badge:'SIEM-01',title:'SIEM 개요 & 로그 수집',desc:'다양한 소스 로그 수집·정규화·상관분석.',code:'수집: Syslog(514), SNMP, API\n정규화: CEF, LEEF, JSON\n제품: Splunk, IBM QRadar\n    ArcSight, MS Sentinel'},
    {from:'ids',   to:'siem',col:'#fff',   lbl:'IDS 이벤트',  badge:'SIEM-02',title:'상관 분석',            desc:'개별 이벤트를 조합해 공격 패턴 식별.',code:'브루트포스:\n같은IP→같은계정 5회/1분 → 알람\n\n래터럴 무브먼트:\n포트스캔 후 서버간 RDP → 알람'},
    {from:'server',to:'siem',col:'#fff',   lbl:'서버 로그',   badge:'SIEM-03',title:'위협 인텔리전스',       desc:'외부 TI 피드 연동. 알려진 IOC 자동 탐지.',code:'IOC:\n- 악성 IP 목록\n- 악성 도메인\n- 파일 해시(MD5/SHA256)\nTI: MISP, VirusTotal, KrCERT'},
    {from:'siem',  to:'soc', col:'#ffaa00',lbl:'인시던트 알람',badge:'SIEM-04',title:'인시던트 대응 6단계',  desc:'탐지한 인시던트를 SOC에서 처리.',code:'1) 준비  2) 식별\n3) 봉쇄  4) 근절\n5) 복구  6) 교훈\n(NIST SP 800-61)'},
    {from:'siem',  to:'soc', col:'#ff4444',lbl:'SOAR 자동화', badge:'SIEM-05',title:'SOAR 보안 자동화',      desc:'반복 대응 자동화. Playbook 기반.',code:'피싱 메일 탐지 자동화:\n1) 첨부파일 → 샌드박스\n2) 도메인 → TI 조회\n3) 악성 판정 → 자동 차단\n수동 5시간 → 자동 5분'}
  ],
  glossary:[{sec:'SIEM & 관제',terms:[
    {t:'SIEM',d:'로그 수집·정규화·상관분석·시각화. Splunk, QRadar.'},
    {t:'SOC',d:'Security Operations Center. 24/7 보안 모니터링 조직.'},
    {t:'SOAR',d:'Security Orchestration, Automation and Response. 반복 대응 자동화.'},
    {t:'IOC',d:'Indicator of Compromise. 악성 IP, 도메인, 파일 해시 등.'}
  ]}]
};

// ---- SEC: ARP Spoofing ----
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

// ---- SEC: IP Spoofing ----
TOPICS['sec_ip_spoof'] = {cat:'sec', label:'IP 스푸핑 & 신뢰 관계',
  legend:[{c:'#fff',l:'정상'},{c:'#ff4444',l:'위조 IP'},{c:'#ff8844',l:'공격 영향'}],
  devices:[
    {id:'atk',    label:'공격자\n10.0.0.99',       x:0.1,y:0.5,icon:'hacker'},
    {id:'victim', label:'피해자 서버\n203.0.113.10',x:0.55,y:0.5,icon:'server'},
    {id:'trusted',label:'신뢰 호스트\n192.0.2.100',x:0.55,y:0.18,icon:'pc'},
    {id:'reflect',label:'반사 서버\n198.51.100.5', x:0.55,y:0.82,icon:'server'}
  ],
  steps:[
    {from:'atk',   to:'trusted',col:'#ff4444',lbl:'SYN Flood',   badge:'IPS-01',title:'신뢰 호스트 마비',     desc:'공격 전 신뢰 호스트를 SYN Flood로 마비.',code:'대상: 192.0.2.100\nSYN Flood → TCP 스택 포화\n목적: RST 응답 방지', warn:'신뢰 호스트 살아있으면 RST 전송\n→ 위조 연결 끊김'},
    {from:'atk',   to:'victim', col:'#ff4444',lbl:'SYN (위조)',   badge:'IPS-02',title:'위조 SYN + ISN 예측', desc:'신뢰 호스트 IP로 Src 위조. ISN 예측 필요.',code:'Src IP: 192.0.2.100 (위조!)\nDst: 203.0.113.10:514\nFlags: SYN', warn:'현대 OS: ISN 무작위(RFC 6528)\n→ 예측 거의 불가'},
    {from:'atk',   to:'victim', col:'#ff4444',lbl:'ACK (예측)',   badge:'IPS-03',title:'위조 ACK + 명령 실행',desc:'예측한 ISN으로 위조 ACK 전송. 인증 우회.',code:'Ack: Y+1 (ISN 예측)\n명령: cat /etc/passwd\n→ 인증 없이 실행!', warn:'대응:\n- rsh/rlogin 폐기 → SSH\n- RFC 6528 무작위 ISN\n- BCP38'},
    {from:'atk',   to:'reflect',col:'#ff4444',lbl:'DNS Req (위조)',badge:'IPS-04',title:'반사 증폭 (DRDoS)',  desc:'피해자 IP로 위조해 DNS 요청. 증폭 응답이 피해자로.',code:'증폭 비율:\nDNS ANY: ~75배\nNTP monlist: ~556배\n→ 40B → 3000B', warn:'대응: BCP38, DNS RRL'}
  ],
  glossary:[{sec:'IP 스푸핑',terms:[
    {t:'IP 스푸핑',d:'Src IP 위조. IP는 출발지 인증 없음.'},
    {t:'DRDoS',d:'Distributed Reflection DoS. 위조 IP로 반사 서버 통해 증폭.'},
    {t:'BCP38',d:'ISP 레벨 Ingress Filtering. 위조 IP 차단.'}
  ]}]
};

// ---- SEC: TCP Hijacking ----
TOPICS['sec_tcp_hijack'] = {cat:'sec', label:'TCP 세션 하이재킹',
  legend:[{c:'#fff',l:'정상'},{c:'#ff4444',l:'공격'},{c:'#ff8844',l:'탈취'}],
  devices:[
    {id:'client',label:'클라이언트\n192.168.1.2',x:0.1,y:0.5,icon:'pc'},
    {id:'server',label:'서버\n10.0.0.5',        x:0.88,y:0.5,icon:'server'},
    {id:'atk',   label:'공격자\n192.168.1.99',  x:0.5,y:0.82,icon:'hacker'}
  ],
  steps:[
    {from:'client',to:'server',col:'#fff',   lbl:'ESTABLISHED', badge:'HJK-01',title:'사전 조건: Seq 파악',    desc:'ARP 스푸핑으로 트래픽 도청. Seq/Ack 번호 파악.',code:'도청으로 파악:\nClient→Server: Seq:1500 Ack:7000\n→ 다음 Seq 예측'},
    {from:'atk',  to:'server',col:'#ff4444',lbl:'위조 패킷',     badge:'HJK-02',title:'Seq 위조 패킷 주입',    desc:'클라이언트 IP 위조. 예측한 Seq로 서버에 전송.',code:'Src IP: 192.168.1.2 (위조)\nSeq: 1500 (예측)\nData: 악성 명령\n→ 서버는 정상으로 인식', warn:'인증 없이 명령 수행'},
    {from:'server',to:'client',col:'#ff8844',lbl:'ACK 충돌',      badge:'HJK-03',title:'ACK 충돌 & Desync',    desc:'Seq 어긋나 클라이언트-서버 ACK 충돌.',code:'클라이언트 기대: Seq X+n\n서버 응답: Seq X+m\n→ 불일치 → RST', warn:'대응:\n- TLS (Seq 위조해도 복호화 불가)\n- SSH'},
    {from:'atk',  to:'server',col:'#ff8844',lbl:'명령 실행',      badge:'HJK-04',title:'세션 완전 탈취',        desc:'클라이언트를 RST로 끊고 공격자가 세션 이어받음.',code:'1) 클라이언트에 RST 전송(서버IP 위조)\n2) 공격자가 세션 계속\n도구: Hunt, Ettercap'}
  ],
  glossary:[{sec:'세션 하이재킹',terms:[
    {t:'TCP 세션 하이재킹',d:'Seq/Ack 파악 후 위조 패킷으로 세션 탈취. MITM 상태에서 가능.'},
    {t:'Desynchronization',d:'서버-클라이언트 Seq 번호 충돌. 정상 세션 방해.'},
    {t:'TLS 대응',d:'MAC(메시지 인증 코드)으로 무결성 보장. Seq 위조해도 변조 불가.'}
  ]}]
};

// ---- SEC: DNS Spoofing ----
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

// ---- SEC: ICMP Redirect ----
TOPICS['sec_icmp_redirect'] = {cat:'sec', label:'ICMP 리다이렉트 공격',
  legend:[{c:'#fff',l:'정상'},{c:'#ff4444',l:'위조 Redirect'},{c:'#ff8844',l:'우회'}],
  devices:[
    {id:'victim',label:'피해자\n192.168.1.2',  x:0.08,y:0.5,icon:'pc'},
    {id:'gw',    label:'게이트웨이\n192.168.1.1',x:0.45,y:0.18,icon:'router'},
    {id:'atk',   label:'공격자\n192.168.1.99', x:0.45,y:0.82,icon:'hacker'},
    {id:'server',label:'외부 서버\n10.0.0.5',  x:0.88,y:0.5,icon:'server'}
  ],
  steps:[
    {from:'victim',to:'gw',  col:'#fff',   lbl:'패킷',         badge:'ICR-01',title:'ICMP Redirect 정상 동작',  desc:'ICMP Type 5. 라우터가 더 나은 경로를 알려줌.',code:'ICMP Type: 5\nCode: 1 (Host Redirect)\n→ 호스트 라우팅 캐시 업데이트'},
    {from:'atk',  to:'victim',col:'#ff4444',lbl:'위조 Redirect',badge:'ICR-02',title:'위조 ICMP Redirect 전송', desc:'게이트웨이인 척 위조 Redirect 전송.',code:'Src IP: 192.168.1.1 (GW 위조!)\nICMP Type:5 Code:1\nGateway: 192.168.1.99 (공격자!)', warn:'OS가 수용하면\n라우팅 캐시 오염'},
    {from:'victim',to:'atk', col:'#ff8844',lbl:'우회 트래픽',  badge:'ICR-03',title:'트래픽 우회 & 도청',       desc:'피해자 라우팅 캐시 오염. 공격자 경유.',code:'오염된 라우팅 캐시:\n10.0.0.5 via 192.168.1.99 (공격자!)\n→ MITM 성립', warn:'대응:\nLinux: accept_redirects=0\n방화벽: ICMP Type 5 차단'},
    {from:'atk',  to:'gw',   col:'#ff8844',lbl:'재전송',       badge:'ICR-04',title:'대응 방안',                desc:'ICMP Redirect 비활성화.',code:'Linux:\nsysctl -w net.ipv4.conf.all.\n  accept_redirects=0\n\n현대 OS: 기본 무시'}
  ],
  glossary:[{sec:'ICMP Redirect',terms:[
    {t:'ICMP Type 5',d:'Redirect. 라우터가 더 좋은 경로 알림. 호스트 라우팅 캐시 업데이트.'},
    {t:'accept_redirects',d:'Linux 커널 파라미터. 0이면 ICMP Redirect 무시. 보안상 0 권장.'}
  ]}]
};

// ---- SEC: Sniffing ----
TOPICS['sec_sniff'] = {cat:'sec', label:'스니핑 & SPAN 태핑',
  legend:[{c:'#fff',l:'정상'},{c:'#aaa',l:'SPAN 미러링'},{c:'#ff4444',l:'스니핑'}],
  devices:[
    {id:'ha',     label:'호스트 A\n192.168.1.2',x:0.08,y:0.4,icon:'pc'},
    {id:'sw',     label:'스위치\nSPAN',         x:0.42,y:0.4,icon:'switch'},
    {id:'hb',     label:'호스트 B\n192.168.1.3',x:0.75,y:0.4,icon:'pc'},
    {id:'sniffer',label:'스니퍼\n(공격자/분석)',x:0.75,y:0.75,icon:'hacker'}
  ],
  steps:[
    {from:'ha', to:'sw',     col:'#fff',   lbl:'Frame',      badge:'SNF-01',title:'무차별 모드 (Promiscuous)',desc:'NIC이 모든 프레임 수신.',code:'일반: 자신의 MAC만 처리\n무차별: 모든 프레임 수신\n\nLinux:\nip link set eth0 promisc on\n\n허브: 스니핑 쉬움\n스위치: SPAN/미러링 필요'},
    {from:'sw', to:'sniffer',col:'#aaa',   lbl:'SPAN Mirror',badge:'SNF-02',title:'SPAN 포트 미러링',          desc:'특정 포트 트래픽을 분석 포트로 복사.',code:'Cisco 설정:\nmonitor session 1 source Gi0/1\nmonitor session 1 dest Gi0/4\n→ Wireshark 연결'},
    {from:'sw', to:'sniffer',col:'#ff4444',lbl:'악의적 탭',  badge:'SNF-03',title:'MAC 플러딩 공격',           desc:'CAM 테이블 포화 → 스위치가 허브처럼 동작.',code:'가짜 MAC 대량 주입\n→ CAM 테이블 포화\n→ 모든 포트 플러딩\n→ 스니핑 가능', warn:'대응: Port Security\n(포트당 MAC 수 제한)'},
    {from:'ha', to:'sniffer',col:'#ff4444',lbl:'캡처',       badge:'SNF-04',title:'스니핑 도구 & 대응',         desc:'Wireshark, tcpdump. HTTP 평문 노출.',code:'tcpdump -i eth0 tcp port 80\ntcpdump host 192.168.1.2\n\n대응:\n- TLS/HTTPS\n- VLAN 분리\n- 802.1X 인증'}
  ],
  glossary:[{sec:'스니핑',terms:[
    {t:'무차별 모드',d:'NIC이 자신의 MAC 외 모든 프레임 수신. 스니핑의 기반.'},
    {t:'SPAN 포트',d:'Switch Port ANalyzer. 트래픽 미러링. 정당한 분석 목적.'},
    {t:'MAC 플러딩',d:'CAM 테이블을 가짜 MAC으로 포화. 스위치를 허브처럼 동작.'}
  ]}]
};

// ---- SEC: DDoS ----
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

// ---- SEC: Smurf ----
TOPICS['sec_smurf'] = {cat:'sec', label:'Smurf 공격',
  legend:[{c:'#ff4444',l:'위조 ICMP Req'},{c:'#ff8844',l:'증폭 응답→피해자'}],
  devices:[
    {id:'atk',   label:'공격자\n10.0.0.1',              x:0.1,y:0.5,icon:'hacker'},
    {id:'bc',    label:'증폭 네트워크\n192.168.1.255(BC)',x:0.5,y:0.5,icon:'switch'},
    {id:'victim',label:'피해자\n192.168.1.50',           x:0.85,y:0.5,icon:'pc'}
  ],
  steps:[
    {from:'atk',to:'bc',    col:'#ff4444',lbl:'ICMP Req(위조)',badge:'SMF-01',title:'Smurf 공격 원리',   desc:'피해자 IP로 Src 위조해 브로드캐스트로 ICMP 전송.',code:'Src IP: 192.168.1.50 (피해자 위조!)\nDst IP: 192.168.1.255 (BC)\nICMP Type: 8 (Echo Request)', warn:'증폭: 호스트 수 × 패킷 크기\n100대 → 100배 증폭'},
    {from:'bc', to:'victim',col:'#ff8844',lbl:'Reply×100', badge:'SMF-02',title:'증폭 응답 집중',        desc:'모든 호스트가 피해자 IP로 Reply.',code:'100개 호스트 × ICMP Reply\n→ 피해자 대역폭 포화\n공격 1Mbps → 증폭 100Mbps', warn:'대응:\n라우터: no ip directed-broadcast\n방화벽: 외부발 ICMP BC 차단'},
    {from:'atk',to:'bc',    col:'#ff4444',lbl:'UDP (Fraggle)',badge:'SMF-03',title:'Fraggle 공격 (UDP 변형)',desc:'Smurf의 UDP 버전. chargen/echo 포트 악용.',code:'Protocol: UDP\nDst Port: 7(echo) or 19(chargen)\nChargen: 임의 문자열 응답\n→ echo-chargen 루프 가능'}
  ],
  glossary:[{sec:'Smurf',terms:[
    {t:'Smurf 공격',d:'Src IP 위조 + 브로드캐스트 ICMP. 현대 네트워크는 directed broadcast 기본 차단.'},
    {t:'Directed Broadcast',d:'특정 서브넷의 브로드캐스트. Cisco: no ip directed-broadcast.'},
    {t:'Fraggle',d:'UDP 기반 Smurf. 포트 7(echo), 19(chargen) 악용.'}
  ]}]
};

// ---- SEC: SYN Flood ----
TOPICS['sec_syn_flood'] = {cat:'sec', label:'SYN Flooding',
  legend:[{c:'#ff4444',l:'위조 SYN'},{c:'#aaa',l:'SYN-ACK'},{c:'#888',l:'응답 없음'}],
  devices:[
    {id:'atk',   label:'공격자',           x:0.1,y:0.5,icon:'hacker'},
    {id:'server',label:'피해자 서버\n:80', x:0.7,y:0.5,icon:'server'},
    {id:'ghost', label:'존재하지 않는 IP\n(위조)',x:0.4,y:0.82,icon:'pc'}
  ],
  steps:[
    {from:'atk',  to:'server',col:'#ff4444',lbl:'SYN(위조IP1)', badge:'SYN-01',title:'SYN Flood 원리',       desc:'존재하지 않는 IP로 위조해 대량 SYN. Half-open 연결 생성.',code:'Src IP: 1.2.3.4 (위조)\nFlags: SYN\n→ 서버: SYN-ACK 전송 + ACK 대기\n→ Half-open 생성\nBacklog Queue 점점 차오름', warn:'Backlog 포화 시 정상 연결 거부'},
    {from:'atk',  to:'server',col:'#ff4444',lbl:'SYN×10000',    badge:'SYN-02',title:'Backlog 포화',          desc:'수천 개 Half-open으로 Backlog 포화.',code:'SYN × 10000 → Backlog 포화!\n→ 새 SYN DROP\n→ 정상 사용자도 차단\ntcp_syn_retries: 5 (약 3분 대기)', warn:'서비스 불능 (DoS)'},
    {from:'server',to:'ghost',col:'#aaa',   lbl:'SYN-ACK(손실)',badge:'SYN-03',title:'SYN Cookie 대응',       desc:'서버가 Half-open 없이 쿠키로 ACK 검증.',code:'ISN = f(IP, Port, 시간, 비밀키)\n→ Backlog 저장 안 함!\n→ ACK 수신 시 쿠키 검증\n\nLinux:\nnet.ipv4.tcp_syncookies=1', warn:'SYN Cookie는 TCP 옵션\n협상 불가 단점'},
    {from:'atk',  to:'server',col:'#ff4444',lbl:'SYN×10000',    badge:'SYN-04',title:'다층 방어',             desc:'SYN Cookie + 방화벽 + BCP38 조합.',code:'1) SYN Cookie (OS)\n2) 방화벽 Rate-Limit:\n   --limit 1/s\n3) BCP38 Ingress Filtering\n4) AnyCast 스크러빙'}
  ],
  glossary:[{sec:'SYN Flood',terms:[
    {t:'Half-open 연결',d:'SYN 후 SYN-ACK 보냈지만 ACK 못 받은 연결. 서버 자원 소모.'},
    {t:'SYN Backlog Queue',d:'Half-open 연결 저장 큐. 포화 시 새 연결 거부.'},
    {t:'SYN Cookie',d:'서버가 Half-open 상태 저장 않고 ISN을 쿠키로 인코딩.'},
    {t:'tcp_syncookies',d:'Linux 파라미터. 1로 설정 시 SYN Cookie 활성화.'}
  ]}]
};

// ================================================================
// ZONE & LAN DATA
// ================================================================
var ZONE_DEFS = {
  'default':          [{label:'Client Zone',x:0,w:0.22,color:'rgba(255,255,255,0.018)',border:'rgba(255,255,255,0.06)'},{label:'Network Zone',x:0.22,w:0.56,color:'rgba(180,200,255,0.012)',border:'rgba(160,180,255,0.05)'},{label:'Server Zone',x:0.78,w:0.22,color:'rgba(255,200,100,0.012)',border:'rgba(255,200,100,0.05)'}],
  'osi_model':        [{label:'Application L5~L7',x:0,w:1,y:0,h:0.28,color:'rgba(255,255,255,0.018)',border:'rgba(255,255,255,0.07)',horiz:true},{label:'Transport L4',x:0,w:1,y:0.28,h:0.16,color:'rgba(180,220,255,0.018)',border:'rgba(180,220,255,0.07)',horiz:true},{label:'Network L3',x:0,w:1,y:0.44,h:0.16,color:'rgba(150,200,180,0.018)',border:'rgba(150,200,180,0.07)',horiz:true},{label:'Data Link L2',x:0,w:1,y:0.60,h:0.16,color:'rgba(200,160,255,0.018)',border:'rgba(200,160,255,0.07)',horiz:true},{label:'Physical L1',x:0,w:1,y:0.76,h:0.24,color:'rgba(255,180,100,0.018)',border:'rgba(255,180,100,0.07)',horiz:true}],
  'sec_arp_spoof':    [{label:'Attacker Zone',x:0,w:0.22,color:'rgba(255,60,60,0.025)',border:'rgba(255,60,60,0.12)'},{label:'Network Zone',x:0.22,w:0.56,color:'rgba(180,200,255,0.012)',border:'rgba(160,180,255,0.05)'},{label:'Victim Zone',x:0.78,w:0.22,color:'rgba(255,200,100,0.012)',border:'rgba(255,200,100,0.05)'}],
  'sec_ip_spoof':     [{label:'Attacker Zone',x:0,w:0.22,color:'rgba(255,60,60,0.025)',border:'rgba(255,60,60,0.12)'},{label:'Internet Zone',x:0.22,w:0.33,color:'rgba(180,200,255,0.012)',border:'rgba(160,180,255,0.05)'},{label:'Target Zone',x:0.55,w:0.45,color:'rgba(255,200,100,0.012)',border:'rgba(255,200,100,0.05)'}],
  'sec_ddos':         [{label:'Botnet Zone',x:0,w:0.22,color:'rgba(255,60,60,0.025)',border:'rgba(255,60,60,0.12)'},{label:'Internet Zone',x:0.22,w:0.33,color:'rgba(180,200,255,0.012)',border:'rgba(160,180,255,0.05)'},{label:'Victim Zone',x:0.55,w:0.45,color:'rgba(255,200,100,0.012)',border:'rgba(255,200,100,0.05)'}],
  'sec_smurf':        [{label:'Attacker Zone',x:0,w:0.22,color:'rgba(255,60,60,0.025)',border:'rgba(255,60,60,0.12)'},{label:'Amplify Zone',x:0.22,w:0.34,color:'rgba(255,160,60,0.022)',border:'rgba(255,160,60,0.09)'},{label:'Victim Zone',x:0.56,w:0.44,color:'rgba(255,200,100,0.012)',border:'rgba(255,200,100,0.05)'}],
  'sec_syn_flood':    [{label:'Attacker Zone',x:0,w:0.22,color:'rgba(255,60,60,0.025)',border:'rgba(255,60,60,0.12)'},{label:'Network Zone',x:0.22,w:0.25,color:'rgba(180,200,255,0.012)',border:'rgba(160,180,255,0.05)'},{label:'Server Zone',x:0.47,w:0.53,color:'rgba(255,200,100,0.012)',border:'rgba(255,200,100,0.05)'}],
  'secsys_fw':        [{label:'External / Untrusted',x:0,w:0.25,color:'rgba(255,60,60,0.018)',border:'rgba(255,60,60,0.08)'},{label:'Perimeter / DMZ',x:0.25,w:0.35,color:'rgba(255,180,60,0.015)',border:'rgba(255,180,60,0.07)'},{label:'Internal / Trusted',x:0.60,w:0.40,color:'rgba(100,220,150,0.015)',border:'rgba(100,220,150,0.07)'}],
  'secsys_ids':       [{label:'External Zone',x:0,w:0.22,color:'rgba(255,60,60,0.018)',border:'rgba(255,60,60,0.08)'},{label:'Monitor Zone',x:0.22,w:0.33,color:'rgba(255,200,60,0.015)',border:'rgba(255,200,60,0.07)'},{label:'Internal Zone',x:0.55,w:0.45,color:'rgba(100,220,150,0.015)',border:'rgba(100,220,150,0.07)'}],
  'secsys_ips':       [{label:'External Zone',x:0,w:0.28,color:'rgba(255,60,60,0.018)',border:'rgba(255,60,60,0.08)'},{label:'IPS Inline',x:0.28,w:0.26,color:'rgba(255,200,60,0.018)',border:'rgba(255,200,60,0.09)'},{label:'Internal Zone',x:0.54,w:0.46,color:'rgba(100,220,150,0.015)',border:'rgba(100,220,150,0.07)'}],
  'secsys_vpn':       [{label:'Remote / Client',x:0,w:0.2,color:'rgba(255,255,255,0.018)',border:'rgba(255,255,255,0.06)'},{label:'Internet (Untrusted)',x:0.2,w:0.36,color:'rgba(255,60,60,0.015)',border:'rgba(255,60,60,0.07)'},{label:'Corporate Network',x:0.56,w:0.44,color:'rgba(100,220,150,0.015)',border:'rgba(100,220,150,0.07)'}],
  'secsys_secureos':  [{label:'Subject Zone',x:0,w:0.26,color:'rgba(255,255,255,0.018)',border:'rgba(255,255,255,0.06)'},{label:'TCB / Kernel',x:0.26,w:0.32,color:'rgba(255,200,60,0.020)',border:'rgba(255,200,60,0.10)'},{label:'Resource Zone',x:0.58,w:0.42,color:'rgba(100,220,150,0.015)',border:'rgba(100,220,150,0.07)'}],
  'secsys_waf':       [{label:'Client Zone',x:0,w:0.2,color:'rgba(255,255,255,0.018)',border:'rgba(255,255,255,0.06)'},{label:'WAF Zone',x:0.2,w:0.28,color:'rgba(255,200,60,0.020)',border:'rgba(255,200,60,0.10)'},{label:'App / DB Zone',x:0.48,w:0.52,color:'rgba(100,220,150,0.015)',border:'rgba(100,220,150,0.07)'}],
  'secsys_siem':      [{label:'Log Source Zone',x:0,w:0.22,color:'rgba(255,255,255,0.018)',border:'rgba(255,255,255,0.06)'},{label:'SIEM Engine',x:0.22,w:0.44,color:'rgba(255,200,60,0.020)',border:'rgba(255,200,60,0.10)'},{label:'SOC / Response',x:0.66,w:0.34,color:'rgba(100,220,150,0.015)',border:'rgba(100,220,150,0.07)'}],
  'infra_nat':        [{label:'Internal Zone',x:0,w:0.3,color:'rgba(100,220,150,0.015)',border:'rgba(100,220,150,0.07)'},{label:'NAT Border',x:0.3,w:0.26,color:'rgba(255,200,60,0.020)',border:'rgba(255,200,60,0.10)'},{label:'External Zone',x:0.56,w:0.44,color:'rgba(255,60,60,0.015)',border:'rgba(255,60,60,0.07)'}],
  'l3_ip':            [{label:'Src Network',x:0,w:0.2,color:'rgba(255,255,255,0.018)',border:'rgba(255,255,255,0.06)'},{label:'Core Routing',x:0.2,w:0.6,color:'rgba(180,200,255,0.012)',border:'rgba(160,180,255,0.05)'},{label:'Dst Network',x:0.8,w:0.2,color:'rgba(255,200,100,0.012)',border:'rgba(255,200,100,0.05)'}],
  'infra_fw':         [{label:'External Zone',x:0,w:0.22,color:'rgba(255,60,60,0.018)',border:'rgba(255,60,60,0.08)'},{label:'Perimeter Zone',x:0.22,w:0.33,color:'rgba(180,200,255,0.015)',border:'rgba(160,180,255,0.07)'},{label:'Internal Zone',x:0.55,w:0.45,color:'rgba(100,220,150,0.015)',border:'rgba(100,220,150,0.07)'}]
};

var LAN_GROUPS = {
  'l2_ethernet':    [{label:'LAN 192.168.1.0/24',color:'#4488ff',ids:['ha','sw','hb','hc']}],
  'l2_arp':         [{label:'LAN 192.168.1.0/24',color:'#4488ff',ids:['ha','sw','hb','hc']}],
  'l3_ip':          [{label:'LAN A 192.168.1.0/24',color:'#4488ff',ids:['ha','ra']},{label:'LAN B 10.0.0.0/24',color:'#44bb88',ids:['rc','hb']}],
  'l3_icmp':        [{label:'LAN A 192.168.1.0/24',color:'#4488ff',ids:['ha','ra']},{label:'LAN B 10.0.0.0/24',color:'#44bb88',ids:['hb']}],
  'l4_tcp':         [{label:'TCP 연결',color:'#4488ff',ids:['client','server']}],
  'l4_udp':         [{label:'Client LAN',color:'#4488ff',ids:['client','dns','server']}],
  'app_dns':        [{label:'클라이언트 LAN',color:'#4488ff',ids:['client','resolver']},{label:'DNS',color:'#aaaaaa',ids:['root','tld','auth']}],
  'app_http':       [{label:'Client to Server',color:'#4488ff',ids:['client','server']}],
  'infra_dhcp':     [{label:'LAN 192.168.1.0/24',color:'#4488ff',ids:['client','sw','dhcp']}],
  'infra_nat':      [{label:'사설 LAN 192.168.1.0/24',color:'#44bb88',ids:['ha','hb','nat']},{label:'인터넷 (공인)',color:'#888888',ids:['web']}],
  'infra_fw':       [{label:'DMZ',color:'#ffaa33',ids:['fw','dmz']},{label:'내부 LAN',color:'#44bb88',ids:['ids','lan']}],
  'secsys_fw':      [{label:'DMZ',color:'#ffaa33',ids:['fw','dmz']},{label:'내부 LAN',color:'#44bb88',ids:['lan','admin']}],
  'secsys_ids':     [{label:'모니터링 세그먼트',color:'#ffaa33',ids:['tap','ids']},{label:'내부 LAN',color:'#44bb88',ids:['server','soc']}],
  'secsys_ips':     [{label:'내부 LAN',color:'#44bb88',ids:['server','soc']}],
  'secsys_vpn':     [{label:'회사 내부 LAN',color:'#44bb88',ids:['vpngw','intranet']}],
  'secsys_secureos':[{label:'시스템 내부',color:'#ffaa33',ids:['kernel','resource','audit']}],
  'secsys_waf':     [{label:'내부 서버 LAN',color:'#44bb88',ids:['webapp','db']}],
  'secsys_siem':    [{label:'로그 수집 LAN',color:'#4488ff',ids:['fw','ids','server']},{label:'관제 LAN',color:'#44bb88',ids:['siem','soc']}],
  'sec_arp_spoof':  [{label:'같은 LAN 192.168.1.0/24 — 공격 가능!',color:'#ff4444',ids:['victim','gw','atk','hb']}],
  'sec_ip_spoof':   [{label:'공격자 위치 (인터넷)',color:'#ff4444',ids:['atk']},{label:'피해자 네트워크',color:'#ffaa33',ids:['victim','reflect','trusted']}],
  'sec_tcp_hijack': [{label:'같은 LAN (MITM 가능)',color:'#ff4444',ids:['client','server','atk']}],
  'sec_dns_spoof':  [{label:'피해자 LAN',color:'#ffaa33',ids:['client','resolver']},{label:'공격자 위치',color:'#ff4444',ids:['atk','fake']}],
  'sec_icmp_redirect':[{label:'같은 LAN 192.168.1.0/24',color:'#ff4444',ids:['victim','gw','atk']}],
  'sec_sniff':      [{label:'같은 LAN — 스니핑 위험!',color:'#ff4444',ids:['ha','sw','hb','sniffer']}],
  'sec_ddos':       [{label:'봇넷 (인터넷)',color:'#ff4444',ids:['botnet','amp']},{label:'피해자 LAN',color:'#ffaa33',ids:['victim','user']}],
  'sec_smurf':      [{label:'증폭 LAN 192.168.1.0/24',color:'#ff8844',ids:['bc','victim']}],
  'sec_syn_flood':  [{label:'공격자 (인터넷)',color:'#ff4444',ids:['atk','ghost']},{label:'피해자 LAN',color:'#ffaa33',ids:['server']}]
};
