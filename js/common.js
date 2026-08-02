document.addEventListener("DOMContentLoaded", () => {

  const headerElement = document.querySelector("header.header");
  if (headerElement) {
    headerElement.innerHTML = `
      <div class="header-inner">
        <div class="moon-container" title="今日の月相">
          <div class="moon-shape" id="moon-shape"></div>
        </div>
        <a class="header-logo" href="./index.html">
          <img src="./images/common/logo-header.png" alt="KISSA">
        </a>
        <button class="toggle-menu-button"></button>
        <div class="header-site-menu">
          <nav class="site-menu">
            <ul>
              <li><a href="./concept.html">CONCEPT</a></li>
              <li><a href="./menu.html">MENU</a></li>
              <li><a href="./access.html">ACCESS</a></li>
            </ul>
          </nav>
        </div>
      </div>
    `;
    
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
          <li><a href="./menu.html">MENU</a></li>
          <li><a href="./access.html">BOARD</a></li>
        </ul>
      </nav>
      <a class="footer-logo" href="./index.html">
        <img src="./images/common/logo-footer.png" alt="KISSA">
      </a>
      <p class="footer-tel">TEL 01-2345-6789</p>
      <p class="footer-time">OPEN Fri-Sun 11:00-16:00</p>
      <p class="copyright"><small>&copy;Kissa</small></p>
    `;
  }
});