import './assets/scss/all.scss';
import * as bootstrap from "bootstrap"


console.log('Hello world');

document.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash;
  if (hash) {
    const triggerEl = document.querySelector(`a[href="${hash}"]`);
    if (triggerEl) {
      new bootstrap.Tab(triggerEl).show();
    }

    // 移除網址 hash，但不重新載入頁面
    history.replaceState(null, null, window.location.pathname);
  }
});