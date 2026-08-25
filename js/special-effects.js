document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    document.body.style.backgroundPositionY = `${scrolled * 0.4}px`;
  });

  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  function triggerBlackHole() {
    if (searchInput && searchInput.value.includes("ブラックホール")) {
      if (document.querySelector(".black-hole")) return; // 重複生成防止

      const blackHole = document.createElement("div");
      blackHole.className = "black-hole";
      document.body.appendChild(blackHole);

      setTimeout(() => blackHole.remove(), 4000);
    }
  }
  if (searchBtn) searchBtn.addEventListener("click", triggerBlackHole);

  document.addEventListener("click", (e) => {
    // ボタンや入力欄をクリックした時は星を出さないように除外
    if (["INPUT", "BUTTON", "A", "TEXTAREA"].includes(e.target.tagName)) return;

    spawnStarsAt(e.clientX, e.clientY, 5); // 5個生成
  });

  function spawnStarsAt(x, y, count) {
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "falling-star";
      star.textContent = ["★", "✦", "✧", "☆"][Math.floor(Math.random() * 4)];

      const offsetX = (Math.random() - 0.5) * 60;
      const offsetY = (Math.random() - 0.5) * 20;

      star.style.left = `${x + offsetX}px`;
      star.style.top = `${y + offsetY}px`;
      star.style.fontSize = `${Math.random() * 10 + 12}px`;

      document.body.appendChild(star);
      setTimeout(() => star.remove(), 1200);
    }
  }
  const boardInput = document.getElementById("input-content") || document.getElementById("boardInput") || document.querySelector("textarea");

  if (boardInput) {
    boardInput.addEventListener("input", (e) => {
      const text = e.target.value.toLowerCase();
      if (text.includes("星") || text.includes("star")) {
        startStarShower(10000); // 10秒間（10000ミリ秒）
      }
    });
  }

  let isShowerActive = false;
  function startStarShower(duration) {
    if (isShowerActive) return; // 連打防止
    isShowerActive = true;

    // 0.15秒ごとに上空から星を落とす
    const interval = setInterval(() => {
      const randomX = Math.random() * window.innerWidth;
      spawnStarsAt(randomX, 0, 2);
    }, 150);

    // 10秒後に停止
    setTimeout(() => {
      clearInterval(interval);
      isShowerActive = false;
    }, duration);
  }
});