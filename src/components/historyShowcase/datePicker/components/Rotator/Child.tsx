import React from "react";
import styled, { keyframes } from "styled-components";

const SquareComponent = styled("div").withConfig({
	shouldForwardProp: (prop) =>
		!["radius", "childRadius", "rotate", "rotateReverse", "maincolor"].includes(
			prop
		),
})<{
	radius: number;
	childradius: string;
	rotate: number;
	rotatereverse: number;
	selected?: boolean;
	maincolor: string;
}>((props) => ({
	position: "absolute",
	zIndex: 1,
	"-webkit-transition": "all 0.5s linear",
	"-moz-transition": " all 0.5s linear",
	transition: "transform 0.5s linear",
	left: "0",
	display: "flex",
	"justify-content": "center",
	"align-items": "center",
	width: props.childradius,
	height: props.childradius,
	transform: `rotate(${props.rotate}deg) translate(${props.radius}px) rotate(${props.rotatereverse}deg) `,
	"&>*": {
		backgroundColor: `${props.selected ? "white" : props.maincolor}`,
		transform: `scale(${
			props.selected ? 1 : 6 / parseFloat(props.childradius)
		})`,
	},
	"&:hover": {
		"&>*": {
			transform: "scale(1)",
			backgroundColor: "white",
		},
		cursor: "pointer",
		transform: `rotate(${props.rotate}deg) translate(${props.radius}px) rotate(${props.rotatereverse}deg)`,
	},
}));

const SquareValue = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid;
	border-radius: 100%;
	transition: transform 0.3s linear;
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const HintText = styled.div`
	position: absolute;
	left: 150%;
	background: none;
	animation: ${fadeIn} 0.5s linear;
`;

export function Square({
	css,
	num,
	onClick,
	selected,
	text,
}: {
	css: {
		rotate: number;
		rotateReverse: number;
		radius: number;
		childRadius: number;
	};
	num: number;
	onClick: React.MouseEventHandler<HTMLDivElement>;
	selected?: boolean;
	text: string;
}) {
	return (
		<>
			<SquareComponent
				childradius={`${css.childRadius * 2}px`}
				radius={css.radius}
				rotate={css.rotate}
				rotatereverse={css.rotateReverse}
				selected={selected}
				maincolor={"rgb(66, 86, 122)"} //sh
				onClick={onClick}
			>
				<SquareValue>{num}</SquareValue>
				{selected && <HintText>{text}</HintText>}
			</SquareComponent>
		</>
	);
}
