document.addEventListener("DOMContentLoaded", () => {

  const headerElement = document.querySelector("header.header");
  if (headerElement) {
    headerElement.innerHTML = `
      <div class="header-inner">
        <div class="moon-container" title="今日の月相">
          <div class="moon-shape" id="moon-shape"></div>
        </div>
        <a class="header-logo" href="./index.html">
          <img src="./images/common/logo-header.png" alt="星と月の雑学図鑑">
        </a>
        <button class="toggle-menu-button" aria-label="メニューを開閉"></button>
        <div class="header-site-menu">
          <nav class="site-menu">
            <ul>
              <li><a href="./concept.html">CONCEPT</a></li>
              <li><a href="./menu.html">STARS</a></li>
              <li><a href="./access.html">BOARD</a></li>
            </ul>
          </nav>
        </div>
      </div>
    `;
    
    // 生成された直後のボタンとメニューに対して確実にイベントを設定
    const toggleBtn = headerElement.querySelector(".toggle-menu-button");
    const siteMenu = headerElement.querySelector(".header-site-menu");

    // if (toggleBtn && siteMenu) {
    //   toggleBtn.addEventListener("click", (e) => {
    //     e.stopPropagation();
    //     siteMenu.classList.toggle("is-show");
    //   });

    //   // メニューが開いている時にメニュー内のリンクをクリックしたら閉じるようにする
    //   const menuLinks = siteMenu.querySelectorAll("a");
    //   menuLinks.forEach(link => {
    //     link.addEventListener("click", () => {
    //       siteMenu.classList.remove("is-show");
    //     });
    //   });
    // }
    if (toggleBtn && siteMenu) {
      toggleBtn.addEventListener("click", () => {
        const isOpen = siteMenu.classList.toggle("is-show");
        toggleBtn.setAttribute("aria-expanded", String(isOpen));
      });

      siteMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          siteMenu.classList.remove("is-show");
          toggleBtn.setAttribute("aria-expanded", "false");
        });
      });
    }
    
    
    if (typeof initMoonPhase === 'function') {
      initMoonPhase();
    } 
    else {
      console.error("initMoonPhase が見つかりません。moon.jsの読み込み順を確認してください。");
    }
  }

  const footerElement = document.querySelector("footer.footer");

  if (footerElement) {
    footerElement.innerHTML = `
      <nav class="site-menu">
        <ul>
          <li><a href="./concept.html">CONCEPT</a></li>
          <li><a href="./menu.html">STARS</a></li>
          <li><a href="./access.html">BOARD</a></li>
        </ul>
      </nav>
      <a class="footer-logo" href="./index.html">
        <img src="./images/common/logo-footer.png" alt="KISSA">
      </a>
      <p class="footer-tel"></p>
      <p class="footer-time"></p>
      <p class="copyright"><small>&copy;STARSandMOON</small></p>
    `;
  }
});

// common.js の末尾を以下のように整理

// document.addEventListener("DOMContentLoaded", () => {
//   const headerElement = document.querySelector("header.header");
//   if (headerElement) {
//     headerElement.innerHTML = `
//       <div class="header-inner">
//         <div class="moon-container" title="今日の月相">
//           <div class="moon-shape" id="moon-shape"></div>
//         </div>
//         <a class="header-logo" href="./index.html">
//           <img src="./images/common/logo-header.png" alt="星と月の雑学図鑑">
//         </a>
//         <button class="toggle-menu-button" aria-label="メニューを開閉"></button>
//         <div class="header-site-menu">
//           <nav class="site-menu">
//             <ul>
//               <li><a href="./concept.html">CONCEPT</a></li>
//               <li><a href="./menu.html">STARS</a></li>
//               <li><a href="./access.html">BOARD</a></li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     `;
    
//     // ボタンとメニューを取得してクリックイベントを登録
//     const toggleBtn = headerElement.querySelector(".toggle-menu-button");
//     const siteMenu = headerElement.querySelector(".header-site-menu");

//     if (toggleBtn && siteMenu) {
//       toggleBtn.addEventListener("click", (e) => {
//         e.stopPropagation();
//         siteMenu.classList.toggle("is-show");
//       });

//       // メニュー内のリンクをクリックしたら閉じる
//       const menuLinks = siteMenu.querySelectorAll("a");
//       menuLinks.forEach(link => {
//         link.addEventListener("click", () => {
//           siteMenu.classList.remove("is-show");
//         });
//       });
//     }

//     if (typeof initMoonPhase === 'function') {
//       initMoonPhase();
//     }
//   }
// });