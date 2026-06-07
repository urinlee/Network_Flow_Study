// ================================================================
// ICON RENDERER
// ================================================================
function drawIcon(c, type, x, y, r, col) {
  col = col || '#888';
  c.save(); c.strokeStyle = col; c.fillStyle = col; c.lineWidth = 1.3;
  var s = r * 0.52;
  if (type === 'pc') {
    c.strokeRect(x-s, y-s*0.7, s*2, s*1.2);
    c.beginPath(); c.moveTo(x-s*0.35, y+s*0.5); c.lineTo(x+s*0.35, y+s*0.5); c.stroke();
    c.beginPath(); c.moveTo(x, y+s*0.5); c.lineTo(x, y+s*0.8); c.stroke();
    c.beginPath(); c.moveTo(x-s*0.5, y+s*0.8); c.lineTo(x+s*0.5, y+s*0.8); c.stroke();
  } else if (type === 'server') {
    for (var i=0; i<3; i++) { var ry=y-s*0.65+i*s*0.48; c.strokeRect(x-s,ry,s*2,s*0.35); c.beginPath(); c.arc(x+s*0.72,ry+s*0.17,s*0.08,0,Math.PI*2); c.fill(); }
  } else if (type === 'router') {
    c.beginPath(); c.arc(x,y,s*0.78,0,Math.PI*2); c.stroke();
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ c.beginPath(); c.moveTo(x+d[0]*s*0.32,y+d[1]*s*0.32); c.lineTo(x+d[0]*s*0.72,y+d[1]*s*0.72); c.stroke(); });
  } else if (type === 'switch') {
    c.strokeRect(x-s,y-s*0.4,s*2,s*0.8);
    for (var i=0; i<4; i++) { var px=x-s*0.65+i*s*0.42; c.strokeRect(px,y-s*0.22,s*0.22,s*0.44); }
  } else if (type === 'firewall') {
    c.strokeRect(x-s*0.9,y-s*0.9,s*1.8,s*1.8);
    c.beginPath(); c.moveTo(x-s*0.5,y-s*0.6); c.lineTo(x-s*0.5,y+s*0.6); c.stroke();
    c.beginPath(); c.moveTo(x+s*0.5,y-s*0.6); c.lineTo(x+s*0.5,y+s*0.6); c.stroke();
    c.beginPath(); c.moveTo(x-s*0.9,y); c.lineTo(x+s*0.9,y); c.stroke();
  } else if (type === 'dns') {
    c.strokeRect(x-s,y-s*0.65,s*2,s*1.3);
    for (var i=1; i<=3; i++) { var ly=y-s*0.65+i*s*0.3; c.beginPath(); c.moveTo(x-s*0.65,ly); c.lineTo(x+s*0.65,ly); c.stroke(); }
  } else if (type === 'cloud') {
    c.beginPath(); c.arc(x,y-s*0.1,s*0.6,0,Math.PI*2); c.stroke();
    c.beginPath(); c.arc(x-s*0.5,y+s*0.2,s*0.4,0,Math.PI*2); c.stroke();
    c.beginPath(); c.arc(x+s*0.5,y+s*0.2,s*0.4,0,Math.PI*2); c.stroke();
    c.beginPath(); c.moveTo(x-s*0.9,y+s*0.55); c.lineTo(x+s*0.9,y+s*0.55); c.stroke();
  } else if (type === 'hacker') {
    c.beginPath(); c.arc(x,y-s*0.35,s*0.4,0,Math.PI*2); c.stroke();
    c.beginPath(); c.moveTo(x-s*0.5,y+s*0.8); c.quadraticCurveTo(x-s*0.5,y+s*0.1,x,y+s*0.05); c.quadraticCurveTo(x+s*0.5,y+s*0.1,x+s*0.5,y+s*0.8); c.stroke();
    [-s*0.15, s*0.15].forEach(function(ox){ c.beginPath(); c.moveTo(x+ox-s*0.07,y-s*0.42); c.lineTo(x+ox+s*0.07,y-s*0.28); c.stroke(); c.beginPath(); c.moveTo(x+ox+s*0.07,y-s*0.42); c.lineTo(x+ox-s*0.07,y-s*0.28); c.stroke(); });
  } else if (type === 'hub') {
    c.strokeRect(x-s,y-s*0.35,s*2,s*0.7);
    for (var i=0; i<5; i++) { c.beginPath(); c.arc(x-s*0.8+i*s*0.4,y+s*0.6,s*0.1,0,Math.PI*2); c.fill(); }
  }
  c.restore();
}

