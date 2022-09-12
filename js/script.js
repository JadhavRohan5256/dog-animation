let canvas = document.querySelector('#canvas');
let canvasWidth = 600;
let canvasHeight = 600;
let timer = 1;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let ctx = canvas.getContext("2d");
var image = new Image();
image.src="../img/shadow_dog.png";

// dog width 
let dogWidth = (image.naturalWidth / 12) + 2;
let dogHeight = image.naturalHeight / 10;
let speed = 5;

// animation mode 
let animationType = "run";
let selected = document.querySelector('#select');
selected.value = animationType;
selected.addEventListener('change', () => {
    animationType = selected.value;
});
let animationState = [
    {
        name : 'idle',
        totalFrame: 7
    },
    {
        name : 'jumpUp',
        totalFrame: 7
    },
    {
        name : 'jumpDown',
        totalFrame: 7
    },
    {
        name : 'run',
        totalFrame: 9
    },
    {
        name : 'dizzy',
        totalFrame: 11
    },
    {
        name : 'sit',
        totalFrame: 5
    },
    {
        name : 'roll',
        totalFrame: 7
    },
    {
        name : 'bite',
        totalFrame: 7
    },
    {
        name : 'sleep',
        totalFrame: 12
    },
    {
        name : 'hit',
        totalFrame: 4
    }
];

let allFrameLoc = [
];

//calculating dog position x and y axis
animationState.forEach((item, idx) => {
    let frameLoc = {
        location : []
    };
    for(let i = 0; i < item.totalFrame; ++i) {
        let positionX = i * dogWidth;
        let positionY = idx * dogHeight;
        frameLoc.location.push({x : positionX, y : positionY});
    }
    allFrameLoc[item.name] = frameLoc;
});

let gameLoop = () => {
    let position = Math.floor((timer / speed) % allFrameLoc[animationType].location.length);
    let frameX = position * dogWidth;
    let frameY = allFrameLoc[animationType].location[position].y;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(image,frameX,frameY,dogWidth, dogHeight,0,0,dogWidth,dogHeight);
    timer = requestAnimationFrame(gameLoop);
}


gameLoop();
