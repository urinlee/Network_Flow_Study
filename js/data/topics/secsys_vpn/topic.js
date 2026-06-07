// SECSYS: VPN
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
