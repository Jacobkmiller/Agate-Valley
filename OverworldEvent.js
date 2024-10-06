class OverworldEvent {
  constructor({ map, event}) {
    this.map = map;
    this.event = event;
  }

  stand(resolve) {
    const who = this.map.gameObjects[ this.event.who ];

    who.startBehavior({
      map: this.map
    }, {
      type: "stand",
      direction: this.event.direction,
      time: this.event.time
    })
    
    //Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }
    }
    document.addEventListener("PersonStandComplete", completeHandler)
  }

  walk(resolve) {
    const who = this.map.gameObjects[ this.event.who ];

    who.startBehavior({
      map: this.map
    }, {
      type: "walk",
      direction: this.event.direction,
      retry: true
    })

    //Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    }
    document.addEventListener("PersonWalkingComplete", completeHandler)

  }

  textMessage(resolve) {

    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
    }

    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve()
    })
    message.init( document.querySelector(".game-container") )
  }

  changeMap(resolve) {

    //Stop all Person things
    Object.values(this.map.gameObjects).forEach(obj => {
      obj.isMounted = false;
    })

    const sceneTransition = new SceneTransition();
    sceneTransition.init(document.querySelector(".game-container"), () => {
      this.map.overworld.startMap( window.OverworldMaps[this.event.map], {
        x: this.event.x,
        y: this.event.y,
        direction: this.event.direction,
      });
      resolve();
      sceneTransition.fadeOut();
    })
  }

  battle(resolve) {
    const battle = new Battle({
      enemy: Enemies[this.event.enemyId],
      arena: this.event.arena || null,
      onComplete: (didWin) => {
        resolve(didWin ? "WON_BATTLE" : "LOST_BATTLE");
      }
    })
    battle.init(document.querySelector(".game-container"));

  }

  pause(resolve) {
    this.map.isPaused = true;
    const menu = new PauseMenu({
      progress: this.map.overworld.progress,
      onComplete: () => {
        resolve();
        this.map.isPaused = false;
        this.map.overworld.startGameLoop();
      }
    });
    menu.init(document.querySelector(".game-container"));
  }

  // This is used when the new flag added should trigger a cutscene
  newFlagCutscene(resolve) {
    // const who = this.map.gameObjects[ this.event.who ];

    // who.startBehavior({
    //   map: this.map
    // }, {
    //   type: "stand",
    //   direction: this.event.direction,
    //   time: this.event.time
    // })
    const completeHandler = e => {
      // if (this.event.flag.length > 0) {
        // window.playerState.storyFlags[this.event.flag] = true;
        // console.log(this.event.flag)
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("NewFlagAdded", completeHandler);
        resolve();
      }
    }
    document.addEventListener("NewFlagAdded", completeHandler)
  }

  addStoryFlag(resolve) {
    if (this.event.flag.length > 0) {
      window.playerState.storyFlags[this.event.flag] = true;
      // this.map.checkForFootstepCutscene()
    }
    resolve();
  }

  // This probably shouldn't be an OverworlEvent. Will change this later
  updateBehaviorLoops(resolve) {
    const newBehaviorsMap = this.event.newBehaviors
    Object.keys(newBehaviorsMap).forEach((key) => {
      const value = newBehaviorsMap[key];
      const who = this.map.gameObjects[ key ];
      who.setNewBehaviorLoop(value)
    });
    resolve();
  }

  markCutsceneCompleted(resolve) {
    if (this.event.flag.length > 0) {
      window.playerState.storyFlags[this.event.flag] = false;
      // this.map.checkForFootstepCutscene()
    }
    resolve();
  }

  // addedStoryFlag(resolve) {
  //   if (this.map.isCutscenePlaying) {
  //     this.map.eventQueue
  //   }
  //   utils.emitEvent("NewFlagAdded", {
  //   })
  //   resolve();
  // }

  craftingMenu(resolve) {
    const menu = new CraftingMenu({
      pizzas: this.event.pizzas,
      onComplete: () => {
        resolve();
      }
    })
    menu.init(document.querySelector(".game-container"))
  }

  interactionMenu(resolve) {
    const menu = new InteractionMenu({
      optionsList: this.event.optionsList,
      interactiveObjectInstance: this.event.interactiveObjectInstance,
      interactiveObjectClassInstance: this.event.interactiveObjectClassInstance,
      onComplete: () => {
        resolve();
      }
    })
    menu.init(document.querySelector(".game-container"))
  }

  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve)      
    })
  }

}