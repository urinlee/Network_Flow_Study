// SEC: SYN Flood
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
