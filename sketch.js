var dog, dogIng, dogImg1, database, foodS, foodStock;


function preload(){
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function seup(){
  createCanvas(500, 500);
  database = firebase.database();
  foodStock.on("value",readStock);
  foodStock.set(20);
  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
}

function draw(){
  background("green");
  if(foodS!==undefined){
    textSize(20);
    fill(255);
    text("Note: Press Up Arrow to feed Vicky Milk",50,50);
    text("Food Remaining",+foodS,150,150);

    if (keyWentDown(Up_ARROW)){
      writeStock(foodS);
      dog.addImage(dogImg1);
    }

    if(keyWentUp(Up_ARROW)){
      dog.addImage(dogImg);
    }

    if(foodS===0){
      foodS = 20;
    }

    drawSprites();
  }

}

function writeStock(x)
{
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    food:x
  });


}

function readStock(data){
  foodS = data.val();
}


