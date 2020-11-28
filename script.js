/* global PIXI */

const app = new PIXI.Application({
  width: 400,
  height: 125,
  backgroundColor: 0xfcba03,
  resolution: window.devicePixelRatio || 1
});
document.body.appendChild(app.view);

// create a container within the app
const container = new PIXI.Container();
app.stage.addChild(container);

// create a container for the person
const person = new PIXI.Container();
app.stage.addChild(person);

// other
const other = new PIXI.Container();
app.stage.addChild(other);

// clothes
const clothes = new PIXI.Container();
app.stage.addChild(clothes);

// makin it crisp
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

// make a function for dividing textures into sprites
function unpackTextures(originalFile, imageAmount, tileSize, width) {
  let tileTextures = [];
  for (let i = 0; i < imageAmount; i++) {
    let x = i % (imageAmount / width);
    let y = Math.floor(i / (imageAmount / width));
    tileTextures[i] = new PIXI.Texture(
      originalFile,
      new PIXI.Rectangle(x * tileSize, y * tileSize, tileSize, tileSize)
    );
  }
  return tileTextures;
}

// make body
const allTexture = PIXI.Texture.from(
  "https://cdn.glitch.com/5da5e65a-198a-4cfa-9061-abc145efcaf0%2Fdress%20up%20clone%20clone.png?v=1606358621147"
);
let allTextures = unpackTextures(allTexture, 42, 96, 7);
let body = new PIXI.Sprite(allTextures[0]);
person.addChild(body);
person.x = 14;
person.y = 14;

// all textures
const current1 = new PIXI.Sprite(allTextures[0]);
person.addChild(current1);
current1.x = 0;
current1.y = 0;
current1.pivot.set(0, 0);

// button textures
const buttonTexture = PIXI.Texture.from(
  "https://cdn.glitch.com/f050458c-f7f1-413a-9df2-d063d33373e3%2Fbuttons.png?v=1606438032117"
);
let buttonTextures = unpackTextures(buttonTexture, 6, 32, 3);

// place arrows
let leftUp = new PIXI.Sprite(buttonTextures[5]);
other.addChild(leftUp);
leftUp.x = person.x - 20;
leftUp.y = person.y + 24;

let leftDown = new PIXI.Sprite(buttonTextures[5]);
other.addChild(leftDown);
leftDown.x = person.x - 20;
leftDown.y = person.y + 64;

let rightUp = new PIXI.Sprite(buttonTextures[4]);
other.addChild(rightUp);
rightUp.x = person.x + 20 + 64;
rightUp.y = person.y + 24;

let rightDown = new PIXI.Sprite(buttonTextures[4]);
other.addChild(rightDown);
rightDown.x = person.x + 84;
rightDown.y = person.y + 64;

let arrows = [leftUp, leftDown, rightUp, rightDown];

// make the buttons do their magic ;-)
for (const i of arrows) {
  i.buttonMode = true;
  i.interactive = true;
}

rightUp.on("pointerdown", pressrightUp);
leftUp.on("pointerdown", pressleftUp);

let currentShirt = 0;
function pressrightUp(event) {
  currentShirt += 1;
  if (currentShirt > 36) {
    currentShirt = 0;
  }
  current1.texture = allTextures[currentShirt];
}
function pressleftUp(event) {
  currentShirt -= 1;
  if (currentShirt < 0) {
    currentShirt = 36;
  }
  current1.texture = allTextures[currentShirt];
}

// make draggables
/*for (let i = 5; i <= 37; i++) {
  var boots = [];
  boots[i] = new PIXI.Sprite(allTextures[i]);
  let current = boots[i];
  other.addChild(current);

  if (i < 11 && i > 0) {
    current.x = i * 45 + 50;
    current.y = 3;
  } else if (i < 20 && i > 10) {
    current.x = (i - 10) * 48;
    current.y = 101;
  } else if (i >= 20) {
    current.x = (i - 20.7) * 35;
    current.y = 96 + 96 + 6;
  }

  current.buttonMode = true;

  // get mouse position
  const mouseposition = app.renderer.plugins.interaction.mouse.global;

  // make events
  current.interactive = true;
  current.on("pointerdown", pointerDown);
  window.addEventListener("pointerup", pointerUp);
  //current.on("pointerup", pointerUp);
  current.on("pointermove", pointerMove);

  // initially dragging isn't happening
  let dragging = false;

  //if it gets close, click on
  function add() {
    if (
      current.x < person.x + 96 &&
      current.x > person.x &&
      current.y < person.y + 96 &&
      current.y > person.y
    ) {
      other.removeChild(current);
      person.addChild(current);
      current.x = 0;
      current.y = 0;
      current.pivot.set(0, 0);
    }
  }

  // functions for dragging movements
  function pointerMove(event) {
    if (dragging) {
      current.x = mouseposition.x;
      current.y = mouseposition.y;
      current.alpha = 0.5;
      other.removeChild(current);
      other.addChild(current);
    }
  }

  function pointerDown(event) {
    if (dragging == false) {
      this.data = event.data;

      //store this variable for convenience
      let position = this.data.getLocalPosition(this);

      // Set the pivot point to the new position
      this.pivot.set(position.x, position.y);

      dragging = true;
      pointerMove(event);
    }
  }

  function pointerUp(event) {
    dragging = false;
    current.alpha = 1;
    add();
  }
}
*/
