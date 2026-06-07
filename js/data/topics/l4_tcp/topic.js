// L4: TCP
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
