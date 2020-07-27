var canvas = document.getElementById("jd__canvas");
var hour = document.getElementById("hour");
var min = document.getElementById("min");
var sec = document.getElementById("sec");
var ctx = canvas.getContext("2d");
var gradientColor = ctx.createLinearGradient(0, 0, innerWidth, 0);
gradientColor.addColorStop(0, '#FF5B02');
gradientColor.addColorStop(1, '#FEA000');
var arrObj = [],
    maxRadius = 3,
    maxBall = 150;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}, false);

function itemObj (x, y, vx, vy, radius){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    
    this.drawBall = function (){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradientColor;
        ctx.fill();
    }
    
    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.vx = -this.vx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.vy = -this.vy;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.drawBall();
    }
}

function init(){
    for(var i = 0; i < maxBall; i++){
        var radius = Math.random() * maxRadius,
            x = Math.random() * (innerWidth - radius * 2) + radius,
            y = Math.random() * (innerHeight - radius * 2) + radius,
            vx = (Math.random() - 0.5),
            vy = (Math.random() - 0.5);
        arrObj.push(new itemObj(x, y, vx, vy, radius));
    }
}

function connect(){
    for(var a = 0; a < arrObj.length; a++){
        for(var b = a; b < arrObj.length; b++){
            var gap = ((arrObj[a].x - arrObj[b].x) * (arrObj[a].x - arrObj[b].x)) 
            + ((arrObj[a].y - arrObj[b].y) * (arrObj[a].y - arrObj[b].y));
            if(gap < (canvas.width/7) * (canvas.height/7)){
                ctx.strokeStyle = gradientColor;
                ctx.lineWidth = 0.25;
                ctx.beginPath();
                ctx.moveTo(arrObj[a].x, arrObj[a].y);
                ctx.lineTo(arrObj[b].x, arrObj[b].y);
                ctx.stroke();
            }
        }
    }
   
}

function animate(){
    requestAnimationFrame(animate);
    
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for(var i = 0; i < arrObj.length; i++){
        arrObj[i].update();
    }
    connect();
}

function initClock(){
    var d = new Date(),
        h = new Date().getHours(),
        mi = new Date().getMinutes(),
        sc = new Date().getSeconds();
        
    if(h < 10){h = '0' + h}else{h = h};
    if(mi < 10){mi = '0' + mi}else{mi = mi};
    if(sc < 10){sc = '0' + sc}else{sc = sc};
    
    hour.innerHTML = h;
    min.innerHTML = mi;
    sec.innerHTML = sc;
}

 window.setInterval(initClock, 1000);

init();
animate();