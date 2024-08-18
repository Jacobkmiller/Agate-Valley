import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resource.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class Inventory extends GameObject {
  constructor () {
    super({
      position: new Vector2(0, 8)
    });

    this.nextId = 0
    this.items = []

    events.on("HERO_PICKS_UP_ITEM", this, data => {
      this.nextId++
      this.items.push({
        id: this.nextId,
        image: resources.images.rod
      })

      this.renderInventory()
    })

    // draw initial state on start
    this.renderInventory()
  }

  renderInventory () {
    this.children.forEach((child) => {
      child.destroy()
    })

    this.items.forEach((item, index) => {
       const sprite = new Sprite({
        resource: item.image,
        position: new Vector2(index * 12, 0)
      })
      this.addChild(sprite)
    })
  }

  removeFromInventory (id) {
    this.items = this.items.filter(item => item.id !== id)
    this.renderInventory()
  }
}