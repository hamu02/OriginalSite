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
}

document.addEventListener("DOMContentLoaded", () => {
  initMoonPhase();
});