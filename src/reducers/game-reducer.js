const INITIAL_STATE = {
	lost: false,
	snake1Score: 0,
	highScore: 0,
};

function updateHighScore({ snake1Score, highScore }) {
	return snake1Score > highScore ? snake1Score : highScore;
}

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case "LOSE_GAME":
			return {
				...state,
				lost: true,
				highScore: updateHighScore(state),
			};
		case "NEW_GAME":
			return {
				...state,
				score: 0,
				lost: false,
			};
		case "INCREMENT_SCORE_1":
			return {
				...state,
				score: state.score + 1,
			};
	}

	return state;
}
