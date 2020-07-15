var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var particles = [];
var opacity = 6;
var alpha = Math.floor(Math.random() * opacity + 1);
var color = [
    'rgba(254,3,163,1)',
    'rgba(253,205,3,1)',
    'rgba(0,140,236,1)',
    'rgba(20,25,114,1)'
];
var emoticons = [
    "😍",
    "😂",
    "😇",
    "😊",
    "😭",
    "😷",
    "🙄",
    "🤭"
];
var maxBalls = 80;

var colorize = color[Math.floor(Math.random() * color.length)];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}, false);

function randomPosition(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function rotate(velocity, angle){
    var rotateVelo = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotateVelo;
}

function Collider(obj, other){
    var halfDistX = obj.velocity.x - other.velocity.x;
    var halfDistY = obj.velocity.y - other.velocity.y;
    
    var xDist = other.x - obj.x;
    var yDist = other.y - obj.y;
    
    
    if(halfDistX * xDist + halfDistY * yDist > 0){
        var angle = -Math.atan2(other.y - obj.y, other.x - obj.x);
        
        var m1 = obj.mass;
        var m2 = other.mass;
        
        var u1 = rotate(obj.velocity, angle);
        var u2 = rotate(other.velocity, angle);
        
        var v1 = {x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
        var v2 = {x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y};
        
        var veloF1 = rotate(v1, -angle);
        var veloF2 = rotate(v2, -angle);
        
        obj.velocity.x = veloF1.x;
        obj.velocity.y = veloF1.y;
        
        other.velocity.x = veloF2.x;
        other.velocity.y = veloF2.y;
    }
}

function Dist(x1, y1, x2, y2){
    var xD = x2 - x1;
    var yD = y2 - y1;
    
    return Math.sqrt(Math.pow(xD, 2) + Math.pow(yD, 2));
}




function Particle(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color[Math.floor(Math.random() * color.length)];
    this.velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
    };
    this.mass = 1;
    this.w = this.radius * 2;
    this.h = this.radius * 2;
    this.text = emoticons[Math.floor(Math.random()*emoticons.length)];
    
    
    this.update = particles => {
        this.draw();
        
        for(var i = 0; i < particles.length; i++){
            if(this === particles[i]) continue;
            if(Dist(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0){
                Collider(this, particles[i]);
            }
        }
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.velocity.x = -this.velocity.x;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.velocity.y = -this.velocity.y;
        }
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
    
    this.draw = () => {
        ctx.font = "45px sans-serif";
        ctx.strokeStyle = "white";
        ctx.fillText(this.text, this.x - this.radius, this.y + this.radius/2, this.w, this.h);
        
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();
        
        
    }
}

function init(){
    particles = [];
    for(var i = 0; i < maxBalls; i++){
        var radius = 30, 
            x = randomPosition(radius, canvas.width - radius),
            y = randomPosition(radius, canvas.height - radius);
            
        if(i !== 0){
            for(var j = 0; j < particles.length; j++){
                if(Dist(x, y, particles[j].x, particles[j].y) - radius * 2 < 0){
                    x = randomPosition(radius, canvas.width - radius);
                    y = randomPosition(radius, canvas.height - radius);
                    
                    j = - 1;
                }
            }
        }
        particles.push(new Particle(x, y, radius));
    }
}

function loop(){
    requestAnimationFrame(loop);
    
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(var i in particles){
        var ptc = particles[i];
        ptc.update(particles);
    }
}

init();
loop();