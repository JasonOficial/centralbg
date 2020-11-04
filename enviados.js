//alert("ok");
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d"), 
    radius = 50, 
    maxSfere = 100,
    sfereArr = [],
    maxRadius = 15,
    mouse = {
      x: undefined,
      y: undefined
    },
    colores = [
        'rgba(255,255,255,.1)',
        'rgba(255,255,255,.2)',
        'rgba(255,255,255,.3)',
        'rgba(255,255,255,.4)',
    ];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    init();
});

function Sfere(x, y, vx, vy, radius){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colores[Math.floor(Math.random() * colores.length)];
    
    this.paint = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        //ctx.stroke();
        ctx.fill();
    }
    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.vx = - this.vx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.vy = - this.vy;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.paint();
    }
}

function init(){
    sfereArr = [];
    for(var i = 0; i < maxSfere; i++){
        var radius = Math.random() * maxRadius,
            x = Math.random() * (innerWidth - radius * 2) + radius, 
            y = Math.random() * (innerHeight - radius * 2) + radius,
            vx = (Math.random() - 0.5),
            vy = (Math.random() - 0.5);
        sfereArr.push(new Sfere(x, y, vx, vy, radius));
    }
    //animate();
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for(var i = 0; i < sfereArr.length; i++){
        sfereArr[i].update();
    }
    
}
animate();
init();
