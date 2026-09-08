document.addEventListener("DOMContentLoaded", () => {
  //   window.addEventListener("scroll", () => {
  //   const scrolled = window.scrollY;
  //   document.body.style.backgroundPositionY = `${scrolled * 0.4}px`;
  // });
  if (!document.querySelector(".animated-space-bg")) {
    const spaceBg = document.createElement("div");
    spaceBg.className = "animated-space-bg";
    document.body.appendChild(spaceBg);
  }

  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  function forceStopEasterEffects() {
    const targets = [
      ".easter-moon-overlay",
      ".easter-shooting-star",
      ".flash-overlay",
      ".easter-ufo",
      ".easter-message-box",
      ".black-hole"
    ];
    targets.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });
  }

  // 画面全体のダブルクリックで即終了を発火
  window.addEventListener("dblclick", forceStopEasterEffects);

  function handleSearchEasterEgg() {
    if (!searchInput) return;
    const value = searchInput.value.trim().toLowerCase();

    function showMessage(text, customClass = "") {
      const oldBox = document.querySelector(".easter-message-box");
      if (oldBox) oldBox.remove();

      const msgBox = document.createElement("div");
      msgBox.className = `easter-message-box ${customClass}`.trim();
      msgBox.textContent = text;
      document.body.appendChild(msgBox);

      // カスタムクラスがある場合はアニメーションに任せ、ない場合は8秒で消去
      if (!customClass) {
        setTimeout(() => { if (msgBox) msgBox.remove(); }, 8000);
      }
    }

    // 1. 「月」または「moon」
    if (value.includes("月") || value.includes("moon")) {
      if (document.querySelector(".easter-moon-overlay")) return;

      const overlay = document.createElement("div");
      overlay.className = "easter-moon-overlay";
      const moon = document.createElement("div");
      moon.className = "easter-moon";
      overlay.appendChild(moon);
      document.body.appendChild(overlay);

      showMessage("「月面へようこそ。地球から月までの距離は約380,000km。光の速さでも約1.3秒かかります。」");

      setTimeout(() => overlay.remove(), 20000);
    }

    // 2. 「シューティングスター」または「流星」
    // 2. 「シューティングスター」または「流星」（巨大＆ゆっくり＆ランダム複数本）
    else if (value.includes("シューティングスター") || value.includes("流星")) {
      forceStopEasterEffects();

      // フラッシュ背景
      const flash = document.createElement("div");
      flash.className = "flash-overlay";
      document.body.appendChild(flash);

      // 1〜4本をランダムな数だけ生成
      const count = Math.floor(Math.random() * 4) + 1;

      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const star = document.createElement("div");
          star.className = "easter-shooting-star";

          // 出現位置とアニメーション速度（ゆっくり4〜5.5秒）を少しずつバラつかせる
          const randomOffsetY = (Math.random() - 0.5) * 300;
          star.style.top = `${-100 + randomOffsetY}px`;
          
          const duration = Math.random() * 1.5 + 4; // 4.0秒 〜 5.5秒のゆったりスピード
          star.style.animation = `giantStarAnim ${duration}s ease-out forwards`;

          document.body.appendChild(star);

          setTimeout(() => star.remove(), duration * 1000);
        }, i * 600); // 0.6秒間隔でバラけて出現
      }

      showMessage("「願い事は唱えられましたか？本物の流れ星の寿命は、わずか約0.2〜0.7秒と言われています。」");

      setTimeout(() => { if (flash) flash.remove(); }, 3000);
    }

    else if (value.includes("エイリアン") || value.includes("ufo")) {
      forceStopEasterEffects();

      const ufo = document.createElement("div");
      ufo.className = "easter-ufo";
      ufo.innerHTML = `🛸<div class="ufo-beam"></div>`;
      document.body.appendChild(ufo);

      // 'abducted' クラスを渡して吸い上げアニメーションを発動
      showMessage(
        "「未確認飛行物体（UFO）を検知しました。広大な宇宙のどこかには、未知の生命体が潜んでいるかもしれません。」",
        "abducted"
      );

      setTimeout(() => { if (ufo) ufo.remove(); }, 9000);
    }

    // 4. 「ブラックホール」（解説文章追加＆中心へ飲み込まれる）
    else if (value.includes("ブラックホール")) {
      forceStopEasterEffects();

      const blackHole = document.createElement("div");
      blackHole.className = "black-hole";
      document.body.appendChild(blackHole);

      // 'swallowed' クラスを渡して飲み込まれアニメーションを発動
      showMessage(
        "「強力な重力場を検知。光さえも逃げ出せない時空の領域、ブラックホールへと引きずり込まれます…」",
        "swallowed"
      );

  setTimeout(() => { if (blackHole) blackHole.remove(); }, 4500);
    }
  }

  if (searchBtn) searchBtn.addEventListener("click", handleSearchEasterEgg);
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSearchEasterEgg();
    });
  }
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

