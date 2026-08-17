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
        <button class="toggle-menu-button"></button>
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
    
    const toggleBtn = headerElement.querySelector(".toggle-menu-button");
    const siteMenu = headerElement.querySelector(".header-site-menu");

    if (toggleBtn && siteMenu) {
      toggleBtn.addEventListener("click", () => {
        siteMenu.classList.toggle("is-show");
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

  // HTML内に <footer class="footer"></footer> が存在する場合のみ実行
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