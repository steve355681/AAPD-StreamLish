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
const headerWidth =  header.getBoundingClientRect().width;
header.style.setProperty('--header-width', `${headerWidth}px`);

window.addEventListener('scroll', () => {
  if (window.scrollY > 0 && !header.classList.contains('scrolled')) {
    header.classList.add('scrolled');
  }
  if(window.scrollY <= 0) {
    header.classList.remove('scrolled');
  }
});

window.addEventListener('resize', () => {
  const headerWidth =  header.getBoundingClientRect().width;
  header.style.setProperty('--header-width', `${headerWidth}px`);
});