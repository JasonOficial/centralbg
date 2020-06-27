var canvas = document.getElementById("jd__canvas");
var dEl = document.getElementById("jd__day");
var mEl = document.getElementById("jd__month");
var yEl = document.getElementById("jd__year");
var hEl = document.getElementById("jd__hours");
var minEl = document.getElementById("jd__min");
var secEl = document.getElementById("jd__sec");

var ctx = canvas.getContext("2d"),
    color = "#00A2FF",
    multObj = [], 
    maxCircle = 150,
    maxRadius = 3,
    lineColor = "rgba(0,162,255,.2)";



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function clock(){
    var h = new Date().getHours(),
        m = new Date().getMinutes(),
        s = new Date().getSeconds(),
        d = new Date().getDay(),
        mo = new Date().getMonth(),
        y = new Date().getYear(),
        monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    if(s < 10){s = '0' + s;}else{s = s;}
    if(m < 10){m = '0' + m;}else{m = m;}
    if(h < 10){h = '0' + h;}else{h = h;}
    if(d < 10){d = '0' + d;}else{d = d;}
    
    hEl.innerHTML = h;
    minEl.innerHTML = m;
    secEl.innerHTML = s;
    dEl.innerHTML = d;
    mEl.innerHTML = monthArr[mo];
    secEl.innerHTML = s;
}

var interval = setInterval(clock, 1000);

function Circle(x, y, radius, dx, dy){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    
    this.drawCircle = function (){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
    this.update = function (){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = - this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = - this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;
        
        this.drawCircle();
    }
}

function init(){
    for(var i = 0; i < maxCircle; i++){
        var radius = Math.floor(1 + Math.random() * maxRadius),
            x = Math.random() * (innerWidth - radius * 2) - radius,
            y = Math.random() * (innerHeight - radius * 2) - radius,
            dx = (Math.random() - 0.5),
            dy = (Math.random() - 0.5);
        
        multObj.push(new Circle(x, y, radius, dx, dy));
    }
}

function connect(){
    for(var j = 0; j < multObj.length; j++){
        for(var l = j; l < multObj.length; l++){
            var dist = ((multObj[j].x - multObj[l].x) * (multObj[j].x - multObj[l].x))
            + ((multObj[j].y - multObj[l].y) * (multObj[j].y - multObj[l].y));
            if(dist < (canvas.width/10) * (canvas.height/10)){
                ctx.strokeStyle = lineColor;
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.moveTo(multObj[j].x, multObj[j].y);
                ctx.lineTo(multObj[l].x, multObj[l].y);
                ctx.stroke();
            }
        }
    }
}

function animate(){
    requestAnimationFrame(animate);
    
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for(var i = 0; i < multObj.length; i++){
        multObj[i].update();
    }
    connect();
}

init();
animate();
//alert("!ok");