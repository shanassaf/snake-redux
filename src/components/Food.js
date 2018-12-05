import React from "react";
import { SQUARE_SIZE } from "../constants";
import strawberry from "../components/strawberry.png";

export default function(props) {
	let style = {
		left: props.coords[0] * SQUARE_SIZE + "px",
		top: props.coords[1] * SQUARE_SIZE + "px",
		width: "20px",
		height: "20px",
	};

	return (
		<div className="food" style={style}>
			<img src={strawberry} alt="food" style={style} />
		</div>
	);
}
