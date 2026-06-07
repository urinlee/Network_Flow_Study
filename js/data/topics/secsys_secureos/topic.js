// SECSYS: Secure OS
TOPICS['secsys_secureos'] = {cat:'secsys', label:'Secure OS & 접근제어',
  legend:[{c:'#fff',l:'허용'},{c:'#ff4444',l:'거부'},{c:'#aaa',l:'감사 로그'}],
  devices:[
    {id:'user',    label:'사용자/프로세스',        x:0.1,y:0.5,icon:'pc'},
    {id:'kernel',  label:'보안 커널 (TCB)',         x:0.42,y:0.5,icon:'firewall'},
    {id:'resource',label:'자원\n(파일/포트)',       x:0.78,y:0.5,icon:'server'},
    {id:'audit',   label:'감사 서버',               x:0.78,y:0.82,icon:'server'}
  ],
  steps:[
    {from:'user',   to:'kernel',  col:'#fff',   lbl:'접근 요청',badge:'SOS-01',title:'TCB & 참조 모니터',     desc:'Secure OS 핵심: TCB. 모든 접근 참조 모니터 통과.',code:'TCB 구성:\n- 보안 커널\n- 보안 정책 DB\n- 참조 모니터\n참조 모니터 조건:\n완전성·고립성·검증가능성'},
    {from:'kernel', to:'resource',col:'#fff',   lbl:'MAC 허용', badge:'SOS-02',title:'MAC — 강제 접근 제어',  desc:'보안 레이블 기반. 사용자 임의 변경 불가.',code:'Bell-LaPadula (기밀성):\n  No Read Up\n  No Write Down\nBiba (무결성):\n  No Read Down\n  No Write Up'},
    {from:'kernel', to:'resource',col:'#ff4444',lbl:'DAC 거부', badge:'SOS-03',title:'DAC & RBAC',            desc:'DAC: 소유자 권한 설정. RBAC: 역할 기반.',code:'DAC (Linux):\nrwxr-xr-- 754\nchmod 754 file.txt\n\nRBAC:\n홍길동→개발자→코드 읽기/쓰기'},
    {from:'kernel', to:'resource',col:'#fff',   lbl:'SELinux',  badge:'SOS-04',title:'SELinux',               desc:'타입 집행(TE) 기반 MAC. RHEL 기본 탑재.',code:'컨텍스트: user:role:type:level\nhttpd_t → httpd_content_t만 허용\n→ /etc/passwd 접근 거부!\n\ngetenforce\nsetenforce 1'},
    {from:'kernel', to:'audit',   col:'#aaa',   lbl:'감사 로그',badge:'SOS-05',title:'감사 & 최소 권한',      desc:'모든 접근 로그 기록. 최소 권한 원칙.',code:'감사 로그:\nhttpd obj=/etc/passwd DENIED\n\n최소 권한:\n- root 직접 사용 금지 → sudo\n- 서비스 계정: 전용 권한만'}
  ],
  glossary:[{sec:'Secure OS',terms:[
    {t:'TCB',d:'Trusted Computing Base. 보안 정책 집행 핵심 요소.'},
    {t:'MAC',d:'Mandatory Access Control. 보안 레이블 기반. Bell-LaPadula, Biba 모델.'},
    {t:'DAC',d:'Discretionary Access Control. 소유자가 권한 설정. Linux 파일 권한.'},
    {t:'RBAC',d:'역할 기반 접근 제어. 역할에 권한 부여.'},
    {t:'SELinux',d:'NSA 개발. 타입 집행(TE) 기반 MAC. RHEL 기본 탑재.'},
    {t:'최소 권한',d:'필요한 최소 권한만 부여. 침해 피해 최소화.'}
  ]}]
};
