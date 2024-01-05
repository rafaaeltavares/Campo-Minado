let game;
function setup() {
  createCanvas(600, 600);
  game = new CampoMinado();  
}

function draw() {
    game.update();
    game.render();

}

function mousePressed(){

  game.click(mouseX, mouseY)  
}