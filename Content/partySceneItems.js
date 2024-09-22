class Stereo {
  constructor(options) {
    // this.storyFlag = config.storyFlag;
    this.songOptions = options;

    this.Songs = {
      "song1": {
        name: "T. Swift, Love Story",
        audioFile: "audio/TSwiftLoveStory.m4a",
        image: "temp",
      },
      "song2": {
        name: "K. Agate, Love Story",
        audioFile: "audio/KAgateLoveStory.m4a",
        image: "temp"
      },
      // "song3": {
      //   name: "T. Swift, Love Story",
      // },
    }

  }
  getOptions(interactionMenuInstance) {
    return this.songOptions.map(id => {
      const base = this.Songs[id];
      return {
        label: base.name,
        // description: base.description,
        handler: () => {
          // playerState.addPizza(id);
          const audio = new Audio(base.audioFile);
          audio.muted = false
          audio.volume = 1.0
          audio.play();
          interactionMenuInstance.close();
        }
      }
    })
  }

}

this.DanaSongs = {
  "song1": {
    name: "T. Swift, Love Story",
    audioFile: "NA",
    image: "temp",
  },
  "song2": {
    name: "K. Agate, Love Story",
    audioFile: "NA",
    image: "temp"
  },
  // "song3": {
  //   name: "T. Swift, Love Story",
  // },
}



window.PizzaTypes = {
  normal: "normal",
  spicy: "spicy",
  veggie: "veggie",
  fungi: "fungi",
  chill: "chill",
}

window.Items = {
  "stereo": {
    name: "",
    description: "Pizza desc here",
    type: PizzaTypes.spicy,
    src: "/images/characters/pizzas/s001.png",
    icon: "/images/icons/spicy.png",
    actions: [ "saucyStatus", "clumsyStatus", "damage1" ],
  },
  "s002": {
    name: "Bacon Brigade",
    description: "A salty warrior who fears nothing",
    type: PizzaTypes.spicy,
    src: "/images/characters/pizzas/s002.png",
    icon: "/images/icons/spicy.png",
    actions: [ "damage1", "saucyStatus", "clumsyStatus" ],
  },
  "v001": {
    name: "Call Me Kale",
    description: "Pizza desc here",
    type: PizzaTypes.veggie,
    src: "/images/characters/pizzas/v001.png",
    icon: "/images/icons/veggie.png",
    actions: [ "damage1" ],
  },
  "v002": {
    name: "Archie Artichoke",
    description: "Pizza desc here",
    type: PizzaTypes.veggie,
    src: "/images/characters/pizzas/v001.png",
    icon: "/images/icons/veggie.png",
    actions: [ "damage1" ],
  },
  "f001": {
    name: "Portobello Express",
    description: "Pizza desc here",
    type: PizzaTypes.fungi,
    src: "/images/characters/pizzas/f001.png",
    icon: "/images/icons/fungi.png",
    actions: [ "damage1" ],
  },
  "f002": {
    name: "Say Shitake",
    description: "Pizza desc here",
    type: PizzaTypes.fungi,
    src: "/images/characters/pizzas/f001.png",
    icon: "/images/icons/fungi.png",
    actions: [ "damage1" ],
  }
}