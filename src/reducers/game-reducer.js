const INITIAL_STATE = {
  lost: false,
  score: 0,
  highScore: 0
};

function updateHighScore({ score, highScore }) {
  return score > highScore ? score : highScore;
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOSE_GAME":
      return {
        ...state,
        lost: true,
        highScore: updateHighScore(state)
      };
    case "NEW_GAME":
      return {
        ...state,
        score: 0,
        lost: false
      };
    case "INCREMENT_SCORE":
      return {
        ...state,
        score: state.score + 1
      };
  }

  return state;
}
