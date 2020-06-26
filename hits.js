//alert("ok!");
var canvas = document.getElementById("jd__canvas");
var ctx = canvas.getContext("2d"),
    colorTxt = "#FCAF09",
    fontTxt = "22px Bree Serif",
    textContent = [
      "Hits",
        "🎧"
    ],
    multObj = [],
    maxObj = 50;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function itemObj(x, y, w, h, dx, dy){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dx = dx;
    this.dy = dy;
    this.colorTxt = colorTxt;
    this.textContent = textContent[Math.floor(Math.random() * textContent.length)];
    this.fontTxt = fontTxt //[Math.floor(Math.random() * fontTxt.length)];
    
    this.drawTxt = function (){
        ctx.font = this.fontTxt;
        ctx.textAlign = "center";
        ctx.fillStyle = this.colorTxt;
        ctx.fillText(this.textContent, this.x, this.y, this.w, this.h);
    }
    
    this.update = function (){
        if(this.x + this.w > innerWidth || this.x - this.w < 0){
            this.dx = - this.dx;
        }
        if(this.y + this.h > innerHeight || this.y - this.h < 0){
            this.dy = - this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;
        
        this.drawTxt();
    }
}

function init(){
    multObj = [];
    for(var i = 0; i < maxObj; i++){
        var w = 40,
            h = 32,
            x = Math.random() * (innerWidth - w * 2) + w,
            y = Math.random() * (innerHeight - h * 2) - h,
            dx = (Math.random() - 0.5),
            dy = (Math.random() - 0.5);
        multObj.push(new itemObj(x, y, w, h, dx, dy));
        //console.log(multObj[0]);
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