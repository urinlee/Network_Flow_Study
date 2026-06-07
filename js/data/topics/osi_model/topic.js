// OSI
TOPICS['osi_model'] = {cat:'osi', label:'OSI 7계층 모델',
  legend:[{c:'#fff',l:'데이터 흐름 (송신)'},{c:'#888',l:'데이터 흐름 (수신)'}],
  devices:[
    {id:'app7',  label:'7. 응용 (Application)\nHTTP,FTP,DNS',    x:0.5,y:0.08,icon:'pc'},
    {id:'pres6', label:'6. 표현 (Presentation)\nSSL/TLS,압축',    x:0.5,y:0.20,icon:'pc'},
    {id:'sess5', label:'5. 세션 (Session)\n세션관리,동기화',       x:0.5,y:0.32,icon:'pc'},
    {id:'trans4',label:'4. 전송 (Transport)\nTCP/UDP,포트',        x:0.5,y:0.44,icon:'router'},
    {id:'net3',  label:'3. 네트워크 (Network)\nIP,ICMP,라우팅',    x:0.5,y:0.56,icon:'router'},
    {id:'dl2',   label:'2. 데이터링크 (Data Link)\nMAC,ARP,프레임',x:0.5,y:0.68,icon:'switch'},
    {id:'phy1',  label:'1. 물리 (Physical)\n비트,전기신호,케이블', x:0.5,y:0.82,icon:'hub'}
  ],
  steps:[
    {from:'app7', to:'pres6', col:'#fff',lbl:'L7→L6',badge:'OSI-07',title:'[L7] 응용 계층',   desc:'사용자와 가장 가까운 계층. 사용자 인터페이스 및 프로토콜 제공. PDU: 메시지.',           code:'프로토콜: HTTP, HTTPS, FTP\n        SMTP, DNS, DHCP, SSH\nPDU: 메시지(Message)\n장비: 없음 (소프트웨어)'},
    {from:'pres6',to:'sess5', col:'#fff',lbl:'L6→L5',badge:'OSI-06',title:'[L6] 표현 계층',   desc:'데이터 형식 변환, 암호화/복호화, 압축/해제.',                                             code:'기능: 인코딩(UTF-8)\n     암호화(SSL/TLS)\n     압축(JPEG,ZIP)\nPDU: 데이터(Data)'},
    {from:'sess5',to:'trans4',col:'#fff',lbl:'L5→L4',badge:'OSI-05',title:'[L5] 세션 계층',   desc:'통신 세션 설정·유지·종료 관리. 체크포인트로 복구 지원.',                                  code:'기능: 세션 설정/유지/종료\n     동기화(Sync Point)\n프로토콜: NetBIOS, RPC, NFS'},
    {from:'trans4',to:'net3', col:'#fff',lbl:'L4→L3',badge:'OSI-04',title:'[L4] 전송 계층',   desc:'종단 간 신뢰성 전송. 포트 번호로 프로세스 식별. 흐름·오류 제어.',                         code:'프로토콜: TCP, UDP\nPDU: 세그먼트(TCP)/데이터그램(UDP)\n장비: L4 스위치, 방화벽'},
    {from:'net3', to:'dl2',   col:'#fff',lbl:'L3→L2',badge:'OSI-03',title:'[L3] 네트워크 계층',desc:'IP 기반 경로 결정 및 패킷 전달.',                                                         code:'프로토콜: IPv4/v6, ICMP, OSPF, BGP\nPDU: 패킷(Packet)\n장비: 라우터, L3 스위치'},
    {from:'dl2',  to:'phy1',  col:'#fff',lbl:'L2→L1',badge:'OSI-02',title:'[L2] 데이터링크 계층',desc:'MAC 기반 프레임 전달. 오류 검출(FCS).',                                               code:'프로토콜: Ethernet, Wi-Fi(802.11)\n        ARP, PPP\nPDU: 프레임(Frame)\n장비: 스위치, 브리지'},
    {from:'phy1', to:'dl2',   col:'#888',lbl:'L1→L2',badge:'OSI-01',title:'[L1] 물리 계층',   desc:'비트를 전기·광·전파 신호로 변환해 전송.',                                                  code:'PDU: 비트(Bit)\n매체: UTP, 광케이블, 무선\n장비: 허브, 리피터, 케이블'}
  ],
  glossary:[{sec:'OSI 모델',terms:[
    {t:'OSI 7계층',d:'ISO 정의 네트워크 표준 모델. 통신을 7개 계층으로 분리해 표준화.'},
    {t:'PDU',d:'Protocol Data Unit. L4:세그먼트/데이터그램, L3:패킷, L2:프레임, L1:비트.'},
    {t:'캡슐화/역캡슐화',d:'송신: 상위→하위 계층으로 헤더 추가. 수신: 하위→상위 계층으로 헤더 제거.'},
    {t:'TCP/IP 4계층',d:'네트워크접근(L1+L2) / 인터넷(L3) / 전송(L4) / 응용(L5~L7).'}
  ]}]
};
