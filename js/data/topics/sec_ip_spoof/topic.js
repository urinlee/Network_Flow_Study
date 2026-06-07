// SEC: IP Spoofing
TOPICS['sec_ip_spoof'] = {cat:'sec', label:'IP 스푸핑 & 신뢰 관계',
  legend:[{c:'#fff',l:'정상'},{c:'#ff4444',l:'위조 IP'},{c:'#ff8844',l:'공격 영향'}],
  devices:[
    {id:'atk',    label:'공격자\n10.0.0.99',       x:0.1,y:0.5,icon:'hacker'},
    {id:'victim', label:'피해자 서버\n203.0.113.10',x:0.55,y:0.5,icon:'server'},
    {id:'trusted',label:'신뢰 호스트\n192.0.2.100',x:0.55,y:0.18,icon:'pc'},
    {id:'reflect',label:'반사 서버\n198.51.100.5', x:0.55,y:0.82,icon:'server'}
  ],
  steps:[
    {from:'atk',   to:'trusted',col:'#ff4444',lbl:'SYN Flood',   badge:'IPS-01',title:'신뢰 호스트 마비',     desc:'공격 전 신뢰 호스트를 SYN Flood로 마비.',code:'대상: 192.0.2.100\nSYN Flood → TCP 스택 포화\n목적: RST 응답 방지', warn:'신뢰 호스트 살아있으면 RST 전송\n→ 위조 연결 끊김'},
    {from:'atk',   to:'victim', col:'#ff4444',lbl:'SYN (위조)',   badge:'IPS-02',title:'위조 SYN + ISN 예측', desc:'신뢰 호스트 IP로 Src 위조. ISN 예측 필요.',code:'Src IP: 192.0.2.100 (위조!)\nDst: 203.0.113.10:514\nFlags: SYN', warn:'현대 OS: ISN 무작위(RFC 6528)\n→ 예측 거의 불가'},
    {from:'atk',   to:'victim', col:'#ff4444',lbl:'ACK (예측)',   badge:'IPS-03',title:'위조 ACK + 명령 실행',desc:'예측한 ISN으로 위조 ACK 전송. 인증 우회.',code:'Ack: Y+1 (ISN 예측)\n명령: cat /etc/passwd\n→ 인증 없이 실행!', warn:'대응:\n- rsh/rlogin 폐기 → SSH\n- RFC 6528 무작위 ISN\n- BCP38'},
    {from:'atk',   to:'reflect',col:'#ff4444',lbl:'DNS Req (위조)',badge:'IPS-04',title:'반사 증폭 (DRDoS)',  desc:'피해자 IP로 위조해 DNS 요청. 증폭 응답이 피해자로.',code:'증폭 비율:\nDNS ANY: ~75배\nNTP monlist: ~556배\n→ 40B → 3000B', warn:'대응: BCP38, DNS RRL'}
  ],
  glossary:[{sec:'IP 스푸핑',terms:[
    {t:'IP 스푸핑',d:'Src IP 위조. IP는 출발지 인증 없음.'},
    {t:'DRDoS',d:'Distributed Reflection DoS. 위조 IP로 반사 서버 통해 증폭.'},
    {t:'BCP38',d:'ISP 레벨 Ingress Filtering. 위조 IP 차단.'}
  ]}]
};
