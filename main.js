import { GameLoop } from "./src/GameLoop.js";
import { Input, DOWN, UP, LEFT, RIGHT } from "./src/Input.js";
import { resources } from "./src/Resource.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";

console.log("Kat loves Jake:)")

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
})

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})

const hero = new Sprite({
    resource: resources.images.hero,
    frameSize: new Vector2(32, 32),
    hFrames:3,
    vFrames: 8,
    frame: 1
})

const shadow = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32, 32)
})

const heroPos = new Vector2(16 * 6, 16 * 5)
const input = new Input();

const update = () => {
    // Updating entities in the game 
    // hero.frame += 1
    if (input.direction === DOWN) {
        heroPos.y += 1;
        hero.frame = 0;
    }
    if (input.direction === UP) {
        heroPos.y -= 1;
        hero.frame = 6;
    }
    if (input.direction === LEFT) {
        heroPos.x -= 1;
        hero.frame = 9;
    }
    if (input.direction === RIGHT) {
        heroPos.x += 1;
        hero.frame = 3;
    }
}

const draw = () => {
   skySprite.drawImage(ctx, 0, 0);
   groundSprite.drawImage(ctx, 0, 0);

   // Center the hero in cell
   const heroOffset = new Vector2(-8, -21);
   const heroPosX = heroPos.x + heroOffset.x;
   const heroPosY = heroPos.y + 1 + heroOffset.y;

   shadow.drawImage(ctx, heroPosX, heroPosY);
   hero.drawImage(ctx, heroPosX, heroPosY);
}

const gameLoop = new GameLoop(update, draw)
gameLoop.start();

// setInterval(() => {
//     draw()
// }, 300)
// draw()