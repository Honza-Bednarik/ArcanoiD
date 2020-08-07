function setup() {
	createCanvas(500, 500);
}
// deklarace proměnných, konkrétní hodnoty se definují ve funkci reset
var xPalka; //počáteční pozice pálky X
var yPalka; //počáteční pozice pálky Y
var xBalonek; //počáteční pozice balonku X
var yBalonek; //počáteční pozice balonku Y
var sirkaPalky; //šířka pálky
var rychlostPalky; //rychlost pákly
var rychlostBalonku; //rychlost balonku
var xRychlostBalonku; //rychlost balonku v ose X
var yRychlostBalonku; //rychlost balonku v ose Y
var velikostBalonku; //velikost balonku
var pocetZivotu; //počet životů/balonků

// proměnné které z nějakých důvodů musí být definováný mimo funkci reset
var hrajem = false; // kontrola zda je hra v běhu
var mys = true; //stav ovládání

//tím že je score při prvotním spuštění nastaveno na -1 zamezím tomu aby se score vypsalo
var score = -1; //počet sestřelených kostek

//úplný nebo častečný reset podle stavu hry
function reset(){
  //pouští se před začátkem každé hry a resetuje proměnné na základní hodnoty
  if (hrajem == false){
    xPalka = 225; //počáteční pozice pálky X
    yPalka = 420; //počáteční pozice pálky Y
    xBalonek = 250; //počáteční pozice balonku X
    yBalonek = 300; //počáteční pozice balonku Y
    sirkaPalky = 80; //šířka pálky
    rychlostPalky = 6; //rychlost pákly
    rychlostBalonku = 3; //rychlost balonku
    xRychlostBalonku = 0; //rychlost balonku v ose X
    yRychlostBalonku = rychlostBalonku; //rychlost balonku v ose Y
    velikostBalonku = 10; //velikost balonku
    pocetZivotu = 3; //počet životů/balonků
    score = 0; //počet sestřelených kostek
  }
  //slouží k resetování rychlosti a pozice balonku (respawn)
  if (hrajem == true){
    xBalonek = 250; //počáteční pozice balonku X
    yBalonek = 300; //počáteční pozice balonku Y
    rychlostBalonku = 2; //rychlost balonku
    xRychlostBalonku = 0; //rychlost balonku v ose X
    yRychlostBalonku = rychlostBalonku; //rychlost balonku v ose Y
    velikostBalonku = 10; //velikost balonku
  }
}


function draw() {
	//vykreslování podle stavu hry
  if (hrajem) {
    scenaHry();
	  ovladani();
    palka();
    balonek();
    info();
  } else {
    scenaMenu()
  }
  //indikátor ovládání myší
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
    reset(); //tady be se asi hodilo udělat nějaké zpoždění mezi smrtí a respawnem
    if (pocetZivotu < 0){hrajem = false}
  }
  //odražení od pálky
  //pokud balonek klesá a je těsně nad pálkou pak... 
  if (yRychlostBalonku > 0 && 
      yBalonek>(yPalka-velikostBalonku) && 
      yBalonek<yPalka && 
      (xBalonek+velikostBalonku)>xPalka && xBalonek<(xPalka+sirkaPalky)){
    //odraz Y 
    yRychlostBalonku= yRychlostBalonku*-1
    //odraz X a získání úhlu v závislostu na tom kterou část pálky trefí
    let uhel = (xPalka+(sirkaPalky/2))-(xBalonek+(velikostBalonku/2))
    xRychlostBalonku = uhel/(sirkaPalky/2);
  }
}
// vypisování score a životů
function info(){
  stroke(255, 0, 255);
  strokeWeight(2);
  fill(255);
  textSize(14);
  text('Zbývá životů: '+pocetZivotu, 10, 470);
  stroke(0, 0, 255);
  text('Sestřeleno kostek: '+score, 10, 490);
}
//ovládání pohybu pálky
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