export function moveSnake(snake) {
	const direction = snake.direction;
	let coords = snake.coords.slice();
	const headCoords = coords[coords.length - 1];
	const headMap = {
		DOWN: [headCoords[0], headCoords[1] + 1],
		UP: [headCoords[0], headCoords[1] - 1],
		LEFT: [headCoords[0] - 1, headCoords[1]],
		RIGHT: [headCoords[0] + 1, headCoords[1]],
	};
	coords.push(headMap[direction]);
	coords.shift();

	return {
		type: "MOVE_SNAKE_1",
		coords,
	};
}
export function moveSnake2(snake2) {
	const direction2 = snake2.direction2;
	let coords = snake2.coords.slice();
	const headCoords2 = coords[coords.length - 1];
	const headMap2 = {
		DOWN: [headCoords2[0], headCoords2[1] + 1],
		UP: [headCoords2[0], headCoords2[1] - 1],
		LEFT: [headCoords2[0] - 1, headCoords2[1]],
		RIGHT: [headCoords2[0] + 1, headCoords2[1]],
	};
	coords.push(headMap2[direction2]);
	coords.shift();

	return {
		type: "MOVE_SNAKE_2",
		coords,
	};
}

export function setFood(coords) {
	return {
		type: "SET_FOOD",
		food: coords,
	};
}

export function setDirection(direction) {
	return {
		type: "SET_DIRECTION_1",
		direction,
	};
}
export function setDirection2(direction2) {
	return {
		type: "SET_DIRECTION_2",
		direction2,
	};
}

export function prependSnake1(coords) {
	return {
		type: "PREPEND_SNAKE_1",
		coords: coords,
	};
}

export function prependSnake2(coords) {
	return {
		type: "PREPEND_SNAKE_2",
		coords: coords,
	};
}

export function newGame() {
	return {
		type: "NEW_GAME",
	};
}

export function loseGame() {
	return {
		type: "LOSE_GAME",
	};
}

export function incrementScore1() {
	return {
		type: "INCREMENT_SCORE_1",
	};
}

export function incrementScore2() {
	return {
		type: "INCREMENT_SCORE_2",
	};
}
