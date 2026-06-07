// L4: UDP
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
