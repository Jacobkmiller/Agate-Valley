import { Animations } from "./src/Animations.js";
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
mainScene.addChild(skySprite);

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})
mainScene.addChild(groundSprite);


const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero);

// Add an Input class to the main scene
mainScene.input = new Input();

// Establish update and draw loops
const update = (delta) => {
   mainScene.stepEntry(delta, mainScene)
}

const draw = () => {

  mainScene.draw(ctx, 0, 0);
};

// Start the game
const gameLoop = new GameLoop(update, draw)
gameLoop.start();

// setInterval(() => {
//     draw()
// }, 300)
// draw()