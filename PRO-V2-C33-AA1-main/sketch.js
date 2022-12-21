const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW;
var canH;

var blower;
var bttf;
var bdi, bei;

function preload()
{
  bg_img = loadImage('farm3.png');
  food = loadImage('candy.png');
  rabbit = loadImage('Rabbit-01.png');
  bdi = loadImage('bdi2.png');
  bei = loadImage('bei2.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("bb1.png","bb2.png","bb3.png");
  eat = loadAnimation("om.png" , "bb2.png","bb3.png","fat.png");
  sad = loadAnimation("bb2.png","mush2.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  
  createCanvas(500,700);
  
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //botão 1
  button = createImg('cloud3.png');
  button.position(0,150);
  button.size(200,200);
  button.mouseClicked(drop);

   //botão 2
   button2 = createImg('cloud3.png');
   button2.position(270,-20);
   button2.size(200,200);
   button2.mouseClicked(drop2);
 
   //botão 3
   button3 = createImg('cloud3.png');
   button3.position(330,150);
   button3.size(200,200);
   button3.mouseClicked(drop3);

  mute_btn = createImg('mcute.png');
  mute_btn.position(420,20);
  mute_btn.size(70,70);
  mute_btn.mouseClicked(mute);

  blower = createImg('myballoon.png');
  blower.position(210, 420);
  blower.size(120, 120);
  blower.mouseClicked(airBlow);
  
  rope = new Rope(8,{x:40,y:220});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});

  ground = new Ground(200,690,600,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(170,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  bttf = createSprite(40, 400, 80, 80);
  bttf.addImage('1', bdi);
  bttf.addImage('2', bei);
  bttf.scale = 0.09;
  bttf.velocityX = 3;
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3 = new Link(rope3,fruit);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
  }

  if(bttf.x >= 500)
  {
    bttf.velocityX = -3;
    bttf.changeImage('2');
  }
  if(bttf.x <= 5)
  {
    bttf.velocityX = 3;
    bttf.changeImage('1');
  }
  if(collide(fruit,bttf)==true)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
  }
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}

function drop3()
{
  cut_sound.play();
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null;
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function airBlow()
{
  Matter.Body.applyForce(fruit, {x:0,y:0}, {x:0,y:-0.03});
}
