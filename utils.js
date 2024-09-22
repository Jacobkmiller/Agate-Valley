const utils = {
  withGrid(n) {
    return n * 16;
  },
  asGridCoord(x,y) {
    return `${x*16},${y*16}`
  },
  nextPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = 16;
    if (direction === "left") { 
      x -= size;
    } else if (direction === "right") {
      x += size;
    } else if (direction === "up") {
      y -= size;
    } else if (direction === "down") {
      y += size;
    }
    return {x,y};
  },
  oppositeDirection(direction) {
    if (direction === "left") { return "right" }
    if (direction === "right") { return "left" }
    if (direction === "up") { return "down" }
    return "up"
  },

  wait(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, ms)
    })
  },

  randomFromArray(array) {
    return array[ Math.floor(Math.random()*array.length) ]
  },

  emitEvent(name, detail) {
    const event = new CustomEvent(name, {
      detail
    });
    document.dispatchEvent(event);
  },

  getWalls(mapName) {
    const data = TileMaps[mapName];

    // Add coords to each layer
    this.addCoordsToAllLayers(data);

    // Find and return collision layer's coords
    const collisionLayer = data.layers.find(layer => layer.name === 'Collisions');
    return collisionLayer ? collisionLayer.coords : null;
  },

  addCoordsToAllLayers(mapObj) {
    mapObj.layers.forEach(layer => {
      layer.coords = this.calculateLayerCoords(layer);
    });
  },

  calculateLayerCoords(layer) {
    const coords = {};

    layer.data.forEach((value, index) => {
      if (value > 0) {
        const x = index % layer.width;
        const y = Math.floor(index / layer.width);
        coords[this.asGridCoord(x, y)] = 1;
      }
    });

    return coords;
  }
  
}