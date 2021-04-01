//Declaring the required variables
var bg, bgImage;
var jake, jake_running;
var coin1, coin1Image;
var coin2,coinSound;
var redDiamond, redDiamondImage;
var blueDiamond, blueDiamondImage; 
var diamondCollect; 
var monster, monsterRunning,monster2, monsterRunning2;
var crossbone1, crossbone1Image;
var crossbone2, crossbone2Image;
var score = 0;
var diamonds = 0;
var coins = 0;
var gameOverSound;
var gameOver, gameOverImage;
var restart, restartImange;
var backgroundSound;
var coin1Grp, coin2Grp;
var redDiamondGrp, blueDiamondGrp;
var redDiamond2Grp, blueDiamond2Grp;
var monster1Grp, monster2Grp;
var crossbone1Grp, crossbone2Grp;

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
//Loading the Required Images and Animations
 bgImage = loadImage("bg.jpg");
coin1Image = loadImage("coin.png");
coin2Image = loadImage("coin.png");
blueDiamondImage = loadImage("blue.png");
redDiamondImage = loadImage("red.png");
blueDiamondImage = loadImage("blue.png");
crossbone1Image = loadImage("crossbone1.png");
crossbone2Image = loadImage("crossbone2.png");
coinSound = loadSound("coinCollect.mp3");
diamondCollect = loadSound("diamond collect.mp3");
gameOverSound = loadSound("gameOver.mp3");
gameOverImage = loadImage("game Over.jpg");
restartImage = loadImage("restart.png");
backgroundSound = loadSound("background.wav")

jake_running = loadAnimation("Jake1.png","Jake2.png","jake3.png","jake4.PNG","jake5.png");
monsterRunning = loadAnimation("monster1.png","monster2.png","monster3.png");
  
monsterRunning2 = loadAnimation("monster4.png","monster5.png","monster6.png");
}


function setup(){
  
  createCanvas(600,510);
  //Creating required sprites
  bg = createSprite(299,50,450,600);
  bg.addImage("bgPic",bgImage);
  bg.scale = 1.065;
  
  
  jake = createSprite(300,420,20,20);
  jake.addAnimation("jakerunning",jake_running);
  jake.scale = 0.9;
  jake.debug = false;
  jake.setCollider("rectangle",0,0,75,165);

  gameOver = createSprite(300,260,600,510);
  gameOver.addImage("gameover", gameOverImage);
  gameOver.scale = 1 ;
  gameOver.visible = false;
  
  restart = createSprite(310.5,430,10,10);
  restart.addImage("reset",restartImage);
  restart.scale = 0.15;
  restart.depth = gameOver.depth;
  restart.depth = restart.depth+1;
  restart.visible = false;
  
  backgroundSound.play();
  backgroundSound.loop();
  
//Creating Groups for the game objects  
  coin1Grp = createGroup();
  coin2Grp = createGroup();
  redDiamondGrp = createGroup();
  blueDiamondGrp = createGroup();
  crossbone1Grp = createGroup();
  crossbone2Grp = createGroup();
  monster1Grp = createGroup();
  monster2Grp = createGroup();

}


function draw(){
  background("cyan");

if(gameState===PLAY){
      
  //Increasing the velocity of the path
  bg.velocityY = +(7+score/500);
  
  //Making Jake move with the mouse
  jake.x = mouseX;
  
  //Resetting the Background
  if(bg.y>600){
    bg.y = 50;
  }
  
  
  if(jake.x<145){
    jake.x = 140;
  }
    if(jake.x>460){
    jake.x = 455;
    }

  
 if(crossbone1Grp.isTouching(jake)){
    gameState = END;
   gameOverSound.play();
  }
  if(crossbone2Grp.isTouching(jake)){
    gameState = END;
    gameOverSound.play();
  }
  
  
  
  if(monster1Grp.isTouching(jake)){
    gameState = END;
    gameOverSound.play();
  }
   if(monster2Grp.isTouching(jake)){
    gameState = END;
     gameOverSound.play();
  }
  
  
  spawnCoins();
   if(coin1Grp.isTouching(jake)){
    coin1Grp.destroyEach();
    coinSound.play();
    score = score+10;
    coins = coins+1;
     
  }
  
  if(coin2Grp.isTouching(jake)){
    coin2Grp.destroyEach();
    coinSound.play();
    score = score+10;
    coins = coins+1;
    
  }

   if(redDiamondGrp.isTouching(jake)){
    redDiamondGrp.destroyEach();
    diamondCollect.play();
     score = score+20;
     diamonds = diamonds+1;
  }
    if(blueDiamondGrp.isTouching(jake)){
    blueDiamondGrp.destroyEach();
    diamondCollect.play();
    score = score+20;
    diamonds = diamonds+1;
  }
  
  
  monsterRun();
  crossbones();
  crossbones2();
  spawnDiamonds();
}
else if(gameState===END){
backgroundSound.stop();
  bg.velocityY = 0;
  coin1Grp.destroyEach();
  coin2Grp.destroyEach();
  redDiamondGrp.destroyEach();
  blueDiamondGrp.destroyEach();
  monster1Grp.destroyEach();
  monster2Grp.destroyEach();
  crossbone1Grp.destroyEach();
  crossbone2Grp.destroyEach();
gameOver.visible = true;
restart.visible = true;

    if(mousePressedOver(restart)){
backgroundSound.loop();
    reset();
    gameState = PLAY;
    coins = 0;
    score = 0;
    diamonds = 0;
  }
}
  drawSprites();
  
  
fill("cyan");
stroke("darkblue");
textFont("Algerian");
textSize(24);
text("Diamonds: ",115,25);

fill("cyan");
stroke("darkblue");
textFont("Algerian");
textSize(24);
text(diamonds ,240,25);
  
fill("yellow");
stroke("gold");
textFont("Algerian");
textSize(24);
text("Coins: "+coins,385,25);

fill("blue");
stroke("red");
textFont("Algerian");
textSize(21);
text("Score : ",288,18);

fill("blue");
stroke("red");
textFont("Algerian");
textSize(25);
text(score,295,40);

if(gameState===END){
  fill("Blue")
  stroke("lightgreen");
  textFont("Baveria");
  textSize(45);
  text("Click on        to Restart",110,440);
}
  
}


