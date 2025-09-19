/*!
 * wipe.js – top-to-bottom page wipe transition (improved)
 * data-wipe 的 <a> 觸發轉場，動畫結束後或最少顯示時間到才導頁
 */
(function () {
  function injectStyleOnce() {
    if (document.getElementById('wipe-style')) return;
    const css = `
#page-wipe{
  position: fixed;
  inset: 0;
  z-index: var(--wipe-z, 2000);
  background: var(--wipe-bg, #07041F);
  transform: translateY(-100%);
  pointer-events: none;
  will-change: transform;
}
#page-wipe.is-active{
  /* 80% 時就覆蓋全畫面，最後 20% 停留以確保可見 */
  animation: wipeDown var(--wipe-duration, 700ms) var(--wipe-easing, cubic-bezier(.4,0,.2,1)) forwards;
}
@keyframes wipeDown{
  0%   { transform: translateY(-100%); }
  80%  { transform: translateY(0); }
  100% { transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce){
  #page-wipe.is-active{ animation-duration: 1ms; }
}
    `.trim();
    const el = document.createElement('style');
    el.id = 'wipe-style';
    el.textContent = css;
    document.head.appendChild(el);
  }

  function getOrCreateWipeLayer() {
    let layer = document.getElementById('page-wipe');
    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'page-wipe';
      document.body.appendChild(layer);
    }
    return layer;
  }

  const nextFrame = () => new Promise(r => requestAnimationFrame(() => r()));

  function parseTime(val) {
    if (!val) return 0;
    val = String(val).trim();
    if (val.endsWith('ms')) return parseFloat(val);
    if (val.endsWith('s'))  return parseFloat(val) * 1000;
    const n = parseFloat(val);
    return Number.isFinite(n) ? n : 0;
  }

  function playAndNavigate(url, opts) {
    const layer = getOrCreateWipeLayer();

    // 客製參數（CSS 變數）
    if (opts && opts.bg)       layer.style.setProperty('--wipe-bg', opts.bg);
    if (opts && opts.z)        layer.style.setProperty('--wipe-z', String(opts.z));
    if (opts && opts.duration) layer.style.setProperty('--wipe-duration', opts.duration);
    if (opts && opts.easing)   layer.style.setProperty('--wipe-easing', opts.easing);

    // 先讓覆蓋層進入渲染隊列，再觸發動畫（避免「只閃一下」）
    Promise.resolve()
      .then(nextFrame)
      .then(nextFrame)
      .then(() => {
        const minVisibleMs = Math.max(0, opts?.minVisible ?? 350); // 最少可見時間
        let navigated = false;
        const goNow = () => {
          if (navigated) return;
          navigated = true;
          window.location.href = url;
        };

        const start = performance.now();
        const onEnd = () => {
          const elapsed = performance.now() - start;
          const wait = Math.max(0, minVisibleMs - elapsed);
          setTimeout(goNow, wait);
        };

        layer.addEventListener('animationend', onEnd, { once: true });

        // 啟動動畫
        layer.classList.add('is-active');

        // 以 CSS var 為準的備援計時
        const dur = parseTime(getComputedStyle(layer).getPropertyValue('--wipe-duration')) || 700;
        setTimeout(onEnd, dur + 60);
      });
  }

  function bindLinks() {
    document.querySelectorAll('a[data-wipe]').forEach(a => {
      a.addEventListener('click', (e) => {
        // 不攔截新分頁/複製連結等
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return;

        const href = a.getAttribute('href');
        if (!href || href.startsWith('javascript:')) return;

        e.preventDefault();

        const opts = {
          bg:        a.dataset.wipeBg || undefined,
          duration:  a.dataset.wipeDuration || undefined,   // "800ms" / "0.8s"
          easing:    a.dataset.wipeEasing || undefined,
          z:         a.dataset.wipeZ || undefined,
          minVisible: a.dataset.wipeMinVisible ? parseInt(a.dataset.wipeMinVisible, 10) : undefined
        };

        playAndNavigate(href, opts);
      });
    });
  }

  function init() {
    injectStyleOnce();
    getOrCreateWipeLayer();
    bindLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 手動觸發
  window.Wipe = { go: (url, opts) => playAndNavigate(url, opts) };
})();
