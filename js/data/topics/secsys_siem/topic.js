// SECSYS: SIEM
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
