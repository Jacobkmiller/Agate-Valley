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

const heroPos = new Vector2(16 * 5, 16 * 5)

const draw = () => {
    console.log('telling sky to draw')
   skySprite.drawImage(ctx, 0, 0);
   console.log('telling ground to draw')
   groundSprite.drawImage(ctx, 0, 0);

   hero.drawImage(ctx, heroPos.x, heroPos.y)
}


setInterval(() => {
    draw()
}, 300)
draw()