function setup() {
	createCanvas(500, 500);
}

var [xPalka, yPalka] = [225, 420]; //počáteční pozice pálky
var [xBalonek, yBalonek] = [250, 300]; //počáteční pozice balonku
var sirkaPalky = 80; //šířka pálky
var hrajem = false; // kontrola zda je hra v běhu 
var rychlostPalky = 20; //rychlost pákly
var rychlostBalonku = 2; //rychlost balonku
var xRychlostBalonku = 0; //rychlost balonku v ose X
var yRychlostBalonku = rychlostBalonku; //rychlost balonku v ose Y
var velikostBalonku = 10; //velikost balonku
var pocetZivotu = 3; //počet životů/balonků
var score = -1; //počet sestřelených kostek
var mys = true; //stav ovládání

function reset(){
  if (hrajem == false){
    [xPalka, yPalka] = [225, 420]; //počáteční pozice pálky
    [xBalonek, yBalonek] = [250, 300]; //počáteční pozice balonku
    sirkaPalky = 80; //šířka pálky
    hrajem = false; // kontrola zda je hra v běhu 
    rychlostPalky = 6; //rychlost pákly
    rychlostBalonku = 3; //rychlost balonku
    xRychlostBalonku = 0; //rychlost balonku v ose X
    yRychlostBalonku = rychlostBalonku; //rychlost balonku v ose Y
    velikostBalonku = 10; //velikost balonku
    pocetZivotu = 3; //počet životů/balonků
    score = 0; //počet sestřelených kostek
  }
  if (hrajem == true){
    [xBalonek, yBalonek] = [250, 300]; //počáteční pozice balonku
    rychlostBalonku = 2; //rychlost balonku
    xRychlostBalonku = 0; //rychlost balonku v ose X
    yRychlostBalonku = rychlostBalonku; //rychlost balonku v ose Y
    velikostBalonku = 10; //velikost balonku
  }
}


function draw() {
	if (hrajem) {
    scenaHry();
	  ovladani();
    palka();
    balonek();
    info();
  } else {
    scenaMenu()
  }
    if (mys){
      stroke(255,);
      strokeWeight(2);
      fill(0);
      textSize(42);
      text('M', 440, 480);
    }
}
// vykreslování scény
function scenaHry() {
  background(0);
  stroke(255, 0, 255);
  strokeWeight(10);
  line(0, height, 0, 0);
  line(0, 0, width, 0);
  line(width, height, width, 0);
}
//něco jako menu
function scenaMenu() {
  background(0);
  stroke(255, 0, 255);
  strokeWeight(3);
  fill(0, 255, 0);
  textSize(32);
  text('Zmáčkni ENTER pro začátek hry', 10, 100);
  stroke(0, 255, 0);
  strokeWeight(2);
  fill(255);
  textSize(18);
  text('Ovládání mezi šipkamy a myší se přepíná klávasou M', 30, 140);
  if (score>-1){
    stroke(255, 0, 0);
    strokeWeight(2);
    fill(50, 50, 255);
    textSize(42);
    text('Sestřeleno kostek: '+score, 20, 230);
  }
}
// vykreslování pákly
function palka() {
  stroke(255);
  strokeWeight(4);
  fill(0, 255, 0);
  rect(xPalka, yPalka, sirkaPalky, 15);
  //omezení pohybu pálky v ose X před vykreslením
  if (xPalka<0) {xPalka = 0}
  if (xPalka>width-sirkaPalky) {xPalka = width-sirkaPalky}
  xPalka += xRychlostPalky;
}
//vykreslování a pohyb balonku
function balonek(){
  stroke(255, 0, 0);
  strokeWeight(4);
  fill(255);
  rect(xBalonek, yBalonek, velikostBalonku, velikostBalonku); //rozhodl jsem se že balónek bude čtverec
  //pohyb balonku
  xBalonek += xRychlostBalonku;
  yBalonek += yRychlostBalonku;
  //odražení od stěn plátna
  if (xBalonek<0){xRychlostBalonku = xRychlostBalonku*-1}
  if (xBalonek>width-velikostBalonku){xRychlostBalonku = xRychlostBalonku*-1}
  if (yBalonek<0){yRychlostBalonku = yRychlostBalonku*-1}
  //SMRT
  if (yBalonek>height-velikostBalonku){
    pocetZivotu -= 1;
    reset();
    if (pocetZivotu < 0){hrajem = false}
  }
  //odražení od pálky
  if (yBalonek>(yPalka-velikostBalonku) && yBalonek<(yPalka)){
    if ((xBalonek+velikostBalonku)>xPalka && xBalonek<(xPalka+sirkaPalky)){
      //odraz Y
      yRychlostBalonku= yRychlostBalonku*-1
      //odraz X a získání úhlu v závislostu na tom kterou část pálky trefí
      let uhel = (xPalka+(sirkaPalky/2))-(xBalonek+(velikostBalonku/2))
      xRychlostBalonku = uhel/(sirkaPalky/2);
    }
  }
}
function info(){
  stroke(255, 0, 255);
  strokeWeight(2);
  fill(255);
  textSize(14);
  text('Zbývá životů: '+pocetZivotu, 10, 470);
  stroke(0, 0, 255);
  text('Sestřeleno kostek: '+score, 10, 490);
}
function ovladani(){
  xRychlostPalky = 0
  if (mys){
    xPalka=mouseX;
  }
  else{
    //doleva
    if (keyIsDown(37)){
      xRychlostPalky += -rychlostPalky
    }
    //doprava
    if (keyIsDown(39)){
      xRychlostPalky += rychlostPalky
    }
  }
}
//některá tlačítka ovládání
function keyPressed() {
	  switch(keyCode) {
		    case 13: //enter pro nastartování hry
      if (hrajem == false){
        reset();
        hrajem = true;
      }
		break;
		    case 77: //M pro nastavení ovládání na myš
      if (mys == false){
        mys = true;
      }
      else{
        mys = false;
      }
		break;
	}
}