// ================================================================
// STATE
// ================================================================
var W, H;
var currentTopicId = 'osi_model';
var currentStep = -1;
var playing = false;
var playTimer = null;
var loopAnim = -1;
var animFrame = null;
var packets = [];
var devices = [];
var steps = [];
var currentPane = 'step';
var bgC = document.getElementById('bgC');
var mainC = document.getElementById('mainC');
var bgX = bgC.getContext('2d');
var ctx = mainC.getContext('2d');
var area = document.getElementById('canvasWrap');
var tt = document.getElementById('tooltip');

// ================================================================
// INIT UI
// ================================================================
function initUI() {
  var catNav = document.getElementById('catNav');
  CATS.forEach(function(c) {
    var b = document.createElement('button');
    b.className = 'cat-btn' + (c.atk ? ' atk' : '');
    b.textContent = c.label;
    b.dataset.cat = c.id;
    b.onclick = function() { filterByCat(c.id); };
    catNav.appendChild(b);
  });
  renderTopicList(null);
  loadTopic('osi_model');
}

function renderTopicList(filter) {
  var list = document.getElementById('topicList');
  list.innerHTML = '';
  var grouped = {};
  Object.keys(TOPICS).forEach(function(id) {
    var t = TOPICS[id];
    if (filter && t.label.toLowerCase().indexOf(filter.toLowerCase()) === -1) return;
    if (!grouped[t.cat]) grouped[t.cat] = [];
    grouped[t.cat].push({id: id, t: t});
  });
  CATS.forEach(function(c) {
    if (!grouped[c.id]) return;
    var sec = document.createElement('div');
    sec.className = 'topic-section';
    sec.textContent = c.label;
    list.appendChild(sec);
    grouped[c.id].forEach(function(item) {
      var el = document.createElement('div');
      el.className = 'topic-item' + (c.atk ? ' atk' : '') + (item.id === currentTopicId ? ' active' : '');
      el.textContent = item.t.label;
      el.dataset.id = item.id;
      el.onclick = function() { loadTopic(item.id); };
      list.appendChild(el);
    });
  });
}

function filterByCat(catId) {
  document.querySelectorAll('.cat-btn').forEach(function(b) { b.classList.toggle('active', b.dataset.cat === catId); });
  var list = document.getElementById('topicList');
  list.innerHTML = '';
  var isAtk = false;
  CATS.forEach(function(c) { if (c.id === catId) isAtk = c.atk; });
  Object.keys(TOPICS).filter(function(id) { return TOPICS[id].cat === catId; }).forEach(function(id) {
    var el = document.createElement('div');
    el.className = 'topic-item' + (isAtk ? ' atk' : '') + (id === currentTopicId ? ' active' : '');
    el.textContent = TOPICS[id].label;
    el.dataset.id = id;
    el.onclick = function() { loadTopic(id); };
    list.appendChild(el);
  });
}

function filterTopics(q) {
  document.querySelectorAll('.cat-btn').forEach(function(b) { b.classList.remove('active'); });
  renderTopicList(q || null);
}

// ================================================================
// LOAD TOPIC
// ================================================================
function loadTopic(id) {
  if (!TOPICS[id]) return;
  if (playing) togglePlay();
  if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
  if (playTimer) { clearTimeout(playTimer); playTimer = null; }
  currentTopicId = id;
  loopAnim = -1;
  currentStep = -1;
  packets = [];
  var tp = TOPICS[id];
  devices = tp.devices.map(function(d) { return {id:d.id,label:d.label,icon:d.icon,px:d.x*W,py:d.y*H}; });
  steps = tp.steps || [];
  document.querySelectorAll('.topic-item').forEach(function(el) { el.classList.toggle('active', el.dataset.id === id); });
  var isAtk = false;
  CATS.forEach(function(c) { if (c.id === tp.cat) isAtk = c.atk; });
  var leg = document.getElementById('legend');
  leg.innerHTML = (tp.legend || []).map(function(l) { return '<div class="legend-item"><div class="legend-line" style="background:'+l.c+'"></div>'+l.l+'</div>'; }).join('');
  document.getElementById('progFill').className = 'prog-fill' + (isAtk ? ' atk' : '');
  document.getElementById('pt-step').className = 'ptab active' + (isAtk ? ' atk' : '');
  document.getElementById('pt-gls').className = 'ptab';
  renderGlossary(tp.glossary || []);
  switchPane('step');
  updateStepInfo(-1);
  updateProgress();
  drawBg();
  drawScene();
}

