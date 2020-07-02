var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var _m = document.getElementById('jd__mon');
var _dNu = document.getElementById('jd__dayNu');
var _dNa = document.getElementById('jd__dayNa');
var _y = document.getElementById('jd__year');
var _hrs = document.getElementById('jd__hours');

var alpha = Math.floor(1 + Math.random() * 5),
    color = [
    'rgba(141,207,9,0.'+alpha+')',
    'rgba(0,0,0,0.'+alpha+')',
    'rgba(250,255,255,0.'+alpha+')'
],
    lineColor = 'rgba(0,0,0,0.'+alpha+')',
    obj = [],
    maxBall = 200,
    maxRadius = 20;

function initClock(){
    var date = new Date();
    const lang = navigator.language;
    
    var m = date.toLocaleString(lang, {month: 'long'}),
        dNu = date.getDate(),
        dNa = date.toLocaleString(lang, {weekday: 'long'}),
        y = date.getFullYear(),
        h = date.getHours(),
        mi = date.getMinutes(),
        sc = date.getSeconds();
    
    
    if(h < 10){h = '0' + h}else{h = h};
    if(mi < 10){mi = '0' + mi}else{mi = mi};
    if(sc < 10){sc = '0' + sc}else{sc = sc};
    if(dNu < 10){dNu = '0' + dNu}else{dNu = dNu};
    
    var form = h + ':' + mi + ':' + sc;
    
    _m.innerHTML = m;
    _dNu.innerHTML = dNu;
    _dNa.innerHTML = dNa;
    _y.innerHTML = y;
    _hrs.innerHTML = form;
        
}

window.setInterval(initClock, 1000);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function Ball(x, y, radius, vx, vy){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    this.color = color[Math.floor(Math.random() * color.length)];
    this.lineColor = lineColor;
    
    this.draw = function (){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0 , Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.lineColor;
        ctx.stroke();
    }
    
    this.update = function (){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.vx = - this.vx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.vy = - this.vy;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.draw();
    }
}

function init(){
    for(var i = 0; i < maxBall; i++){
        var r = Math.floor(2 + Math.random() * maxRadius),
            x = Math.random() * (innerWidth - maxRadius * 2) - maxRadius,
            y = Math.random() * (innerHeight - maxRadius * 2) - maxRadius,
            vx = (Math.random() - 0.5),
            vy = (Math.random() - 0.5);
        
        obj.push(new Ball(x, y, r, vx, vy));
        
    }
}

function loop(){
    requestAnimationFrame(loop);
    
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for(var i in obj){
        var _obj = obj[i];
        _obj.update();
    }
}

init();
loop();