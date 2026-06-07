// SECSYS: IPS
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
