var canvas_one = document.getElementById('jd__canvas_one');
var ctx_one = canvas_one.getContext('2d');
var canvas_two = document.getElementById('jd__canvas_two');
var ctx_two = canvas_two.getContext('2d');
var txt = document.getElementById('title');
var hr = document.getElementById('hour');
var mn = document.getElementById('min');
var sc = document.getElementById('sec');
var item = document.createElement('h4');
var box = document.getElementById('box');

var bubbles_one = [];
var bubbles_two = [];
var gradient_one = ctx_one.createLinearGradient(0, 0, innerHeight/2, innerWidth);
gradient_one.addColorStop(0, 'rgba(255,255,255,1)');
gradient_one.addColorStop(1, '#FFF');
var color = '#FF0058';
var deg = 6;
var sw = '';
var text = [
    'JasonOficial',
    'xatSpace',
    'xatFrame',
    'Player',
    'Graphics'
];
var _txt = [];
var count = 0;

for(var i = 0; i < 10; i++){
    sw += (sw ? ',' : '') + -i * 1 + 'px ' + i * 1 + 'px 0 #444';
}
txt.style.textShadow = sw;

function clock(){
    var date = new Date();
    var hour = date.getHours() * 30;
    var min = date.getMinutes() * deg;
    var sec = date.getSeconds() * deg;
    
    hr.style.transform = 'rotateZ('+(hour + (min/12))+'deg)';
    mn.style.transform = 'rotateZ('+(min)+'deg)';
    sc.style.transform = 'rotateZ('+(sec)+'deg)';
}

window.setInterval(clock, 1000);

canvas_one.width = window.innerWidth;
canvas_one.height = window.innerHeight;

canvas_two.width = window.innerWidth;
canvas_two.height = window.innerHeight;






function Bubble(color, speed){
    this.radius = (Math.random() * 150 + 30);
    this.life = true;
    this.x = (Math.random() * window.innerWidth);
    this.y = (Math.random() * 20) + window.innerHeight + this.radius;
    this.vx = (Math.random() * 4) - 2;
    this.vy = ((Math.random() * 0.0002) + 0.001) + speed;
    this.vr = 0;
    this.color = color;
}

Bubble.prototype.update = function(){
    this.vy += 0.00001;
    this.vr += 0.02;
    this.y -= this.vy;
    this.x += this.vx;
    
    if(this.radius > 1){
        this.radius -= this.vr;
    }
    if(this.radius <= 1){
        this.life = false;
    }
}

Bubble.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
}

function handleBubbles(){
    for(var i = bubbles_one.length - 1; i >= 0; i--){
        bubbles_one[i].update();
        if(!bubbles_one[i].life){
            bubbles_one.splice(i, 1);
        }
    }
    for(var j = bubbles_two.length - 1; j >= 0; j--){
        bubbles_two[j].update();
        if(!bubbles_two[j].life){
            bubbles_two.splice(j, 1);
        }
    }
    if(bubbles_one.length < (window.innerWidth / 4)){
        addBubblesOne();
    }
    if(bubbles_two.length < (window.innerWidth / 12)){
        addBubblesTwo();
    }
}

function addBubblesOne(){
    bubbles_one.push(new Bubble(gradient_one, 4.8));
}

function addBubblesTwo(){
    bubbles_two.push(new Bubble(color, 3.3));
}

function loop(){
    ctx_one.clearRect(0, 0, canvas_one.width, canvas_one.height);
    ctx_two.clearRect(0, 0, canvas_two.width, canvas_two.height);
    
    
    handleBubbles();
    
    for(var i = bubbles_one.length - 1; i >= 0; i--){
        bubbles_one[i].draw(ctx_one);
    }
    for(var j = bubbles_two.length - 1; j >= 0; j--){
        bubbles_two[j].draw(ctx_two);
    }
    
    requestAnimationFrame(loop);
}

window.addEventListener('load', loop);

box.appendChild(item);

function lettering(elem){
    var objs = elem.innerHTML.split('');
    elem.innerHTML = '';
    objs.forEach(function(obj, i){
        setTimeout(function(){
            elem.innerHTML += obj;
        }, 200 * i);
    });
}

function reading(){
    text.forEach(function(arr, j){
        setTimeout(function(){
            item.innerHTML = arr;
            lettering(item);
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

reading();