import { combineReducers } from "redux";
import snakeReducer from "./snake-reducer";
import snake2Reducer from "./snake2-reducer";
import foodReducer from "./food-reducer";
import gameReducer from "./game-reducer";

const rootReducer = combineReducers({
	snake: snakeReducer,
	snake2: snake2Reducer,
	food: foodReducer,
	game: gameReducer,
});

export default rootReducer;
