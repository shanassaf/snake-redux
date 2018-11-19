export function moveSnake(snake) {
  const direction = snake.direction;
  let coords = snake.coords.slice();
  const headCoords = coords[coords.length - 1];
  const headMap = {
    DOWN: [headCoords[0], headCoords[1] + 1],
    UP: [headCoords[0], headCoords[1] - 1],
    LEFT: [headCoords[0] - 1, headCoords[1]],
    RIGHT: [headCoords[0] + 1, headCoords[1]]
  };
  coords.push(headMap[direction]);
  coords.shift();

  return {
    type: "MOVE_SNAKE",
    coords
  };
}

export function setFood(coords) {
  return {
    type: "SET_FOOD",
    food: coords
  };
}

export function setDirection(direction) {
  return {
    type: "SET_DIRECTION",
    direction
  };
}

export function prependSnake(coords) {
  return {
    type: "PREPEND_SNAKE",
    coords: coords
  };
}

export function newGame() {
  return {
    type: "NEW_GAME"
  };
}

export function loseGame() {
  return {
    type: "LOSE_GAME"
  };
}

export function incrementScore() {
  return {
    type: "INCREMENT_SCORE"
  };
}
