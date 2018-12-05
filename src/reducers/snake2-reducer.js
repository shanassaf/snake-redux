import { BOARD_WIDTH, BOARD_HEIGHT, INITIAL_DIRECTION } from "../constants";

const INITIAL_STATE2 = {
	colour: "orange",
	direction2: INITIAL_DIRECTION,
	coords: [
		[Math.floor(BOARD_WIDTH / 4), 0],
		[Math.floor(BOARD_WIDTH / 4), 1],
		[Math.floor(BOARD_WIDTH / 4), 2],
	],
};

export default function(state = INITIAL_STATE2, action) {
	switch (action.type) {
		case "MOVE_SNAKE_2":
			return {
				...state,
				coords: action.coords,
			};

		case "SET_DIRECTION_2":
			return {
				...state,
				direction2: action.direction2,
			};

		case "PREPEND_SNAKE_2":
			return {
				...state,
				coords: [[action.coords], ...state.coords],
			};

		case "NEW_GAME":
			return INITIAL_STATE2;
	}

	return state;
}
