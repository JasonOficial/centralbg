var text = document.getElementById("jd__text");
var shadow = '';
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var particles = [];

var maxObj = 300;

for(var s = 0; s < 20; s++){
    shadow += (shadow ? ',' : '') + -s * 1 + 'px ' + s * 1 + 'px 0 #726084';
}
text.style.textShadow = shadow;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}, false);

function Particle(movRadius, step, position, size){
    this.movRadius = movRadius;
    this.step = step;
    this.position = position;
    this.size = size;
    
    this.draw = function(){
        var x = Math.cos(this.position) * this.movRadius + canvas.width/2;
        var y = Math.sin(this.position) * this.movRadius + canvas.height/2;
        
        drawStar(x, y, 5, this.size, this.size/2);
        ctx.fillStyle = 'rgba(255,255,255,.6)';
        ctx.fill();
    }
    
    this.update = function(){
        this.position += this.step;
        this.draw();
    }
}

function init(){
    particles = [];
    for(var i = 0; i < maxObj; i++){
        var movRadius = Math.random() * canvas.width;
        var step = (Math.random() * 0.002) + 0.002;
        var position = Math.random() * (Math.PI*2);
        var size = (Math.random() * 8) + 0.5;
        
        particles.push(new Particle(movRadius, step, position, size));
    }
}

function loop(){
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for(var i in particles){
        var ptc = particles[i];
        ptc.update();
    }
}

init();
loop();

function drawStar(px, py, spikes, outRadius, innerRadius){
    var rotation = Math.PI/2 * 3;
    var x = px;
    var y = py;
    var step = Math.PI / spikes;
    
    ctx.beginPath();
    ctx.moveTo(px, py - outRadius);
    for(var i = 0; i < spikes; i++){
        x = px + Math.cos(rotation) * outRadius;
        y = py + Math.sin(rotation) * outRadius;
        ctx.lineTo(x,y);
        rotation += step;
        
        x = px + Math.cos(rotation) * innerRadius;
        y = py + Math.sin(rotation) * innerRadius;
        ctx.lineTo(x,y);
        rotation += step;
    }
    ctx.lineTo(px, py - outRadius);
    ctx.closePath();
}