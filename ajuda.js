var canvas = document.querySelector('canvas');
var _txt = document.createElement('h2');
var box = document.querySelector('#box');
var ctx = canvas.getContext('2d');

var text = [
    'Jason',
    'Designer',
    'Agora o xat.com esta com nova versão html5'
];
var objs = [];
var maxObj = 70;
var size = 20;
var count = 0;

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

box.appendChild(_txt);

function initText(elem){
    var objs = elem.innerHTML.split('');
    elem.innerHTML = '';
    objs.forEach(function(obj, i){
        setTimeout(function(){
            elem.innerHTML += obj;
        }, 175 * i);
    });
}

function reading(){
    text.forEach(function(txt, j){
        setTimeout(function(){
            _txt.innerHTML = txt;
            initText(_txt);
            count++;
            
            if(count === text.length){
                setTimeout(function(){
                    count = 0;
                    this.reading();
                }, 10000);
            }
        }, 10000 * j);
    });
}

function Ball(x, y, radius, vx, vy){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ffc501';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.x, this.y + this.radius/4.5, this.radius * 0.6, 0, Math.PI * 0.75, false);
        ctx.strokeStyle = '#FF4D4D';
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(this.x - this.radius/3, this.y - this.radius/3, this.radius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.x + this.radius/3, this.y - this.radius/3, this.radius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.x - this.radius/3, this.y - this.radius/3, this.radius * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.x + this.radius/3, this.y - this.radius/3, this.radius * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.fill();
    }
    
    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.vx = - this.vx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;
        
        this.draw();
    }
}

function init(){
    objs = [];
    for(var i = 0; i < 50; i++){
        var radius = Math.floor(10 + Math.random() * 25);
        var x = Math.random() * (innerWidth - radius * 2);
        var y = Math.random() * (innerHeight - radius * 2);
        var vx = (Math.random() - 0.5);
        var vy = (Math.random() - 0.5);
        
        objs.push(new Ball(x, y, radius, vx, vy));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(var i in objs){
        var obj = objs[i];
        obj.update();
    }
    
}
init();
animate();
reading();