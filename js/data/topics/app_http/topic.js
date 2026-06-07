// APP: HTTP
TOPICS['app_http'] = {cat:'app', label:'HTTP/HTTPS',
  legend:[{c:'#fff',l:'요청'},{c:'#aaa',l:'응답'},{c:'#666',l:'TLS'}],
  devices:[
    {id:'client',label:'클라이언트',      x:0.15,y:0.5,icon:'pc'},
    {id:'server',label:'웹 서버\n:443',   x:0.85,y:0.5,icon:'server'}
  ],
  steps:[
    {from:'client',to:'server',col:'#666',lbl:'TLS Hello',badge:'HTTP-01',title:'TLS 핸드셰이크',      desc:'HTTPS는 TLS로 암호화. ClientHello에서 암호화 방식 협상.',code:'TLS 1.3:\n1) ClientHello: 버전,CipherSuite\n2) ServerHello: 인증서\n3) 세션키 교환(ECDHE)\n4) Finished'},
    {from:'server',to:'client',col:'#666',lbl:'ServerHello', badge:'HTTP-02',title:'인증서 검증',        desc:'CA 체인으로 인증서 검증. 공개키로 세션키 교환.',code:'검증:\n1) 유효기간\n2) CA 서명 검증\n3) 도메인 일치\n4) CRL/OCSP 폐기 확인'},
    {from:'client',to:'server',col:'#fff',lbl:'HTTP GET',   badge:'HTTP-03',title:'HTTP 요청 구조',     desc:'HTTP 요청의 메서드, 헤더, 바디.',code:'GET /index.html HTTP/1.1\nHost: www.example.com\nAccept: text/html\nCookie: session=abc\n\nGET/POST/PUT/DELETE'},
    {from:'server',to:'client',col:'#aaa',lbl:'200 OK',     badge:'HTTP-04',title:'HTTP 응답 & 상태코드',desc:'상태코드와 헤더.',code:'HTTP/1.1 200 OK\nContent-Type: text/html\n\n2xx:성공 3xx:리다이렉트\n4xx:클라이언트오류\n5xx:서버오류'}
  ],
  glossary:[{sec:'HTTP/HTTPS',terms:[
    {t:'TLS',d:'Transport Layer Security. HTTPS 암호화 계층. 인증서로 서버 인증.'},
    {t:'HTTP/2',d:'멀티플렉싱, 헤더 압축(HPACK), 서버 푸시 지원.'},
    {t:'HTTP/3 (QUIC)',d:'UDP 기반. 빠른 연결(0-RTT). 멀티플렉싱.'}
  ]}]
};