// ================================================================
// DRAW
// ================================================================
function resize() {
  var dpr = window.devicePixelRatio || 1;
  W = area.clientWidth; H = area.clientHeight;
  bgC.width = W * dpr; bgC.height = H * dpr;
  bgC.style.width = W + 'px'; bgC.style.height = H + 'px';
  mainC.width = W * dpr; mainC.height = H * dpr;
  mainC.style.width = W + 'px'; mainC.style.height = H + 'px';
  bgX.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawBg();
  if (currentTopicId && TOPICS[currentTopicId]) {
    var tp = TOPICS[currentTopicId];
    devices = tp.devices.map(function(d) { return {id:d.id,label:d.label,icon:d.icon,px:d.x*W,py:d.y*H}; });
  }
  drawScene();
}

function drawBg() {
  bgX.clearRect(0, 0, W, H);
  bgX.fillStyle = '#0d0d0d';
  bgX.fillRect(0, 0, W, H);
  var zones = ZONE_DEFS[currentTopicId] || ZONE_DEFS['default'];
  var PAD = 10;
  zones.forEach(function(z) {
    if (z.horiz) {
      var zy = z.y * H + PAD, zh = z.h * H - PAD * 2;
      bgX.fillStyle = z.color; bgX.fillRect(PAD, zy, W - PAD*2, zh);
      bgX.strokeStyle = z.border; bgX.lineWidth = 1; bgX.setLineDash([4,6]);
      bgX.strokeRect(PAD+0.5, zy+0.5, W-PAD*2-1, zh-1); bgX.setLineDash([]);
      bgX.font = '10px Arial,sans-serif'; bgX.fillStyle = z.border;
      bgX.textAlign = 'left'; bgX.textBaseline = 'top';
      bgX.fillText(z.label, PAD+8, zy+6);
    } else {
      var zx = z.x * W + PAD, zw = z.w * W - PAD * 2;
      bgX.fillStyle = z.color; bgX.fillRect(zx, PAD, zw, H-PAD*2);
      bgX.strokeStyle = z.border; bgX.lineWidth = 1; bgX.setLineDash([4,6]);
      bgX.strokeRect(zx+0.5, PAD+0.5, zw-1, H-PAD*2-1); bgX.setLineDash([]);
      bgX.font = 'bold 10px Arial,sans-serif'; bgX.fillStyle = z.border;
      bgX.textAlign = 'center'; bgX.textBaseline = 'top';
      bgX.fillText(z.label, zx+zw/2, PAD+7);
    }
  });
  bgX.fillStyle = 'rgba(255,255,255,0.022)';
  for (var x=20; x<W; x+=30) for (var y=20; y<H; y+=30) bgX.fillRect(x, y, 1, 1);
}

function drawScene() {
  ctx.clearRect(0, 0, W, H);
  drawConns();
  drawLANGroups();
  drawPkts();
  drawDevs();
}

function getD(id) {
  for (var i=0; i<devices.length; i++) if (devices[i].id === id) return devices[i];
  return null;
}

function drawConns() {
  if (!devices || devices.length < 2) return;
  var sd = (currentStep >= 0 && steps[currentStep]) ? steps[currentStep] : null;
  var isAtk = false;
  if (TOPICS[currentTopicId]) CATS.forEach(function(c) { if (c.id === TOPICS[currentTopicId].cat) isAtk = c.atk; });
  for (var i=0; i<devices.length; i++) {
    for (var j=i+1; j<devices.length; j++) {
      var a = devices[i], b = devices[j];
      var active = sd && ((sd.from===a.id&&sd.to===b.id)||(sd.from===b.id&&sd.to===a.id));
      ctx.save();
      ctx.beginPath(); ctx.moveTo(a.px, a.py); ctx.lineTo(b.px, b.py);
      ctx.strokeStyle = active ? (isAtk ? 'rgba(255,68,68,.18)' : 'rgba(255,255,255,.15)') : 'rgba(255,255,255,.04)';
      ctx.lineWidth = active ? 1.5 : 1;
      ctx.setLineDash(active ? [] : [5,6]);
      ctx.stroke(); ctx.restore();
    }
  }
}

