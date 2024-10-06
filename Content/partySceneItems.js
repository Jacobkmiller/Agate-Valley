class Stereo {
  constructor(options) {
    // this.storyFlag = config.storyFlag;
    this.songOptions = options;
    this.storyFlag = "";

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
      // interactionMenuInstance.interactiveObjectClassInstance.setStoryFlag(this.storyFlag)
      return {
        label: base.name,
        // description: base.description,
        handler: () => {
          if (id == "song1") {
            this.storyFlag = "PLAYED_TSWIFT_LOVE_STORY"
          }
          else {
            this.storyFlag = "NOT_T_SWIFT"
          }
          // interactionMenuInstance.interactiveObjectClassInstance.setStoryFlag(this.storyFlag)
          // playerState.addStoryFlag(this.storyFlag)
          // playerState.addPizza(id);
          const audio = new Audio(base.audioFile);
          audio.muted = false
          audio.volume = 1.0
          audio.play();
          interactionMenuInstance.close();
          window.playerState.storyFlags[this.storyFlag] = true;
          if (!("TSWIFT_NOT_COMPLETED" in window.playerState.storyFlags)) {
            window.playerState.storyFlags["TSWIFT_NOT_COMPLETED"] = true;
          }
          window.playerState.newStoryFlags = true;
        }
      }
    })
  }

}

// Could be combined with the Stereo class, but alas, work for another day
class TV {
  constructor(options) {
    // this.storyFlag = config.storyFlag;
    this.showOptions = options;
    this.storyFlag = "";

    this.Shows = {
      "show1": {
        name: "Happy Endings",
        audioFile: "audio/TSwiftLoveStory.m4a",
        image: "temp",
      },
      "show2": {
        name: "Gilmore Girls",
        audioFile: "audio/TSwiftLoveStory.m4a",
        image: "temp"
      },
      "show3": {
        name: "Riverdale",
        audioFile: "audio/TSwiftLoveStory.m4a",
        image: "temp"
      },
      
      // "song3": {
      //   name: "T. Swift, Love Story",
      // },
    }

  }
  getOptions(interactionMenuInstance) {
    return this.showOptions.map(id => {
      const base = this.Shows[id];
      // interactionMenuInstance.interactiveObjectClassInstance.setStoryFlag(this.storyFlag)
      return {
        label: base.name,
        // description: base.description,
        handler: () => {
          if (id == "show1") {
            this.storyFlag = "PLAYED_HAPPY_ENDINGS"
          }
          else {
            this.storyFlag = "NOT_HAPPY_ENDINGS"
          }
          // interactionMenuInstance.interactiveObjectClassInstance.setStoryFlag(this.storyFlag)
          // playerState.addStoryFlag(this.storyFlag)
          // playerState.addPizza(id);
          const audio = new Audio(base.audioFile);
          audio.muted = false
          audio.volume = 1.0
          audio.play();
          interactionMenuInstance.close();
          window.playerState.storyFlags[this.storyFlag] = true;
          // window.playerState.storyFlags["TSWIFT_NOT_COMPLETED"] = true;
          window.playerState.newStoryFlags = false;
          // utils.emitEventNoId("NewFlagAdded", {
          // })
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
