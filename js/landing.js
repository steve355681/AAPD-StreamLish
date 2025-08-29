import "../assets/scss/landing.scss";

import * as bootstrap from "bootstrap"

const bg = document.getElementById("landing-bg");
let posY = 0;
const speed = 0.2; // 每幀移動速度

function animate() {
  posY += speed;
  bg.style.backgroundPositionY = `${-posY}px`;
  
  requestAnimationFrame(animate);
}

animate();

