import "../assets/scss/review.scss";

import * as bootstrap from "bootstrap"

// 抓取 footer-nav 所有 a 連結中 href 開頭為 # 的
document.querySelectorAll('.footer-nav a[href^="#"]').forEach(link => {
  const key = link.getAttribute("href").replace("#", "");
  // 修改 href
  link.setAttribute("href", `./StreamLish.html#${key}`);
  // 移除 data-bs-toggle
  link.removeAttribute("data-bs-toggle");
});


const header = document.getElementById('review-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});