import { FrameIndexPattern } from "./FrameIndexPattern.js";
import { WALK_DOWN, WALK_RIGHT, WALK_UP, WALK_LEFT } from "./objects/Hero/heroAnimations.js";

export class Animations {
  constructor(patterns) {
    this.patterns = patterns;
    this.activeKey = Object.keys(this.patterns)[1];
  }

  get frame() {
    return this.patterns[this.activeKey].frame;
  }

  play(key, startAtTime = 0) {
    if (this.activeKey === key) {
      return;
    }
    this.activeKey = key;
    this.patterns[this.activeKey].currentTime = startAtTime;
  }

  step(delta) {
    this.patterns[this.activeKey].step(delta);
  }
}