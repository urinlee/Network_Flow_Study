// INFRA: NAT
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
