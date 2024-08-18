import { Animations } from "./src/Animations.js";
import { Camera } from "./src/Camera.js";
import { events } from "./src/Events.js";
import { FrameIndexPattern } from "./src/FrameIndexPattern.js";
import { GameLoop } from "./src/GameLoop.js";
import { GameObject } from "./src/GameObject.js";
import { Input, DOWN, UP, LEFT, RIGHT } from "./src/Input.js";
import { resources } from "./src/Resource.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { gridCells, isSpaceFree } from "./src/helpers/grid.js";
import { moveTowards } from "./src/helpers/moveTowards.js";
import { walls } from "./src/levels/level1.js";
import { Hero } from "./src/objects/Hero/Hero.js";
import { STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./src/objects/Hero/heroAnimations.js";
import { Rod } from "./src/objects/Rod/Rod.js";

console.log("Kat loves Jake:)")

// Grabbing the canvas to draw to
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Establish the root scene
const mainScene = new GameObject({
  position: new Vector2(0,0)
})

// Build up the scene by adding a sky, ground, and hero
const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
})
// mainScene.addChild(skySprite);

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})
mainScene.addChild(groundSprite);


const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero);

const camera = new Camera()
mainScene.addChild(camera)

const rod = new Rod(gridCells(7), gridCells(6))
mainScene.addChild(rod);

// Add an Input class to the main scene
mainScene.input = new Input();

// Establish update and draw loops
const update = (delta) => {
   mainScene.stepEntry(delta, mainScene)
}

const draw = () => {
  // clear anything stale
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)

  skySprite.drawImage(ctx, 0, 0)

  // Save the current state (for camera offset)
  ctx.save();

  // offset everything by camera position
  ctx.translate(camera.position.x, camera.position.y)

  // draw objects in teh mounted scene
  mainScene.draw(ctx, 0, 0);

  // Restore to original state
  ctx.restore();
};

// Start the game
const gameLoop = new GameLoop(update, draw)
gameLoop.start();

// setInterval(() => {
//     draw()
// }, 300)
// draw()