function spawnCoins(){
//Creating coins 
if(frameCount%70===0){
coin1 = createSprite(190,10,10,10);
coin1.addImage("coinPic",coin1Image);
coin1.scale = 0.52;
coin1.velocityY = +(6+score/200);
coin1.lifetime = 120;
coin1Grp.add(coin1);
}

if(frameCount%120===0){
coin2 = createSprite(425,10,10,10);
coin2.addImage("coinPic",coin2Image);
coin2.scale = 0.52;
coin2.velocityY = +(6+score/200);
coin2.lifetime = 120;
coin2Grp.add(coin2);
 } 
  
}

function spawnDiamonds(){
  //Creating Diamonds
  if(frameCount%180===0){
  redDiamond = createSprite(190,10,10,10);
  redDiamond.addImage("redDiamond",redDiamondImage);
  redDiamond.scale = 0.1;
  redDiamond.velocityY = +(6+score/200);
  redDiamond.lifetime = 120;
  redDiamondGrp.add(redDiamond);
  }
  if(frameCount%265===0){
  blueDiamond = createSprite(425,10,10,10);
  blueDiamond.addImage("redDiamond",blueDiamondImage);
  blueDiamond.scale = 0.15;
  blueDiamond.velocityY = +(6+score/200);
  blueDiamond.lifetime = 120;
  blueDiamondGrp.add(blueDiamond);
  
  
  }
}

function monsterRun(){
  //Creating the monster
  if(frameCount%125===0){
    monster = createSprite(310,10,20,20);
    monster.scale = 0.427;
    monster.velocityY = +(6+score/200);
    monster.lifetime = 120;
    monster1Grp.add(monster);
    
    monster2 = createSprite(310,10,20,20);
    monster2.scale = 0.427;
    monster2.velocityY = +(6+score/200);
    monster2.lifetime = 120;
    monster2Grp.add(monster2);
    
    var any = Math.round(random(1,2));
switch(any){
  case 1:monster.addAnimation("monsterRunningPic",monsterRunning); 
  break;
  case 2:monster2.addAnimation("monsterRunnerPic",monsterRunning2);
  break;
  default:
  break;
    }
  }
}

function crossbones(){
  //Creating the Crossbones
  if(frameCount%310===0){
  crossbone1 = createSprite(190,10,20,20);
  crossbone1.velocityY = +(6+score/200);
  crossbone1.scale = 0.21;
  crossbone1.lifetime = 120;
  crossbone1Grp.add(crossbone1);
  
  crossbone2 = createSprite(190,10,20,20);
  crossbone2.velocityY = +(6+score/200);
  crossbone2.scale = 0.37;
  crossbone2.lifetime = 120;
  crossbone2Grp.add(crossbone2);
    
  var anySprite = Math.round(random(1,2));
    switch(anySprite){
      case 1:crossbone1.addImage("crossbonePic", crossbone1Image);
      break;
      case 2:crossbone2.addImage("crossbonePic", crossbone2Image);
    }
  }
}

function crossbones2(){
  if(frameCount%390===0){
  crossbone1 = createSprite(425,10,20,20);
  crossbone1.velocityY = +(6+score/200);
  crossbone1.scale = 0.21;
  crossbone1.lifetime = 120;
  crossbone1Grp.add(crossbone1);
  
  crossbone2 = createSprite(425,10,20,20);
  crossbone2.velocityY = +(6+score/200);
  crossbone2.scale = 0.37;
  crossbone2.lifetime = 120;
  crossbone2Grp.add(crossbone2);
    
  var anySprite = Math.round(random(1,2));
    switch(anySprite){
      case 1:crossbone1.addImage("crossbonePic", crossbone1Image);
      break;
      case 2:crossbone2.addImage("crossbonePic", crossbone2Image);
    }
  }
}

function reset(){
  coin1Grp.destroyEach();
  coin2Grp.destroyEach();
  redDiamondGrp.destroyEach();
  blueDiamondGrp.destroyEach();
  monster1Grp.destroyEach();
  monster2Grp.destroyEach();
  crossbone1Grp.destroyEach();
  crossbone2Grp.destroyEach();
  restart.visible = false;
  gameOver.visible = false;
  jake.addAnimation("jakerunning",jake_running);
}
