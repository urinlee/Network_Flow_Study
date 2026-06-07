// SEC: Sniffing
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
