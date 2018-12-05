const INITIAL_STATE = {
	lost: false,
	snake1Score: 0,
	snake2Score: 0,
	highScore: 0,
};

function updateHighScore({ snake1Score, snake2Score, highScore }) {
	if (snake1Score > snake2Score && snake1Score > highScore) return snake1Score;
	else if (snake2Score > snake1Score && snake2Score > highScore)
		return snake2Score;
	else return highScore;
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
				snake1Score: 0,
				snake2Score: 0,
				lost: false,
			};
		case "INCREMENT_SCORE_1":
			return {
				...state,
				snake1Score: state.snake1Score + 1,
			};
		case "INCREMENT_SCORE_2":
			return {
				...state,
				snake2Score: state.snake2Score + 1,
			};
	}

	return state;
}
