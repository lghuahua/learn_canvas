window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

var canvases = document.querySelectorAll(".side");
var sides = canvases.length;
var size = 300;
var particles = [];
var particleIndex = 0;
var maxParticles = 100;
var hue = 0;
var mouseX, mouseY;
var styles = ["rgba(0,80,0,.1)",
        "rgba(255,1,1,.4)",
        "rgba(0,0,255,.4)",
        "rgba(255,255,255,.1)",
        "rgba(255,255,0,.1)",
        "rgba(255,0,255,.1)"
      ]
var globalID;


function point(x, y){
  this.x = x;
  this.y = y;
}

function Particle(ctx){
	this.ctx = ctx;
	this.size = this.random(10);
	this.x = mouseX || size / 2 - this.size / 2;
	this.y = mouseY || size / 2 - this.size / 2;
	this.color = "hsla(" + hue + ", 100%, 50%, .8)";
	this.maxLife = this.random(40);
	this.life = 0;
	this.vx = this.random(-3, 3);
	this.vy = this.random(-3, 3);
	this.index = particleIndex;
	particles[particleIndex] = this;
	particleIndex++;
}

Particle.prototype = {

	constructor: Particle,

	draw: function(){
		var ctx = this.ctx;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);
		this.update();
	},

	update: function(){
		if (this.life >= this.maxLife) {
			particles[this.index].reset();
		}
		this.x += this.vx;
		this.y += this.vy;
		this.life++;
	},

	reset: function(){
		this.size = this.random(10);
		this.x = mouseX || size / 2 - this.size / 2;
		this.y = mouseY || size / 2 - this.size / 2;
		this.color = "hsla(" + hue + ", 100%, 50%, .8)";
		this.life = 0;
		this.vx = this.random(-3, 3);
		this.vy = this.random(-3, 3);
	},

	random: function(){
		var min = arguments.length == 1 ? 0 : arguments[0];
		var max = arguments.length == 1 ? arguments[0] : arguments[1];
		return Math.random() * (max - min) + min;
	}

};


function setup(){
  for(var i = 0; i < sides; i++) {
    var canvas = canvases[i];
    canvas.width = size;
    canvas.height = size;
    var ctx = canvas.getContext("2d");
    for(var x = 0; x < maxParticles; x++) {
      particles.push(new Particle(ctx));
    }

    canvas.addEventListener("mousemove", function(e) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
    });

    canvas.addEventListener("mouseleave", function(e) {
      mouseX = null;
      mouseY = null;
    });
  }
}

function drwline(ctx, str, end){
  ctx.beginPath();
  ctx.moveTo(str.x, str.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

function animate(){
  point1 = new point(0, 100)
  point2 = new point(300, 100)
  point3 = new point(0, 200)
  point4 = new point(300, 200)
  point5 = new point(100, 0)
  point6 = new point(100, 300)
  point7 = new point(200, 0)
  point8 = new point(200, 300)
	for(var i = 0; i < sides; i++) {
		var canvas = canvases[i]
		var ctx = canvas.getContext("2d");
    ctx.fillStyle = styles[i];
		// ctx.fillStyle = "rgba(0,0,0,.1)";
		ctx.fillRect(0, 0, size, size);

    drwline(ctx, point1, point2);
    drwline(ctx, point3, point4);
    drwline(ctx, point5, point6);
    drwline(ctx, point7, point8);

    // canvas.addEventListener("mousemove", function(e) {
    //   globalID = window.requestAnimationFrame(animate);
    // });

    // canvas.addEventListener("mouseleave", function(e) {
    //   window.cancelAnimationFrame(globalID);
    // });
  }

	for(var i in particles) {
		particles[i].draw();
	}

	hue += .3;
  window.requestAnimationFrame(animate);
}


setup();
animate();