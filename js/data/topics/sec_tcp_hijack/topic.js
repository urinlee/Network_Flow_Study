// SEC: TCP Hijacking
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
