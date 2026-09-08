function initMoonPhase() {
    const moonElement = document.getElementById('moon-shape');
    if (!moonElement) return;

    const moonInfo = SunCalc.getMoonIllumination(new Date());
    const phase = moonInfo.phase;

    moonElement.className = 'moon-shape';

    if (phase < 0.06 || phase >= 0.94) {
        moonElement.classList.add('is-new');
    }

    else if (phase < 0.19) {
        moonElement.classList.add('is-crescent');
    }

    else if (phase < 0.31) {
        moonElement.classList.add('is-half');
    }

    else if (phase < 0.44) {
        moonElement.classList.add('is-gibbous');
    }

    else if (phase < 0.56) {
        moonElement.classList.add('is-full');
    }

    else if (phase < 0.69) {
        moonElement.classList.add('is-gibbous-reverse');
    }

    else if (phase < 0.81) {
        moonElement.classList.add('is-half-reverse');
    }

    else {
        moonElement.classList.add('is-crescent-reverse');
    }

const moonContainer = moonElement.closest('.moon-container') || moonElement.parentElement;
  
  if (moonContainer) {
    moonContainer.addEventListener('click', () => {
      // 既存のモーダルがあれば削除
      const oldModal = document.querySelector('.moon-detail-modal');
      if (oldModal) oldModal.remove();

      // 今日の日付を取得
      const today = new Date();
      const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

      // クラス名から名称と詳細解説を判定
      let moonName = "今日の月";
      let moonDesc = "夜空に浮かぶ月の相です。";

      if (moonElement.classList.contains('is-full')) {
        moonName = "満月（Full Moon）";
        moonDesc = "月と太陽が地球を挟んで反対側に位置し、月全体が明るく輝いて見える状態です。達成や実りを象徴するタイミングです。";
      } else if (moonElement.classList.contains('is-new')) {
        moonName = "新月（New Moon）";
        moonDesc = "月が太陽と同じ方向にあるため、地球からは光っている面が見えません。新しいスタートや願い事をするのに最適な日です。";
      } else if (moonElement.classList.contains('is-crescent')) {
        moonName = "三日月・新月を過ぎた月（Crescent Moon）";
        moonDesc = "新月から少しずつ満ちていく細い月です。物事の始まりや、これから育っていく希望を象徴しています。";
      } else if (moonElement.classList.contains('is-crescent-reverse')) {
        moonName = "有明の月・新月前の細い月（Waning Crescent）";
        moonDesc = "満月を過ぎ、次の新月に向けて細くなっていく月です。不要なものを手放し、休息をとる期間とされます。";
      } else if (moonElement.classList.contains('is-half')) {
        moonName = "上弦の月（First Quarter）";
        moonDesc = "右半分が輝く半月です。新月から満月に向かう途中で、行動を起こしたり決断を下すのに良い時期です。";
      } else if (moonElement.classList.contains('is-half-reverse')) {
        moonName = "下弦の月（Third Quarter）";
        moonDesc = "左半分が輝く半月です。満月から新月に向かう途中で、振り返りや整理整頓に向いているタイミングです。";
      } else if (moonElement.classList.contains('is-gibbous')) {
        moonName = "十三夜・満ちていく月（Waxing Gibbous）";
        moonDesc = "半月を過ぎ、満月に向かって大きく膨らんでいる状態です。目標に向けてエネルギーが高まっています。";
      } else if (moonElement.classList.contains('is-gibbous-reverse')) {
        moonName = "欠けていく月（Waning Gibbous）";
        moonDesc = "満月を過ぎて少しずつ欠け始めた月です。感謝の気持ちを持ち、成果を分け合うのに適した時期です。";
      }

      // モーダルの HTML 生成
      const modal = document.createElement('div');
      modal.className = 'moon-detail-modal';
      modal.innerHTML = `
        <div class="moon-detail-content">
          <div class="moon-detail-date">📅 ${dateStr}</div>
          <div class="moon-detail-title">${moonName}</div>
          <div class="moon-detail-large-icon">
            ${moonElement.outerHTML}
          </div>
          <div class="moon-detail-desc">${moonDesc}</div>
          <button class="moon-detail-close-btn">閉じる</button>
        </div>
      `;

      document.body.appendChild(modal);

      // 表示アニメーション
      requestAnimationFrame(() => {
        modal.classList.add('is-show');
      });

      // 閉じる処理
      const closeBtn = modal.querySelector('.moon-detail-close-btn');
      const closeModal = () => {
        modal.classList.remove('is-show');
        setTimeout(() => modal.remove(), 300);
      };

      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMoonPhase();
});