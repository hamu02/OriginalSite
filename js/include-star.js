document.addEventListener('DOMContentLoaded', () => {
    fetch('star_bg.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);
            initStarAnimation();
        })
        .catch(error => console.error('star-bg.htmlの読み込みエラー:', error));
});