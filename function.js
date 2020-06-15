//alert("ok");
var canvas = document.getElementById("jd__canvas"),
    ctx = canvas.getContext("2d"),
    arrObj = [],
    maxBall = 150,
    maxRadius = 4,
    colorBall = "#00A2FF",
    colorLine = "rgba(0,162,255,.2)";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function itemObj(x, y, vx, vy, radius){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.colorize = colorBall;
    
    this.drawBall = function (){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.colorize;
        ctx.fill();
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
            if(gap < (canvas.width/10) * (canvas.height/10)){
                ctx.strokeStyle = colorLine;
                ctx.beginPath();
                ctx.lineWidth = 1;
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

init();
animate();