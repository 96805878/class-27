const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body
const Constraint = Matter.Constraint;
var engine, world,ground;

var bg;
var towerImg;
var cannon;
var angle;
var boatSpritesheet,brokenboatSpritesheet;
var boatspriteData,brokenboatSpriteData;

var boatAnimation= [];
var brokenboatAnimation=[];
var boats=[];

var cannonballs=[];

var splashSpriteData,splashSpritesheet;
var splashAnimation=[];

function preload() {
  boatSpritesheet=loadImage("assets/boat/boat.png")
  brokenboatSpritesheet=loadImage("assets/boat/brokenBoat.png")

  boatspriteData=loadJSON("assets/boat/boat.json")
  brokenboatSpriteData=loadJSON("assets/boat/brokenBoat.json")

  splashSpritesheet=loadImage("assets/waterSplash/waterSplash.png")
  splashSpriteData=loadJSON("assets/waterSplash/waterSplash.json")

  bg=loadImage("assets/background.gif");
  towerImg=loadImage("assets/tower.png");

  
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  options={
    isStatic:true

  }
    
  angleMode(DEGREES);
  angle=15;
  tower= Bodies.rectangle(160,350,160,310,options);
  World.add(world,tower);
  

  ground= Bodies.rectangle(0,height-1, width*2,1,options);
  World.add(world,ground);

  cannon= new Cannon(190,110,130,100,angle);

  //water splash animation
  var splashFrames=splashSpriteData.frames;
  for(var i=0;i<splashFrames.length;i++){

    var pos= splashFrames[i].position;
    var img= splashSpritesheet.get(pos.x, pos.y, pos.w, pos.h)
    splashAnimation.push(img)
  }


  //Broken boat animation
  var brokenboatFrames=brokenboatSpriteData.frames;
  for(var i=0;i<brokenboatFrames.length;i++){
    
    var pos = brokenboatFrames[i].position;
    var img = brokenboatSpritesheet.get(pos.x, pos.y, pos.w, pos.h)
    brokenboatAnimation.push(img)
  }

  
  //Boat animation
  var boatFrames=boatspriteData.frames;
  for(var i=0;i<boatFrames.length;i++){

    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h)
    boatAnimation.push(img);

  }
}

function draw() {
  background(189);

  image(bg, 0, 0, width, height);
  Engine.update(engine);
 
  rect(ground.position.x, ground.position.y,width*2,1);
  push(); //Adds a new property
  imageMode(CENTER);
  image(towerImg,tower.position.x,tower.position.y,160,310)
  pop(); //removes the last added property
   cannon.display();
   //cannonball.display();
   

  for(var i=0;i<cannonballs.length;i++){
    showcannonBalls(cannonballs[i] ,i);
    
    boatCollision(i);
  }



  showShips();
}

function keyReleased(){

  if(keyCode===DOWN_ARROW){
    cannonballs[cannonballs.length-1].shoot()
  }

}

function showcannonBalls(ball, index){
  //checking whether ball is created or not
  if(ball){
    ball.display();
    ball.animate();
    
    //Checking if the cannonball is outside the canvas
    if(ball.body.position.x >= width || ball.body.position.y >=height){
      ball.cannonballRemove(index)
      
    
    }

  }
  
}

function showShips(){

  if(boats.length>0){
    
    if(boats[boats.length-1] === undefined || boats[boats.length-1].body.position.x < width - 400){
      var positions=[-40,-20,-60,-70]
      var position=random(positions)

      var ship= new Ship(width+20,height-100,170,170,position,boatAnimation)
      boats.push(ship);
    }

    for(var i=0;i<boats.length;i++){
      if(boats[i]){
        Body.setVelocity(boats[i].body,{x:-0.75  ,y:0})
        boats[i].display();
        boats[i].animate();
      }
    }

  }
  else{
    var ship= new Ship(width-100,height-70,170,170,-70,boatAnimation)
    boats.push(ship)
    
  }
}

function keyPressed(){
  if(keyCode===DOWN_ARROW){
    
    var cannonBall=new Cannonball(cannon.x,cannon.y)
    
    cannonballs.push(cannonBall)
  }
}

function boatCollision(index){
  for(var i=0;i<boats.length;i++){
    if(boats[i]!==undefined &&cannonballs[index]!==undefined){
      var collision=Matter.SAT.collides(boats[i].body,cannonballs[index].body)
      if(collision.collided){
        boats[i].boatRemove(i)
        cannonballs[index].cannonballRemove(index)

      }

    }

  }


}




