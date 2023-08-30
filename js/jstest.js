//dark mood
$(document).ready(function () {
  $("#goDark").click(function () {
    var element = document.body;
    element.classList.toggle("dark-mode");

    $(this).toggleClass("dark");
    if ($(this).hasClass("dark")) {
      $(this).children().removeClass("fa-moon").addClass("fa-sun");
    } else {
      $(this).children().removeClass("fa-sun").addClass("fa-moon");
    }
  });
});

// btn toggle
$(document).ready(function () {
  $("#toggleBtn").click(function () {
    $(this).addClass("close");
    $("#content").slideDown(500);
  });
});
// animation
let playerState = "walk";
const dropDown = document.getElementById("animations");
dropDown.addEventListener("change", function (e) {
  playerState = e.target.value;
});
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

var parent = canvas.parentElement;

// 設定畫布的大小與父容器相同

const CANVAS_WIDTH = (canvas.width = parent.offsetWidth);
const CANVAS_HEIGHT = (canvas.height = parent.offsetHeight);

const playerImage = new Image();
playerImage.src = "/img/character.png";
const spritWidth = 72;
const spritHeight = 48;

let gameFrame = 0;
const staggerFrame = 10;
const spriteAnimations = [];
const animationStates = [
  { name: "walk", frames: 6 },
  { name: "idle", frames: 4 },
  { name: "jump", frames: 3 },
  { name: "attack", frames: 4 },
  { name: "defense", frames: 4 },
  { name: "injuried", frames: 3 },
  { name: "die", frames: 5 },
  { name: "trick", frames: 6 },
];

animationStates.forEach((state, index) => {
  let frames = { loc: [] };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spritWidth;
    let positionY = index * spritHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / staggerFrame) %
    spriteAnimations[playerState].loc.length;

  let frameX = spritWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  ctx.save();
  ctx.scale(1.5, 1.5);

  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spritWidth,
    spritHeight,
    0,
    0,
    spritWidth,
    spritHeight
  );

  ctx.restore();

  gameFrame++;
  requestAnimationFrame(animate);
}
animate();

// second canvas
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
const CANVAS_WIDTH2 = (canvas2.width = parent.offsetWidth);
const CANVAS_HEIGHT2 = (canvas2.height = parent.offsetHeight);
let gameSpeed = 10;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "img/bg_1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "img/bg_2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "img/bg_3.png";

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2100;
    this.height = 400;
    this.x2 = -this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  updated() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x >= this.width) {
      this.x = -this.width + this.x2 + this.speed;
    }
    if (this.x2 >= this.width) {
      this.x2 = -this.width + this.x + this.speed;
    }
    this.x = Math.floor(this.x + this.speed);
    this.x2 = Math.floor(this.x2 + this.speed);
  }
  draw() {
    ctx2.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx2.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}
const layer1 = new Layer(backgroundLayer1, 0.4);
const layer2 = new Layer(backgroundLayer2, 0.3);
const layer3 = new Layer(backgroundLayer3, 0.2);

const gameObjects = [layer3, layer2, layer1];

function animate1() {
  ctx2.clearRect(0, 0, CANVAS_WIDTH2, CANVAS_HEIGHT2);
  gameObjects.forEach((object) => {
    object.updated();
    object.draw();
  });
  requestAnimationFrame(animate1);
}
animate1();

// slider
var scene = document.getElementById("scene");
var parallaxInstance = new Parallax(scene, {
  relativeInput: true,
});

parallaxInstance.friction(0.2, 0.2);

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dotGroup__dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