let isShowerActive = false;
  function triggerStarShower(duration = 10000) {
    if (isShowerActive) return;
    isShowerActive = true;

    const interval = setInterval(() => {
      const randomX = Math.random() * window.innerWidth;
      spawnStarsAt(randomX, 0, 2);
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      isShowerActive = false;
    }, duration);
  }

 // 🎈 1. 無重力発火処理（画面全体を対象に設定）
  function triggerZeroG() {
    // 掲示板全体・フォーム・カード・ヘッダー・フッターなど全要素を取得
    const allElements = document.querySelectorAll(
      ".main, .title, .post-form-area, .post-list-area, .post-item, .header, .footer, button, input, textarea"
    );

    allElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("zero-g-active");
      }, (index % 7) * 120); // 1要素ごとに少しずらしてリアルな無重力感を演出
    });

    // 12秒後に無重力解除
    setTimeout(() => {
      allElements.forEach(el => el.classList.remove("zero-g-active"));
    }, 12000);
  }

  // 💥 2. ビッグバン発火処理（宇宙・星雲カラーに改修）
  function triggerBigBang(originX = window.innerWidth / 2, originY = window.innerHeight / 2) {
    const particleCount = 120; // 粒子数を増やして高密度化
    // クラッカー色を完全廃止し、深宇宙・星雲をイメージした配色（青・紫・白・金・シアン）
    const cosmicColors = [
      "rgba(255, 255, 255, 0.95)", // 眩しい白色光
      "rgba(0, 229, 255, 0.9)",   // シアン（宇宙線）
      "rgba(124, 77, 255, 0.85)",  // ネブラパープル（星雲）
      "rgba(255, 224, 102, 0.9)",  // ゴールド（恒星）
      "rgba(179, 136, 255, 0.8)"   // ディープバイオレット
    ];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "bigbang-particle";

      // 大きさにメリハリをつける
      const size = Math.random() * 14 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      const color = cosmicColors[Math.floor(Math.random() * cosmicColors.length)];
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

      particle.style.left = `${originX}px`;
      particle.style.top = `${originY}px`;

      // 全方位（360度）への高速飛散
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 650 + 150; // 飛散距離を延長
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      particle.style.setProperty("--tx", `${tx}px`);
      particle.style.setProperty("--ty", `${ty}px`);

      const duration = Math.random() * 1.5 + 1.0;
      particle.style.animationDuration = `${duration}s`;

      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), duration * 1000);
    }
  }

  function checkAndTriggerBoardEffects(text, x, y) {
    const lower = text.toLowerCase();

    if (lower.includes("星") || lower.includes("star")) {
      triggerStarShower(10000);
    }
    if (lower.includes("無重力") || lower.includes("zero g")) {
      triggerZeroG();
    }
    if (lower.includes("ビッグバン") || lower.includes("big bang")) {
      triggerBigBang(x, y);
    }
  }

  // A. 📝 入力時の判定
  const boardInput = document.getElementById("input-content") || document.getElementById("boardInput") || document.querySelector("textarea");
  if (boardInput) {
    boardInput.addEventListener("input", (e) => {
      checkAndTriggerBoardEffects(e.target.value);
    });
  }

  // B. 🚀 投稿ボタン押下時の判定
  const postBtn = document.getElementById("submitBtn") || document.getElementById("postBtn") || document.querySelector("form button");
  if (postBtn) {
    postBtn.addEventListener("click", () => {
      if (boardInput) {
        checkAndTriggerBoardEffects(boardInput.value);
      }
    });
  }

  window.makeBoardWordsClickable = function() {
    const posts = document.querySelectorAll(".board-card, .post-card, .post-content, .board-post");
    posts.forEach(post => {
      if (post.dataset.easterProcessed) return;

      let html = post.innerHTML;
      const keywords = ["星", "STAR", "star", "無重力", "ZERO G", "zero g", "ビッグバン", "BIG BANG", "big bang"];

      keywords.forEach(word => {
        const regex = new RegExp(`(${word})`, "gi");
        html = html.replace(regex, `<span class="clickable-easter-word">$1</span>`);
      });

      post.innerHTML = html;
      post.dataset.easterProcessed = "true";
    });
  };

  // 投稿カード内の判定単語クリック時
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("clickable-easter-word")) {
      const word = e.target.textContent;
      checkAndTriggerBoardEffects(word, e.clientX, e.clientY);
    }
  });

  // 初期化時に文字リンク化を実行
  setTimeout(window.makeBoardWordsClickable, 500);

// 🌟 ヘッダーにランダムな間隔で流れ星を流す処理
  function startHeaderShootingStars() {
    const header = document.querySelector('.header');
    if (!header) return;

    // 1本だけ流す内部関数
    function createSingleStar() {
      const star = document.createElement('div');
      star.className = 'header-shooting-star';

      // 左寄り（0%〜60%）から出現させて右下に落とす
      const randomLeft = Math.random() * 60;
      const randomTop = Math.random() * 20 - 5; 
      star.style.left = `${randomLeft}%`;
      star.style.top = `${randomTop}px`;

      header.appendChild(star);

      requestAnimationFrame(() => {
        star.classList.add('animate');
      });

      setTimeout(() => star.remove(), 1400);
    }

    // 流れ星グループを発生させる処理
    function spawnHeaderStarGroup() {
      // 1回のタイミングで 1〜3 本をランダム生成
      const count = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < count; i++) {
        // 少し時間差をつけて順番に落とす
        setTimeout(() => {
          createSingleStar();
        }, i * 250);
      }

      // 次の流星群までの間隔をランダム（2.5秒 〜 6秒）
      const nextInterval = Math.random() * 3500 + 2500;
      setTimeout(spawnHeaderStarGroup, nextInterval);
    }

    // 最初の発生（1秒後）
    setTimeout(spawnHeaderStarGroup, 1000);
  }

  // 実行
  startHeaderShootingStars();

});