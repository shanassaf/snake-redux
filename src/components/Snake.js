import React from "react";
import { SQUARE_SIZE } from "../constants";

export default function(props) {
	return (
		<div>
			{props.coords.map((coords, index) => {
				const style = {
					left: coords[0] * SQUARE_SIZE + "px",
					top: coords[1] * SQUARE_SIZE + "px",
					background: props.lost ? "red" : props.snakeColour,
				};
				return <div className="snake" style={style} key={index} />;
			})}
		</div>
	);
}
