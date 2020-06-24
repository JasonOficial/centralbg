//alert("ok");
var canvas = document.getElementById("jd__canvas"),
    ctx = canvas.getContext("2d"),
    multObj = [],
    maxObj = 70,
    widthObj = 40,
    heightObj = 32,
    arrTxt = [
        'Kiss',
        '💋',
        'Kiss',
        '💋'
        ],
    arrFont = [
        //'20px Aclonica',
        '26px Fredoka One',
        '25px Concert One'
    ],
    arrColor = [
        '#E24343',
        '#FFA7A7',
        '#872323',
        '#C40909'
    ];



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});



function itemObj(x, y, w, h, vx, vy){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.fontTxt = arrFont[Math.floor(Math.random() * arrFont.length)];
    this.colorTxt = arrColor[Math.floor(Math.random() * arrColor.length)];
    this.txt = arrTxt[Math.floor(Math.random() * arrTxt.length)];
    this.w = w;
    this.h = h;
    
    
    this.drawTxt = function (){
        ctx.font = this.fontTxt;
        ctx.fillStyle = this.colorTxt;
        ctx.textAlign = "center";
        ctx.fillText(this.txt, this.x, this.y, this.w, this.h);
        ctx.strokeStyle = "rgba(0,0,0,.5)";
        ctx.strokeText(this.txt, this.x, this.y, this.w, this.h);
    
    }
    
    this.update = function (){
        if(this.x + this.w > innerWidth || this.x - this.w < 0){
            this.vx = - this.vx;
        }
        if(this.y + this.h > innerHeight || this.y - this.h < 0){
            this.vy = - this.vy;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.drawTxt();
    }
}

function init(){
    for(var i = 0; i < maxObj; i++){
        var w = widthObj,
            h = heightObj,
            x = Math.random() * (innerWidth - w * 2) + w,
            y = Math.random() * (innerHeight - h * 2) + h,
            vx = (Math.random() - 0.5),
            vy = (Math.random() - 0.5);
        multObj.push(new itemObj(x, y, w, h, vx, vy));
    }
    console.log(multObj.length);
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