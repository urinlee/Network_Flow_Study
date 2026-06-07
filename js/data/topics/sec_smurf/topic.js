// SEC: Smurf
TOPICS['sec_smurf'] = {cat:'sec', label:'Smurf 공격',
  legend:[{c:'#ff4444',l:'위조 ICMP Req'},{c:'#ff8844',l:'증폭 응답→피해자'}],
  devices:[
    {id:'atk',   label:'공격자\n10.0.0.1',              x:0.1,y:0.5,icon:'hacker'},
    {id:'bc',    label:'증폭 네트워크\n192.168.1.255(BC)',x:0.5,y:0.5,icon:'switch'},
    {id:'victim',label:'피해자\n192.168.1.50',           x:0.85,y:0.5,icon:'pc'}
  ],
  steps:[
    {from:'atk',to:'bc',    col:'#ff4444',lbl:'ICMP Req(위조)',badge:'SMF-01',title:'Smurf 공격 원리',   desc:'피해자 IP로 Src 위조해 브로드캐스트로 ICMP 전송.',code:'Src IP: 192.168.1.50 (피해자 위조!)\nDst IP: 192.168.1.255 (BC)\nICMP Type: 8 (Echo Request)', warn:'증폭: 호스트 수 × 패킷 크기\n100대 → 100배 증폭'},
    {from:'bc', to:'victim',col:'#ff8844',lbl:'Reply×100', badge:'SMF-02',title:'증폭 응답 집중',        desc:'모든 호스트가 피해자 IP로 Reply.',code:'100개 호스트 × ICMP Reply\n→ 피해자 대역폭 포화\n공격 1Mbps → 증폭 100Mbps', warn:'대응:\n라우터: no ip directed-broadcast\n방화벽: 외부발 ICMP BC 차단'},
    {from:'atk',to:'bc',    col:'#ff4444',lbl:'UDP (Fraggle)',badge:'SMF-03',title:'Fraggle 공격 (UDP 변형)',desc:'Smurf의 UDP 버전. chargen/echo 포트 악용.',code:'Protocol: UDP\nDst Port: 7(echo) or 19(chargen)\nChargen: 임의 문자열 응답\n→ echo-chargen 루프 가능'}
  ],
  glossary:[{sec:'Smurf',terms:[
    {t:'Smurf 공격',d:'Src IP 위조 + 브로드캐스트 ICMP. 현대 네트워크는 directed broadcast 기본 차단.'},
    {t:'Directed Broadcast',d:'특정 서브넷의 브로드캐스트. Cisco: no ip directed-broadcast.'},
    {t:'Fraggle',d:'UDP 기반 Smurf. 포트 7(echo), 19(chargen) 악용.'}
  ]}]
};
