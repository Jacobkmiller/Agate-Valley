class InteractiveObject extends GameObject {
    constructor(config) {
      super(config);
      this.sprite = new Sprite({
        gameObject: this,
        src: config.src,
        animations: config.animations || {
          "used-down"   : [ [0,0] ],
          // "unused-down" : [ [1,0] ],
        },
        currentAnimation: config.currentAnimation || "used-down",
      });
      this.objectType = config.objectType
      this.storyFlag = config.storyFlag;
      this.interactiveObjectClass = config.interactiveObjectClass;
      this.talking = config.talking || this.interactiveObjectClass.talking || [
        {
          events: [
            { type: "textMessage", text: "Choose an option..." },
            // { type: "interactionMenu", options: this.interactiveObjectClass.getOptions() },
            { type: "interactionMenu", optionsList: config.options, interactiveObjectInstance: this.interactiveObjectClass },
            { type: "addStoryFlag", flag: this.storyFlag },
          ]
        }
      ];
    }
    update() {
    //  this.sprite.currentAnimation = playerState.storyFlags[this.storyFlag]
    //   ? "used-down"
    //   : "unused-down";
    }
  
  }