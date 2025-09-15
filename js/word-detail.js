import "../assets/scss/all.scss";

import * as bootstrap from "bootstrap"

const homeLink = document.querySelector(".footer-nav a[href='#home']");
homeLink.classList.remove("active");
const wordLink = document.querySelector(".footer-nav a[href='#word']");
wordLink.classList.add("active");

// 抓取 footer-nav 所有 a 連結中 href 開頭為 # 的
document.querySelectorAll('.footer-nav a[href^="#"]').forEach(link => {
  const key = link.getAttribute("href").replace("#", "");
  // 修改 href
  link.setAttribute("href", `./StreamLish.html#${key}`);
  // 移除 data-bs-toggle
  link.removeAttribute("data-bs-toggle");
});