function drawLANGroups() {
  var groups = LAN_GROUPS[currentTopicId] || [];
  if (!groups.length) return;
  var PAD = 42;
  groups.forEach(function(g) {
    var members = g.ids.map(function(id) { return getD(id); }).filter(function(d) { return !!d; });
    if (members.length < 1) return;
    var xs = members.map(function(d) { return d.px; });
    var ys = members.map(function(d) { return d.py; });
    var minX = Math.min.apply(null,xs)-PAD, minY = Math.min.apply(null,ys)-PAD;
    var maxX = Math.max.apply(null,xs)+PAD, maxY = Math.max.apply(null,ys)+PAD;
    var rr = 10;
    ctx.save();
    ctx.fillStyle = g.color + '11';
    ctx.strokeStyle = g.color + '66';
    ctx.lineWidth = 1.2; ctx.setLineDash([5,4]);
    ctx.beginPath();
    ctx.moveTo(minX+rr,minY); ctx.lineTo(maxX-rr,minY); ctx.quadraticCurveTo(maxX,minY,maxX,minY+rr);
    ctx.lineTo(maxX,maxY-rr); ctx.quadraticCurveTo(maxX,maxY,maxX-rr,maxY);
    ctx.lineTo(minX+rr,maxY); ctx.quadraticCurveTo(minX,maxY,minX,maxY-rr);
    ctx.lineTo(minX,minY+rr); ctx.quadraticCurveTo(minX,minY,minX+rr,minY);
    ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.setLineDash([]);
    ctx.font = 'bold 9px Arial,sans-serif';
    var tw = ctx.measureText(g.label).width;
    ctx.fillStyle = g.color + 'cc';
    ctx.fillRect(minX+5, minY+4, tw+6, 13);
    ctx.fillStyle = '#000'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText(g.label, minX+8, minY+5);
    ctx.restore();
  });
}

