const gameFrame = document.getElementById("game-frame");
const gameList = document.getElementById("game-list");
const gameContainer = document.getElementById("game-container");
const backBtn = document.getElementById("backBtn");
const fullBtn = document.getElementById("fullBtn");
const searchBar = document.getElementById("search-bar");

// GAME SELECTION
gameList.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const gameUrl = btn.dataset.game;
    gameFrame.src = gameUrl;
    gameContainer.style.display = "flex";
    gameList.style.display = "none";
  });

  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty("--x", ((e.clientX - rect.left) / rect.width) * 100 + "%");
    btn.style.setProperty("--y", ((e.clientY - rect.top) / rect.height) * 100 + "%");
    btn.style.setProperty("--opacity", 0.25);
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.setProperty("--opacity", 0);
  });
});

// BACK BUTTON
backBtn.addEventListener("click", () => {
  gameFrame.src = "";
  gameContainer.style.display = "none";
  gameList.style.display = "grid";
});

// FULLSCREEN
fullBtn.addEventListener("click", () => {
  if (gameFrame.requestFullscreen) gameFrame.requestFullscreen();
  else if (gameFrame.webkitRequestFullscreen) gameFrame.webkitRequestFullscreen();
  else if (gameFrame.msRequestFullscreen) gameFrame.msRequestFullscreen();
});

// SEARCH BAR
searchBar.addEventListener("input", () => {
  const filter = searchBar.value.toLowerCase().replace(/\s+/g, '');
  gameList.querySelectorAll("button").forEach(btn => {
    const text = btn.textContent.toLowerCase().replace(/\s+/g, '');
    btn.style.display = text.includes(filter) ? "block" : "none";
  });
});

// LIGHT MOTION BLUR
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const delta = Math.abs(window.scrollY - lastScroll);
  lastScroll = window.scrollY;
  const blur = Math.min(delta / 50, 2);
  document.body.style.backdropFilter = `blur(${blur}px)`;
});

// STARS
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 100; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top = Math.random() * 100 + '%';
  star.style.left = Math.random() * 100 + '%';
  const size = Math.random() * 2 + 1;
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  starsContainer.appendChild(star);
  setInterval(() => {
    star.style.opacity = 0.2 + Math.random() * 0.8;
    star.style.transform = `translate(${Math.random()*2-1}px, ${Math.random()*2-1}px)`;
  }, 200 + Math.random()*800);
}

// PROXY
const proxyContainer = document.getElementById("luminis-proxy");
const browserFrame = document.getElementById("browser-frame");
const proxyInput = document.getElementById("proxyInput");
const proxyGo = document.getElementById("proxyGo");

browserFrame.style.display = "none"; 
proxyContainer.style.height = "auto";

proxyGo.addEventListener("click", () => {
  const url = proxyInput.value.trim();
  if (!url) return;
  const formattedUrl = url.startsWith("http") ? url : `https://${url}`;
  browserFrame.src = `/scram/fetch/${btoa(formattedUrl)}`;
  browserFrame.style.display = "block";
  proxyContainer.style.height = "75vh";
});


document.addEventListener("DOMContentLoaded", () => {
  const proxyFullBtn = document.getElementById("proxyFullBtn");
  const browserFrame = document.getElementById("browser-frame");

  if(proxyFullBtn && browserFrame) { // make sure they exist
    proxyFullBtn.addEventListener("click", () => {
      if (browserFrame.requestFullscreen) browserFrame.requestFullscreen();
      else if (browserFrame.webkitRequestFullscreen) browserFrame.webkitRequestFullscreen(); // safari
      else if (browserFrame.msRequestFullscreen) browserFrame.msRequestFullscreen(); // IE
    });
  }
});


