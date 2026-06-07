// SEC: ICMP Redirect
TOPICS['sec_icmp_redirect'] = {cat:'sec', label:'ICMP 리다이렉트 공격',
  legend:[{c:'#fff',l:'정상'},{c:'#ff4444',l:'위조 Redirect'},{c:'#ff8844',l:'우회'}],
  devices:[
    {id:'victim',label:'피해자\n192.168.1.2',  x:0.08,y:0.5,icon:'pc'},
    {id:'gw',    label:'게이트웨이\n192.168.1.1',x:0.45,y:0.18,icon:'router'},
    {id:'atk',   label:'공격자\n192.168.1.99', x:0.45,y:0.82,icon:'hacker'},
    {id:'server',label:'외부 서버\n10.0.0.5',  x:0.88,y:0.5,icon:'server'}
  ],
  steps:[
    {from:'victim',to:'gw',  col:'#fff',   lbl:'패킷',         badge:'ICR-01',title:'ICMP Redirect 정상 동작',  desc:'ICMP Type 5. 라우터가 더 나은 경로를 알려줌.',code:'ICMP Type: 5\nCode: 1 (Host Redirect)\n→ 호스트 라우팅 캐시 업데이트'},
    {from:'atk',  to:'victim',col:'#ff4444',lbl:'위조 Redirect',badge:'ICR-02',title:'위조 ICMP Redirect 전송', desc:'게이트웨이인 척 위조 Redirect 전송.',code:'Src IP: 192.168.1.1 (GW 위조!)\nICMP Type:5 Code:1\nGateway: 192.168.1.99 (공격자!)', warn:'OS가 수용하면\n라우팅 캐시 오염'},
    {from:'victim',to:'atk', col:'#ff8844',lbl:'우회 트래픽',  badge:'ICR-03',title:'트래픽 우회 & 도청',       desc:'피해자 라우팅 캐시 오염. 공격자 경유.',code:'오염된 라우팅 캐시:\n10.0.0.5 via 192.168.1.99 (공격자!)\n→ MITM 성립', warn:'대응:\nLinux: accept_redirects=0\n방화벽: ICMP Type 5 차단'},
    {from:'atk',  to:'gw',   col:'#ff8844',lbl:'재전송',       badge:'ICR-04',title:'대응 방안',                desc:'ICMP Redirect 비활성화.',code:'Linux:\nsysctl -w net.ipv4.conf.all.\n  accept_redirects=0\n\n현대 OS: 기본 무시'}
  ],
  glossary:[{sec:'ICMP Redirect',terms:[
    {t:'ICMP Type 5',d:'Redirect. 라우터가 더 좋은 경로 알림. 호스트 라우팅 캐시 업데이트.'},
    {t:'accept_redirects',d:'Linux 커널 파라미터. 0이면 ICMP Redirect 무시. 보안상 0 권장.'}
  ]}]
};
