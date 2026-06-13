/* =================================================================
 * c176 · Mixing Portfolio — 交互逻辑
 * ================================================================= */

/* ---------- 1. 数字递增动画 ---------- */
function animateNumber(el) {
  const target = parseInt(el.dataset.count, 10) || 0;
  const duration = 1500;
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const numObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      animateNumber(e.target);
      numObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.meta-num').forEach((el) => numObserver.observe(el));

/* ---------- 2. 导航高亮 + 平滑滚动 ---------- */
const navLinks = document.querySelectorAll('.nav__links a');
navLinks.forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const id = a.getAttribute('href');
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const id = '#' + e.target.id;
      navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === id));
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach((s) => navObserver.observe(s));

/* ---------- 3. Hero 频谱动画(Canvas) ---------- */
(() => {
  const canvas = document.getElementById('spectrum');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, bars;
  const BAR_COUNT = 64;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', resize);

  bars = Array.from({ length: BAR_COUNT }, () => Math.random());
  let phase = 0;
  function frame() {
    ctx.clearRect(0, 0, w, h);
    phase += 0.025;
    const cx = w / 2, cy = h * 0.65;
    const radius = Math.min(w, h) * 0.18;
    const barW = 3;
    const gap = (Math.PI * 2 * radius) / BAR_COUNT;
    for (let i = 0; i < BAR_COUNT; i++) {
      const angle = (i / BAR_COUNT) * Math.PI * 2 - Math.PI / 2;
      // 模拟频谱 — 多个正弦叠加 + 缓动
      const v =
        Math.sin(phase * 2 + i * 0.3) * 0.3 +
        Math.sin(phase * 3.7 + i * 0.15) * 0.25 +
        Math.sin(phase * 5.1 + i * 0.5) * 0.15;
      const amp = (v + 0.7) * 30 + Math.random() * 6;
      const x1 = cx + Math.cos(angle) * radius;
      const y1 = cy + Math.sin(angle) * radius;
      const x2 = cx + Math.cos(angle) * (radius + amp);
      const y2 = cy + Math.sin(angle) * (radius + amp);
      // 颜色:青→粉渐变
      const t = i / BAR_COUNT;
      const r = Math.round(40 + (255 - 40) * t);
      const g = Math.round(224 - (224 - 45) * t);
      const b = Math.round(196 - (196 - 138) * t);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.85)`;
      ctx.lineWidth = barW;
      ctx.lineCap = 'round';
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ---------- 4. 作品分类切换 ---------- */
const tabs = document.querySelectorAll('.works__tabs .tab');
const tracks = document.querySelectorAll('.works__grid .track');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    const cat = tab.dataset.cat;
    tracks.forEach((tr) => {
      const show = cat === 'all' || tr.dataset.cat === cat;
      tr.classList.toggle('is-hidden', !show);
    });
  });
});

/* ---------- 5. Before/After 模态框 ---------- */
// 在这里绑定你的对比音频文件:键名对应 <button data-target="...">
const baTracks = {
  'pop-01':    { title: '深海蓝 (Demo) — Pop',     before: 'assets/pop-01-before.mp3',    after: 'assets/pop-01.mp3' },
  'rock-01':   { title: 'Run the Night — Rock',    before: 'assets/rock-01-before.mp3',   after: 'assets/rock-01.mp3' },
  'jazz-01':   { title: 'Blue Note Trio — Jazz',   before: 'assets/jazz-01-before.mp3',   after: 'assets/jazz-01.mp3' },
  'classic-01':{ title: '弦乐四重奏 — Classical',   before: 'assets/classic-01-before.mp3',after: 'assets/classic-01.mp3' },
};

const modal = document.getElementById('baModal');
const baTitle = document.getElementById('baTitle');
const baBefore = document.getElementById('baBefore');
const baAfter = document.getElementById('baAfter');
let currentAudio = null;

function playAudio(url) {
  if (currentAudio) { currentAudio.pause(); currentAudio = null; }
  if (!url) return;
  const a = new Audio(url);
  a.volume = 0.85;
  a.play().catch(() => { /* 用户未交互,自动播放会被浏览器拦截,这是正常的 */ });
  currentAudio = a;
  a.addEventListener('ended', () => { currentAudio = null; });
}

function openBA(key) {
  const t = baTracks[key];
  if (!t) return;
  baTitle.textContent = t.title + ' · Before / After';
  baBefore.onclick = () => playAudio(t.before);
  baAfter.onclick  = () => playAudio(t.after);
  modal.classList.add('is-open');
}
function closeBA() {
  modal.classList.remove('is-open');
  if (currentAudio) { currentAudio.pause(); currentAudio = null; }
}
document.querySelectorAll('.ba-btn').forEach((b) => {
  b.addEventListener('click', () => openBA(b.dataset.target));
});
document.getElementById('baClose').addEventListener('click', closeBA);
modal.addEventListener('click', (e) => { if (e.target === modal) closeBA(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeBA(); });

/* ---------- 6. 联系表单(占位提交) ---------- */
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  // 这里可以接入 Formspree / 邮件服务 / 自建 API
  console.log('Form submit:', data);
  formStatus.textContent = '✅ 询价已记录!我会在 12 小时内联系你。';
  formStatus.style.color = 'var(--neon-cyan)';
  form.reset();
  setTimeout(() => { formStatus.textContent = ''; }, 5000);
});

/* ---------- 7. 作品卡悬停:声波条纹 CSS 动效 ---------- */
document.querySelectorAll('.track').forEach((track) => {
  track.addEventListener('mouseenter', () => {
    track.style.setProperty('--hover', '1');
  });
});
