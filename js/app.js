
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = 'img/bird.png';
bg.src = 'img/bg.png';
fg.src = 'img/fg.png';
pipeNorth.src = 'img/pipeNorth.png';
pipeSouth.src = 'img/pipeSouth.png';

let gap = 75;
let score = 0;

const fly = new Audio();
const scoreAudio = new Audio();
fly.src = 'sounds/fly.mp3';
scoreAudio.src = 'sounds/score.mp3';

pipeNorth.onload = function() {
    gap += pipeNorth.height;
}

let bX = 10;
let bY = 150;
let gravity = 1;

document.addEventListener('keyup', moveUp);

function moveUp() {
    bY -= 30;
    fly.play();
}

const pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

function draw() {
    
    ctx.drawImage(bg, 0, 0);
    for(let i = 0; i < pipe.length; i++) {

        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + gap);

        pipe[i].x--;

        if(pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height 
        || bY + bird.height >= pipe[i].y + gap) || bY + bird.height >= cvs.height - fg.height) {
            location.reload();
        }

        if(pipe[i].x == 5) {
            score++
            scoreAudio.play();
        }
    }
    
    ctx.drawImage(fg, 0, cvs.height - fg.height)
    ctx.drawImage(bird, bX, bY)
    bY += gravity;

    ctx.fillStyle = '#000';
    ctx.font = '20px vardana';
    ctx.fillText('Score : '+ score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

draw();