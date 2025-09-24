gameFrame = document.getElementById("game-frame");
const gameList = document.getElementById("game-list");
const gameContainer = document.getElementById("game-container");
const backBtn = document.getElementById("backBtn");
const fullBtn = document.getElementById("fullBtn");
const searchBar = document.getElementById("search-bar");

// game selection
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

// back button
backBtn.addEventListener("click", () => {
  gameFrame.src = "";
  gameContainer.style.display = "none";
  gameList.style.display = "grid";
});

// fullscreen button
fullBtn.addEventListener("click", () => {
  if (gameFrame.requestFullscreen) {
    gameFrame.requestFullscreen();
  } else if (gameFrame.webkitRequestFullscreen) {
    gameFrame.webkitRequestFullscreen();
  } else if (gameFrame.msRequestFullscreen) {
    gameFrame.msRequestFullscreen();
  }
});

// fix black screen after fullscreen exit
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    // exited fullscreen
    const newFrame = gameFrame.cloneNode(true);
    gameFrame.parentNode.replaceChild(newFrame, gameFrame);

    // reassign the global var to the new iframe
   let gameFrame = document.getElementById("game-frame");
  }
});


// search bar
searchBar.addEventListener("input", () => {
  const filter = searchBar.value.toLowerCase().replace(/\s+/g, '');
  gameList.querySelectorAll("button").forEach(btn => {
    const text = btn.firstChild.textContent.toLowerCase().replace(/\s+/g, '');
    btn.style.display = text.includes(filter) ? "block" : "none";
  });
});

// light motion blur on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const delta = Math.abs(window.scrollY - lastScroll);
  lastScroll = window.scrollY;
  const blur = Math.min(delta / 50, 2); // max 2px
  document.body.style.backdropFilter = `blur(${blur}px)`;
});

// create flickering stars
const starsContainer = document.getElementById('stars');
const numStars = 100; // how many stars

for(let i=0;i<numStars;i++){
  const star = document.createElement('div');
  star.classList.add('star');

  // random start position
  star.style.top = Math.random() * 100 + '%';
  star.style.left = Math.random() * 100 + '%';

  // random size a bit
  const size = Math.random() * 2 + 1;
  star.style.width = size + 'px';
  star.style.height = size + 'px';

  starsContainer.appendChild(star);

  // animate flicker
  const flicker = () => {
    star.style.opacity = 0.2 + Math.random() * 0.8;
    star.style.transform = `translate(${Math.random()*2-1}px, ${Math.random()*2-1}px)`;
  }

  setInterval(flicker, 200 + Math.random()*800);
}