function drawDevs() {
  if (!devices || !devices.length) return;
  var sd = (currentStep >= 0 && steps[currentStep]) ? steps[currentStep] : null;
  var isAtk = false;
  if (TOPICS[currentTopicId]) CATS.forEach(function(c) { if (c.id === TOPICS[currentTopicId].cat) isAtk = c.atk; });
  devices.forEach(function(d) {
    var r = 28;
    var active = sd && (sd.from === d.id || sd.to === d.id);
    var isH = d.icon === 'hacker';
    var ac = isH ? '#ff4444' : (isAtk ? '#ff8844' : '#fff');
    var bc = active ? ac : (isH ? '#441111' : '#222');
    if (active) {
      ctx.beginPath(); ctx.arc(d.px,d.py,r+6,0,Math.PI*2);
      ctx.strokeStyle = isH ? 'rgba(255,68,68,.18)' : 'rgba(255,255,255,.08)';
      ctx.lineWidth = 1; ctx.setLineDash([]); ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(d.px,d.py,r,0,Math.PI*2);
    ctx.fillStyle = active ? (isH ? '#1a0000' : '#161616') : (isH ? '#0d0000' : '#111');
    ctx.fill(); ctx.strokeStyle = bc; ctx.lineWidth = active ? 1.5 : 1; ctx.stroke();
    drawIcon(ctx, d.icon, d.px, d.py, r, active ? ac : (isH ? '#662222' : '#444'));
    ctx.font = '9px Arial,Helvetica,sans-serif';
    ctx.fillStyle = active ? (isH ? '#ff8888' : '#bbb') : (isH ? '#441111' : '#444');
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    var lines = d.label.split('\n');
    for (var i=0; i<lines.length; i++) ctx.fillText(lines[i], d.px, d.py+r+6+i*12);
  });
}

function drawPkts() {
  packets.forEach(function(p) {
    if (!p.active) return;
    var f = getD(p.from), t = getD(p.to);
    if (!f || !t) return;
    var x = f.px+(t.px-f.px)*p.t, y = f.py+(t.py-f.py)*p.t;
    for (var i=1; i<=5; i++) {
      var tt2 = Math.max(0, p.t-i*0.04);
      ctx.beginPath(); ctx.arc(f.px+(t.px-f.px)*tt2, f.py+(t.py-f.py)*tt2, 4-i*0.5, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,255,255,'+(1-i/6)*0.2+')'; ctx.fill();
    }
    ctx.beginPath(); ctx.arc(x,y,5,0,Math.PI*2);
    ctx.fillStyle = p.col; ctx.fill();
    ctx.strokeStyle = '#000'; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.font = 'bold 8px Arial,sans-serif'; ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
    ctx.fillText(p.lbl.split('\n')[0], x, y-13);
  });
}

// ================================================================
// ANIMATION
// ================================================================
function animateStep(idx, onDone, loop) {
  loop = loop || false;
  if (!steps || idx < 0 || idx >= steps.length || !steps[idx]) return;
  var s = steps[idx];
  if (!s.from || !s.to) return;
  var pkt = {from:s.from, to:s.to, col:s.col, lbl:s.lbl, t:0, active:true};
  packets = [pkt];
  var start = null;
  function frame(ts) {
    if (!start) start = ts;
    pkt.t = Math.min(1, (ts-start)/880);
    drawScene();
    if (pkt.t < 1) {
      animFrame = requestAnimationFrame(frame);
    } else {
      packets = []; drawScene();
      if (loop && loopAnim === idx) {
        animFrame = null;
        playTimer = setTimeout(function() { if (loopAnim === idx) animateStep(idx, null, true); }, 380);
      } else if (onDone) {
        setTimeout(onDone, 180);
      }
    }
  }
  if (animFrame) cancelAnimationFrame(animFrame);
  animFrame = requestAnimationFrame(frame);
}

function goToStep(idx) {
  if (!steps || idx < 0 || idx >= steps.length || !steps[idx]) return;
  if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
  if (playTimer) { clearTimeout(playTimer); playTimer = null; }
  loopAnim = idx; currentStep = idx;
  updateStepInfo(idx); updateProgress();
  animateStep(idx, null, true);
}

function nextStep() { if (steps && currentStep < steps.length-1) goToStep(currentStep+1); }

function prevStep() {
  if (currentStep > 0) { goToStep(currentStep-1); }
  else if (currentStep === 0) {
    loopAnim = -1; currentStep = -1;
    if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
    if (playTimer) { clearTimeout(playTimer); playTimer = null; }
    updateStepInfo(-1); updateProgress(); drawScene();
  }
}

function resetAnim() {
  if (playing) togglePlay();
  if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
  if (playTimer) { clearTimeout(playTimer); playTimer = null; }
  loopAnim = -1; packets = []; currentStep = -1;
  updateStepInfo(-1); updateProgress(); drawScene();
}

function togglePlay() {
  playing = !playing;
  var btn = document.getElementById('playBtn');
  if (playing) {
    loopAnim = -1; btn.textContent = '⏸ 일시 정지'; runAutoPlay();
  } else {
    btn.textContent = '▶ 자동 재생';
    if (playTimer) { clearTimeout(playTimer); playTimer = null; }
    if (currentStep >= 0) { loopAnim = currentStep; animateStep(currentStep, null, true); }
  }
}

function runAutoPlay() {
  if (!playing) return;
  loopAnim = -1;
  var next = currentStep + 1;
  if (!steps || next >= steps.length) {
    currentStep = -1;
    playTimer = setTimeout(function() { if (playing) runAutoPlay(); }, 900);
    return;
  }
  currentStep = next; updateStepInfo(next); updateProgress();
  animateStep(next, function() { if (playing) playTimer = setTimeout(runAutoPlay, 820); });
}

// ================================================================
// UI UPDATES
// ================================================================
function updateStepInfo(idx) {
  var tp = TOPICS[currentTopicId];
  if (!tp) return;
  var isAtk = false;
  CATS.forEach(function(c) { if (c.id === tp.cat) isAtk = c.atk; });
  var el = document.getElementById('pane-step');
  if (!el) return;
  if (idx < 0 || !steps || !steps[idx]) {
    el.innerHTML = '<div class="step-badge">대기 중</div><div class="step-title">시작 전</div><div class="step-desc">▶ 재생 또는 다음 버튼으로 진행하세요.</div>';
    return;
  }
  var s = steps[idx];
  var warn = s.warn ? '<div class="warn-box">' + s.warn.replace(/\n/g,'<br>') + '</div>' : '';
  el.innerHTML = '<div class="step-badge '+(isAtk?'atk':'')+'">'+(s.badge||'')+' / '+steps.length+'</div>'
    +'<div class="step-title">'+(s.title||'')+'</div>'
    +'<div class="step-desc">'+(s.desc||'')+'</div>'
    +'<div class="step-code '+(isAtk?'atk':'')+'"><code>'+(s.code||'').replace(/\n/g,'<br>')+'</code></div>'
    +warn;
}

function updateProgress() {
  var pct = (!steps || currentStep < 0) ? 0 : ((currentStep+1)/steps.length*100);
  var el = document.getElementById('progFill');
  if (el) el.style.width = pct + '%';
}

function renderGlossary(gls) {
  var el = document.getElementById('pane-gls');
  if (!el) return;
  if (!gls || !gls.length) { el.innerHTML = '<div style="color:#333;font-size:10px;padding:8px 0;">용어 없음</div>'; return; }
  el.innerHTML = gls.map(function(sec) {
    return '<div class="gls-sec-title">'+(sec.sec||'')+'</div>'
      +(sec.terms||[]).map(function(t) { return '<div class="gls-term">'+(t.t||'')+'</div><div class="gls-def">'+(t.d||'')+'</div>'; }).join('');
  }).join('');
}

function switchPane(p) {
  currentPane = p;
  var isAtk = false;
  if (TOPICS[currentTopicId]) CATS.forEach(function(c) { if (c.id === TOPICS[currentTopicId].cat) isAtk = c.atk; });
  ['step','gls'].forEach(function(k) {
    var pt = document.getElementById('pt-'+k);
    var pn = document.getElementById('pane-'+k);
    if (pt) pt.className = 'ptab' + (k===p ? ' active'+(isAtk?' atk':'') : '');
    if (pn) pn.className = 'pane' + (k===p ? ' show' : '');
  });
}

// ================================================================
// TOOLTIP
// ================================================================
mainC.addEventListener('mousemove', function(e) {
  if (!devices || !devices.length) { tt.style.opacity='0'; return; }
  var r = mainC.getBoundingClientRect(), mx = e.clientX-r.left, my = e.clientY-r.top;
  var found = null;
  for (var i=0; i<devices.length; i++) {
    if (Math.sqrt(Math.pow(mx-devices[i].px,2)+Math.pow(my-devices[i].py,2)) < 32) { found = devices[i]; break; }
  }
  if (found) {
    tt.style.opacity = '1';
    document.getElementById('ttTitle').textContent = found.label.split('\n')[0];
    document.getElementById('ttBody').textContent = found.label.split('\n').slice(1).join(' ');
    var tx = e.clientX+14, ty = e.clientY-8;
    if (tx+220 > window.innerWidth) tx = e.clientX-230;
    if (ty+80 > window.innerHeight) ty = e.clientY-80;
    tt.style.left = tx+'px'; tt.style.top = ty+'px';
    mainC.style.cursor = 'pointer';
  } else { tt.style.opacity = '0'; mainC.style.cursor = 'default'; }
});
mainC.addEventListener('mouseleave', function() { tt.style.opacity = '0'; });
mainC.addEventListener('click', function(e) {
  if (!devices || !devices.length) return;
  var r = mainC.getBoundingClientRect(), mx = e.clientX-r.left, my = e.clientY-r.top;
  for (var i=0; i<devices.length; i++) {
    var d = devices[i];
    if (Math.sqrt(Math.pow(mx-d.px,2)+Math.pow(my-d.py,2)) < 32) {
      var el = document.getElementById('pane-step');
      var isAtk = false;
      if (TOPICS[currentTopicId]) CATS.forEach(function(c) { if (c.id === TOPICS[currentTopicId].cat) isAtk = c.atk; });
      if (el) el.innerHTML = '<div class="step-badge '+(isAtk?'atk':'')+'">장치 정보</div>'
        +'<div class="step-title">'+d.label.split('\n')[0]+'</div>'
        +'<div class="step-desc">'+d.label.split('\n').slice(1).join('<br>')+'</div>';
      switchPane('step'); break;
    }
  }
});

window.addEventListener('resize', resize);
resize();
initUI();
