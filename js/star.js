function initStarAnimation() {
    const canvas = document.getElementById("star-canvas");

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

// 2. マウス移動時の処理例
    window.addEventListener('mousemove', (e) => {
    createStar(e.clientX, e.clientY);
    });
    class Star {
        constructor(x ,y){
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1;

            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;

            this.alpha = 1.0
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= 0.015;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.alpha)
            ctx.strokeStyle = '#ffffff'
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.x - this.size * 2, this.y);
            ctx.lineTo(this.x + this.size * 2, this.y);
            ctx.moveTo(this.x, this.y - this.size * 2);
            ctx.lineTo(this.x, this.y + this.size * 2);
            ctx.stroke();
            ctx.restore();
        }
    }

    const stars = [];

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = stars.length - 1; i >= 0; i--){
            stars[i].update();
            stars[i].draw();

            if (stars[i].alpha <= 0){
                stars.splice(i, 1);
            }
        }
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('mousemove', (e) => {
        stars.push(new Star(e.clientX, e.clientY));
    });

    window.addEventListener('click', (e) => {
        for (let i = 0; i < 20; i++) {
            stars.push(new Star(e.clientX, e.clientY));
        }
    });
    }