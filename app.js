window.addEventListener('DOMContentLoaded', () => {

    // ===== Banner Dots =====
    const banner = document.querySelector('.banner');
    const dotsCanvas = document.getElementById('dotsCanvas');
    const dotsCtx = dotsCanvas.getContext('2d');

    function resizeDotsCanvas() {
        dotsCanvas.width = banner.offsetWidth;
        dotsCanvas.height = banner.offsetHeight;
    }

    resizeDotsCanvas();
    window.addEventListener('resize', () => {
        resizeDotsCanvas();
        createDots();
        drawDots();
    });

    let dots = [];
    const colors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];

    function createDots() {
        dots = [];
        for(let i = 0; i < 50; i++) {
            dots.push({
                x: Math.random() * dotsCanvas.width,
                y: Math.random() * dotsCanvas.height,
                size: Math.random() * 3 + 5,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    }

    function drawDots() {
        dotsCtx.clearRect(0, 0, dotsCanvas.width, dotsCanvas.height);
        dots.forEach(dot => {
            dotsCtx.fillStyle = dot.color;
            dotsCtx.beginPath();
            dotsCtx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
            dotsCtx.fill();
        });
    }

    createDots();
    drawDots();

    banner.addEventListener('mousemove', (e) => {
        drawDots();
        const mouse = {
            x: e.pageX - banner.getBoundingClientRect().left,
            y: e.pageY - banner.getBoundingClientRect().top
        };
        dots.forEach(dot => {
            let dist = Math.hypot(mouse.x - dot.x, mouse.y - dot.y);
            if(dist < 300){
                dotsCtx.strokeStyle = dot.color;
                dotsCtx.lineWidth = 1;
                dotsCtx.beginPath();
                dotsCtx.moveTo(dot.x, dot.y);
                dotsCtx.lineTo(mouse.x, mouse.y);
                dotsCtx.stroke();
            }
        });
    });

    // ===== Confetti =====
    const marvelBtn = document.getElementById('marvelBtn');
    const bdayMessage = document.getElementById('bdayMessage');

    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.id = 'confettiCanvas';
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = '0';
    confettiCanvas.style.left = '0';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    document.body.appendChild(confettiCanvas);
    const confettiCtx = confettiCanvas.getContext('2d');

    let confetti = [];
    let confettiAnimation;

    function createConfetti(){
        confetti = [];
        for(let i = 0; i < 150; i++){
            confetti.push({
                x: Math.random()*confettiCanvas.width,
                y: Math.random()*confettiCanvas.height - confettiCanvas.height,
                r: Math.random()*6 + 4,
                d: Math.random()*50,
                color: ['#ff0000','#0000ff','#ffcc00','#ffffff'][Math.floor(Math.random()*4)],
                tilt: Math.floor(Math.random()*10)-10,
                tiltAngleIncrement: Math.random()*0.07+0.05,
                tiltAngle: 0
            });
        }
    }

    function drawConfettiLoop(){
        confettiCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
        confetti.forEach((c,i)=>{
            confettiCtx.beginPath();
            confettiCtx.lineWidth = c.r;
            confettiCtx.strokeStyle = c.color;
            confettiCtx.moveTo(c.x+c.tilt+c.r/2, c.y);
            confettiCtx.lineTo(c.x+c.tilt, c.y+c.tilt+c.r/2);
            confettiCtx.stroke();

            c.tiltAngle += c.tiltAngleIncrement;
            c.y += (Math.cos(c.d)+3+c.r/2)/2;
            c.tilt = Math.sin(c.tiltAngle)*15;

            if(c.y>confettiCanvas.height){
                confetti[i].y = -10;
                confetti[i].x = Math.random()*confettiCanvas.width;
            }
        });
        confettiAnimation = requestAnimationFrame(drawConfettiLoop);
    }

    marvelBtn.addEventListener('click', () => {
        bdayMessage.textContent = "🎉 Happy Birthday, Ansh! 🕷️";
        bdayMessage.style.opacity = 1;
        createConfetti();
        drawConfettiLoop();

        setTimeout(() => {
            cancelAnimationFrame(confettiAnimation);
            confettiCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
            bdayMessage.style.opacity = 0;
            bdayMessage.textContent = "";
        }, 5000);
    });

    // ===== CUTIE BUTTON =====
    const cutieBtn = document.getElementById('cutieBtn');
    cutieBtn.addEventListener('click', () => {
        window.location.href = 'movies.html';
    });
});
