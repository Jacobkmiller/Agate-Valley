class InteractionMenu {
  constructor({ optionsList, interactiveObjectInstance, interactiveObjectClassInstance, onComplete}) {
    this.optionsList = optionsList;
    this.onComplete = onComplete;
    this.interactiveObjectInstance = interactiveObjectInstance;
    this.interactiveObjectClassInstance = interactiveObjectClassInstance;
  }

  getOptions() {
    const options = [];
    for (let id of this.optionsList) {
      const base = Stereo.Songs[id];
      options.push({
        label: base.name,
        description: base.description,
        handler: () => {
          // playerState.addPizza(id);
          this.close();
        }
      });
    }
    return options;
  }
  

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("InteractionMenu");
    this.element.classList.add("overlayMenu");
    this.element.innerHTML = (`
      <h2>Select an Option</h2>
    `)
  }

  close() {
    this.keyboardMenu.end();
    this.element.remove();
    this.onComplete();
  }


  init(container) {
    this.createElement();
    this.keyboardMenu = new KeyboardMenu({
      descriptionContainer: container
    })
    this.keyboardMenu.init(this.element)
    // finalOptions = this.getOptions()
    this.keyboardMenu.setOptions(this.interactiveObjectInstance.getOptions(this))

    container.appendChild(this.element);
  }
}