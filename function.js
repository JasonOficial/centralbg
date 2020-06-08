//alert("ok");
var canvas = document.getElementById("jd__canvas");
var ctx = canvas.getContext("2d"), 
    radius = 30, 
    maxSfere = 500,
    sfereArr = [],
    maxRadius = 50,
    mouse = {
      x: undefined,
      y: undefined
    },
    colores = [
        '#9B9473',
        '#92C5DE',
        '#D6604D',
        '#F7F7F7',
        '#2C71B7',
        '#3B76B5',
        '#AB3D4B',
    ];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('mousemove', function(event){
    
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});

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
        ctx.stroke();
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
        
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            
            if(this.radius < maxRadius){
                this.radius += 1;
            }
        }else if(this.radius > this.minRadius){
            this.radius -= 1;
        }
        
        this.paint();
    }
}

function init(){
    sfereArr = [];
    for(var i = 0; i < maxSfere; i++){
        var radius = Math.random() * 3 + 1,
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













console.log(canvas.height);