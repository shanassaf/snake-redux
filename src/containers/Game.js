import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Styled from "styled-components";
import {
	BOARD_WIDTH,
	BOARD_HEIGHT,
	INITIAL_DIRECTION,
	GAME_SPEED,
} from "../constants";
import Board from "../components/Board";
import Snake from "../components/Snake";
import Food from "../components/Food";
import {
	moveSnake,
	moveSnake2,
	setFood,
	setDirection,
	setDirection2,
	prependSnake1,
	prependSnake2,
	newGame,
	loseGame,
	incrementScore1,
	incrementScore2,
} from "../actions";
import { checkCollision } from "../utils";

const StyledTitle = Styled.div`
text-align: center;
font-size: 25px;
`;
const StyledScore1 = Styled.text`
text-align: left;
font-size: 20px;
`;

const StyledScore2 = Styled.text`
text-align: right;
font-size: 20px;
`;

class Game extends Component {
	constructor() {
		super();

		this.directionOnNextTick = INITIAL_DIRECTION;
		this.direction2OnNextTick = INITIAL_DIRECTION;
		this.checkGameLossSnake1 = this.checkGameLossSnake1.bind(this);
		this.checkGameLossSnake2 = this.checkGameLossSnake2.bind(this);
		this.checkFoodCollision1 = this.checkFoodCollision1.bind(this);
		this.checkFoodCollision2 = this.checkFoodCollision2.bind(this);
	}

	componentWillMount() {
		this.setControls();
		this.generateNewFood();
	}

	componentDidUpdate() {
		this.checkFoodCollision1();
		this.checkFoodCollision2();
		this.checkGameLossSnake1();
		this.checkGameLossSnake2();
	}

	checkGameLossSnake1() {
		const snakeCoords = this.props.snake.coords;
		const snakeCoords2 = this.props.snake2.coords;
		const snakeHeadCoords = snakeCoords[snakeCoords.length - 1];

		// if you collide w a wall or yourself
		if (
			!this.props.game.lost &&
			(snakeHeadCoords[0] === -1 ||
				snakeHeadCoords[0] === BOARD_WIDTH ||
				snakeHeadCoords[1] === -1 ||
				snakeHeadCoords[1] === BOARD_HEIGHT ||
				checkCollision(snakeHeadCoords, snakeCoords.slice(0, -1)) ||
				checkCollision(snakeHeadCoords, snakeCoords2.slice(0, -1)))
		) {
			clearInterval(this.snakeInterval);
			this.props.loseGame();
			return <h2>Player 2 Wins!</h2>;
		}
	}
	checkGameLossSnake2() {
		const snakeCoords = this.props.snake2.coords;
		const snakeCoords2 = this.props.snake.coords;
		const snakeHeadCoords = snakeCoords[snakeCoords.length - 1];

		// if you collide w a wall or yourself
		if (
			!this.props.game.lost &&
			(snakeHeadCoords[0] === -1 ||
				snakeHeadCoords[0] === BOARD_WIDTH ||
				snakeHeadCoords[1] === -1 ||
				snakeHeadCoords[1] === BOARD_HEIGHT ||
				checkCollision(snakeHeadCoords, snakeCoords.slice(0, -1)) ||
				checkCollision(snakeHeadCoords, snakeCoords2.slice(0, -1)))
		) {
			clearInterval(this.snakeInterval);
			this.props.loseGame();
			return <h2>Player 1 Wins!</h2>;
		}
	}

	checkFoodCollision1() {
		const snakeCoords = this.props.snake.coords;
		const snakeHeadCoords = snakeCoords[snakeCoords.length - 1];
		const foodCoords = this.props.food;

		// if it ate a piece of food
		if (
			snakeHeadCoords[0] === foodCoords[0] &&
			snakeHeadCoords[1] === foodCoords[1]
		) {
			this.generateNewFood();
			this.props.incrementScore1();
			this.props.prependSnake1(snakeCoords[snakeCoords.length - 1].slice());
		}
	}

	checkFoodCollision2() {
		const snakeCoords = this.props.snake2.coords;
		const snakeHeadCoords = snakeCoords[snakeCoords.length - 1];
		const foodCoords = this.props.food;

		// if it ate a piece of food
		if (
			snakeHeadCoords[0] === foodCoords[0] &&
			snakeHeadCoords[1] === foodCoords[1]
		) {
			this.generateNewFood();
			this.props.incrementScore2();
			this.props.prependSnake2(snakeCoords[snakeCoords.length - 1].slice());
		}
	}

