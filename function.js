let canvas = document.querySelector('canvas');
let box = document.getElementById('box');
let h1 = document.createElement('h1');
let ctx = canvas.getContext('2d');
let particles = [];
let txt = [
    "♫",
    "♩",
    "♬",
    "♪"
];
let txtArr = [
    'Já tem um xatFrame? O que está esperando pra adquirir um.',
    'Jason Códigos e Gráficos',
    'xatSpace 4 mil xats',
    'Vendas de Player Flash suspensa',
    'Player HTML5 disponível vários Modelos'
];
let objs = [];
let color = [
    '#34343F',
    '#FFF',
    '#F991B3',
    '#FFCF31',
    '#31B9FF',
    '#DB5252'
];
let count = 0;
let maxParticle = 20;

box.appendChild(h1);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}, false);

function initTxt(item){
    let text = item.innerHTML.split('');
    item.innerHTML = '';
    text.forEach(function(txt, i){
        setTimeout(function(){
            item.innerHTML += txt;
        }, 200 * i);
    });
}

function reading(){
    txtArr.forEach(function(_txt, j){
        setTimeout(function(){
            h1.innerHTML = _txt;
            initTxt(h1);
            count++;
            
            if(count === txtArr.length){
                setTimeout(function(){
                    count = 0;
                    this.reading();
                }, 15000);
            }
        }, 15000 * j);
    });
}

function Particle(){
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 6 - 3;
    this.color = color[Math.floor(Math.random() * color.length)];//"hsla("+parseInt(Math.random()*360, 10)+",100%,50%, 0.8)";
    this.txt = txt[Math.floor(Math.random() * txt.length)];
}

Particle.prototype.draw = function(){
    ctx.fillStyle = this.color;
    ctx.font = "25px Arial";
    ctx.fillText(this.txt, this.x, this.y);
}

Particle.prototype.update = function(){

    if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    }

    this.x += this.speedX;
    this.y += this.speedY;
}

function init(){
    for(var i = 0; i < maxParticle; i++){
        particles.push(new Particle());
    }
}

//var cubo = new Particle();
//cubo.update();

function animate(){
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for(var i in particles){
        particles[i].draw();
        particles[i].update();

        console.log(particles.length);
        
    }
}

init();
animate();
console.log(canvas.height);
reading();

