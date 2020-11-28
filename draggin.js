/* global PIXI */

const app = new PIXI.Application({
  width: 600,
  height: 300,
  backgroundColor: 0xfcba03,
  resolution: window.devicePixelRatio || 1
});
document.body.appendChild(app.view);

// create a container within the app
const container = new PIXI.Container();
app.stage.addChild(container);

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

// all textures
const allTexture = PIXI.Texture.from(
  "https://cdn.glitch.com/5da5e65a-198a-4cfa-9061-abc145efcaf0%2Fdress%20up%20clone%20clone.png?v=1606358621147"
);
let allTextures = unpackTextures(allTexture, 42, 96, 7);

// make boots somewhere
for (let i = 0; i <= 37; i++) {
  var boots = [];
  boots[i] = new PIXI.Sprite(allTextures[i]);
  let current = boots[i];
  container.addChild(current);

  if (i < 11) {
    current.x = i * 55;
    current.y = 3;
  } else if (i < 20 && i > 10) {
    current.x = (i - 10) * 48;
    current.y = 99;
  } else {
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

  // functions for dragging movements
  function pointerMove(event) {
    if (dragging) {
      current.x = mouseposition.x;
      current.y = mouseposition.y;
      current.alpha = 0.5;
      container.removeChild(current);
      container.addChild(current);
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
  }
}