	generateNewFood() {
		const x = Math.floor(Math.random() * BOARD_WIDTH);
		const y = Math.floor(Math.random() * BOARD_HEIGHT);
		if (checkCollision([x, y], this.props.snake.coords)) this.generateNewFood();
		this.props.setFood([x, y]);
	}

	setControls() {
		document.addEventListener("keydown", e => {
			const coords = this.props.snake.coords;
			const x = coords[coords.length - 1][0];
			const y = coords[coords.length - 1][1];

			// const coords2 = this.props.snake2.coords;
			// const m = coords2[coords.length - 1][0];
			// const n = coords2[coords.length - 1][1];

			switch (e.keyCode) {
				case 65: // A key
					if (this.props.snake2.direction2 !== "RIGHT" && x !== 0)
						this.direction2OnNextTick = "LEFT";
					break;

				case 37: // left arrow
					// make sure we're not trying to move into the snake's body
					// or move outside the boundaries
					if (this.props.snake.direction !== "RIGHT" && x !== 0)
						this.directionOnNextTick = "LEFT";
					break;
				case 68: // D key
					if (this.props.snake2.direction2 !== "LEFT" && x !== BOARD_WIDTH - 1)
						this.direction2OnNextTick = "RIGHT";
					break;
				case 39: // right arrow
					if (this.props.snake.direction !== "LEFT" && x !== BOARD_WIDTH - 1)
						this.directionOnNextTick = "RIGHT";
					break;
				case 83: // S key
					if (this.props.snake2.direction2 !== "UP" && y !== BOARD_HEIGHT - 1)
						this.direction2OnNextTick = "DOWN";
					break;
				case 40: // down arrow
					if (this.props.snake.direction !== "UP" && y !== BOARD_HEIGHT - 1)
						this.directionOnNextTick = "DOWN";
					break;
				case 87: // W key
					if (this.props.snake2.direction2 !== "DOWN" && y !== 0)
						this.direction2OnNextTick = "UP";
					break;
				case 38: // up arrow
					if (this.props.snake.direction !== "DOWN" && y !== 0)
						this.directionOnNextTick = "UP";
					break;
				case 32: // space
					if (this.props.game.lost) return false;
					clearInterval(this.snakeInterval);
					this.snakeInterval = setInterval(() => {
						this.props.setDirection(this.directionOnNextTick);
						this.props.setDirection2(this.direction2OnNextTick);
						this.props.moveSnake(this.props.snake);
						this.props.moveSnake2(this.props.snake2);
					}, GAME_SPEED);

					break;
				case 13:
					if (this.props.game.lost) {
						this.props.newGame();
						this.generateNewFood();
						clearInterval(this.snakeInterval);
						this.directionOnNextTick = "DOWN";
					}
			}
		});
	}

	render() {
		return (
			<div>
				<StyledTitle>Multi-player Snake Game</StyledTitle>
				<div>
					<StyledScore1 className="score1">
						Player 1 Score: {this.props.game.snake1Score} &nbsp; &nbsp; &nbsp;
						&nbsp;
					</StyledScore1>
					<StyledScore2 className="score2">
						Player 2 Score: {this.props.game.snake2Score}
					</StyledScore2>
				</div>
				<h3 className="score">Highest Score: {this.props.game.highScore}</h3>
				<div className="board-wrapper">
					<Board />
					<Snake
						coords={this.props.snake.coords}
						lost={this.props.game.lost}
						snakeColour={this.props.snake.colour}
					/>
					<Snake
						coords={this.props.snake2.coords}
						lost={this.props.game.lost}
						snakeColour={this.props.snake2.colour}
					/>
					<Food coords={this.props.food} />
					{this.props.game.lost && (
						<div onKeyPress={this.resetGame} className="reset">
							<h3>Hit enter to RESET!</h3>
						</div>
					)}
				</div>
				<p className="help">Press spacebar to begin!</p>
			</div>
		);
	}
}

function mapStateToProps(props) {
	return props;
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			moveSnake,
			moveSnake2,
			setFood,
			setDirection,
			setDirection2,
			prependSnake1,
			prependSnake2,
			newGame,
			loseGame,
			incrementScore1,
			incrementScore2,
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game);
