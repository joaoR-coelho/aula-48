var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var score = 0;
var life = 3;
var bullets = 70;

var heart1, heart2, heart3

var gameState = "fight"

var lose, winning, explosionSound;


function preload(){
 heart1Img=loadImage("assets/heart_1.png")
 heart2Img=loadImage("assets/heart_2.png")
 heart3Img=loadImage("assets/heart_3.png") 
 shooterImg=loadImage("assets/policial.png")
 zombieImg=loadImage("assets/ladrao.png")
 bgImg=loadImage("assets/593650.jpg")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg=createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
 bg.scale=0.75

 player=createSprite(displayWidth-1150, displayHeight-300, 50, 50)
 player.addImage(shooterImg)
 player.scale=0.3
 //player.debug=true
 player.setCollider("rectangle",0,0,400,600)
 player.debug=false  

 heart1=createSprite(displayWidth-150,40,20,20)
 heart1.visible=false
 heart1.addImage(heart1Img)
 heart1.scale=0.4

 heart2=createSprite(displayWidth-100,40,20,20)
 heart2.visible=false
 heart2.addImage(heart2Img)
 heart2.scale=0.4

 heart3=createSprite(displayWidth-150,40,20,20)
 heart3.visible=false
 heart3.addImage(heart3Img)
 heart3.scale=0.4


  
    //criando grupos de zumbis e balas
    bulletGroup=new Group()
    zombieGroup=new Group()

}

function draw() {
  background(0); 
  if (gameState=="fight") {
    if (life==3) {
      heart1.visible=false
      heart2.visible=false
      heart3.visible=true
    }
     if (life==2) {
      heart1.visible=false
      heart3.visible=false
      heart2.visible=true
     }
      if (life==1) {
      heart3.visible=false
      heart2.visible=false
      heart1.visible=true
      }
      if (life==0) {
        gameState="lost"
      }
      
      if (score==100) {
        gameState="won"
      }
      if (keyDown("UP_ARROW")||touches.length>0) {
        player.y-=30
      }
      if (keyDown("DOWN_ARROW")||touches.length>0) {
        player.y+=30
      }
      if (player.y<70) {
        player.y=70
        
      }
      if (player.y>600) {
        player.y=600
      }
      if (keyWentDown("space")) {
        bullet=createSprite(displayWidth-1150,player.y-30,20,10)
        bullet.velocityX=20
        bulletGroup.add(bullet)
        player.depth=bullet.depth
        player.depth+=2
        bullets-=1
      }
      if (bullets==0) {
        gameState="bullet"
      }
      if (zombieGroup.isTouching(bulletGroup)) {
        for(var i=0;i<zombieGroup.length;i++){
          if (zombieGroup[i].isTouching(bulletGroup)) {
            zombieGroup[i].destroy()
            bulletGroup.destroyEach()
            score=score+2
          }
        }
      }
      if (zombieGroup.isTouching(player)) {
        for(var i=0;i<zombieGroup.length;i++){
          if (zombieGroup[i].isTouching(player)) {
        zombieGroup[i].destroy()
        life=life-1    
          }
        }
      }
      enemy()
  } 






drawSprites();

//exibindo a pontuação e as vidas e balas restantes
textSize(20)
  fill("white")
text("Balas = " + bullets,displayWidth-210,displayHeight/2-250)
text("Pontuação = " + score,displayWidth-200,displayHeight/2-220)
text("Vidas = " + life,displayWidth-200,displayHeight/2-280)

//destrua o zumbi e o jogador e exiba uma mensagem em gameState "lost"
if(gameState == "lost"){
  textSize(100)
  fill("red")
  text("voce perdeu",400,400)
  zombieGroup.destroyEach()
  player.destroy()
  heart1.visible=false
  
  

}

//destrua o zumbi e o jogador e exiba uma mensagem em gameState "won"
else if(gameState == "won"){
 textSize(100)
  fill("red")
  text("voce ganhou",400,400)
  zombieGroup.destroyEach()
  player.destroy() 
  

}

//destrua o zumbi, o jogador e as balas e exiba uma mensagem no gameState "bullet"
else if(gameState == "bullet"){
  textSize(100)
  fill("red")
  text("voce nao tem mais balas",400,400)
  zombieGroup.destroyEach()
  player.destroy()
  bulletGroup.destroyEach()
  

}

}


//criando função para gerar zumbis
function enemy(){
if (frameCount%200==0) {
  zombie=createSprite(random(100,1100),random(100,500),40,40)
  zombie.addImage(zombieImg)
  zombie.scale=0.15
  zombie.velocityX=-3
  zombie.debug=true
  zombie.setCollider("rectangle",0,0,400,400)
  zombie.debug=false
  zombie.lifetime=400
  zombieGroup.add(zombie)
}  

}
