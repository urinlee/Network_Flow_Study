// SECSYS: IDS
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
