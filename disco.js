var canvas = document.getElementById("jd__canvas");
var ctx = canvas.getContext("2d");
var _day = document.getElementById("jd__day");
var _mon = document.getElementById("jd__mon");
var _year = document.getElementById("jd__year");
var _hour = document.getElementById("jd__hour");
var _min = document.getElementById("jd__min");
var _sec = document.getElementById("jd__sec");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var alpha = Math.floor(1 + Math.random()*4),
    color = [
    'rgba(255,255,255,0.'+alpha+')',
    'rgba(0,0,0,0.'+alpha+')'
],
    multObj = [],
    maxRadius = 20,
    maxSfere = 250;

function initClock(){
    var d = new Date().getDate(),
        m = new Date().getMonth(),
        y = new Date().getFullYear(),
        h = new Date().getHours(),
        mi = new Date().getMinutes(),
        sec = new Date().getSeconds(),
        allMon = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    
    if(d < 10){d = '0' + d}else{d = d};
    if(h < 10){h = '0' + h}else{h = h};
    if(mi < 10){mi = '0' + mi}else{mi = mi};
    if(sec < 10){sec = '0' + sec}else{sec = sec};
    
    _day.innerHTML = d;
    _mon.innerHTML = allMon[m];
    _year.innerHTML = y;
    _hour.innerHTML = h;
    _min.innerHTML = mi;
    _sec.innerHTML = sec;
}

 window.setInterval(initClock, 1000);

function Sfere(x, y, radius, vx, vy){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    this.color = color[Math.floor(Math.random() * color.length)];
    
    this.draw = function (){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
    this.update = function (){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.vx = - this.vx;
        }
        if(this.y + this.radius > innerHeight){
            this.vy = + this.vy;
        }else if(this.y + this.radius < 0){
            this.y = innerHeight + this.radius;
            this.y += this.vy;
        }
        
        this.x += this.vx;
        this.y -= this.vy;
        
        this.draw();
    }
}

function init(){
    multObj = [];
    for(var i = 0; i < maxSfere; i++){
        var radius = Math.floor(5 + Math.random() * maxRadius),
            x = Math.random() * (innerWidth - radius * 2) - radius,
            y = innerHeight + radius,
            vx = (Math.random() - 0.5),
            vy = (Math.random() - 0.5);
        
        multObj.push(new Sfere(x, y, radius, vx, vy));
    }
}

function animate(){
    requestAnimationFrame(animate);
    
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for(var i = 0; i < multObj.length; i++){
        multObj[i].update();
    }
}

init();
animate();