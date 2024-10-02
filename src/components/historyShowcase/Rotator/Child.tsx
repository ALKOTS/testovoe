import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const SquareComponent = styled("div").withConfig({
	shouldForwardProp: (prop) =>
		!["radius", "childRadius", "rotate", "rotateReverse", "maincolor"].includes(
			prop
		),
})<{
	radius: number;
	childradius: number;
	rotate: number;
	rotatereverse: number;
	selected?: boolean;
	maincolor: string;
}>`
	position: absolute;
	z-index: 1;
	-webkit-transition: all 0.5s linear;
	-moz-transition: all 0.5s linear;
	transition: all 0.5s linear;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ childradius }) => childradius}px;
	height: ${({ childradius }) => childradius}px;
	transform: rotate(${({ rotate }) => rotate}deg)
		translate(${({ radius }) => radius}px)
		rotate(${({ rotatereverse }) => rotatereverse}deg);
	> * {
		background-color: ${({ selected, maincolor }) =>
			selected ? "white" : maincolor};
		transform: scale(
			${({ selected, childradius }) => (selected ? 1 : 6 / childradius)}
		);
		// opacity: props.selected ? 1 : 0,
	}
	&:hover {
		> * {
			transform: scale(1);
			background-color: white;
		}
		cursor: pointer;
		transform: rotate(${({ rotate }) => rotate}deg)
			translate(${({ radius }) => radius}px)
			rotate(${({ rotatereverse }) => rotatereverse}deg);
	}
`;

const SquareValue = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid;
	border-radius: 100%;
	transition: transform 0.3s linear;
	-webkit-user-select: none; /* Safari */
	-ms-user-select: none; /* IE 10 and IE 11 */
	user-select: none;
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
    
`;

const HintText = styled("div").withConfig({
	shouldForwardProp: (prop) => !["fadeTime"].includes(prop),
})<{ fadeTime: number }>`
	position: absolute;
	left: 150%;
	background: none !important;
	animation: ${({ fadeTime }) => fadeIn} ${({ fadeTime }) => fadeTime / 1000}s
		linear;
`;

// const HintText = styled.div`
// 	position: absolute;
// 	left: 150%;
// 	background: none !important;
// 	animation: ${fadeIn} 0.2s linear;
// `;

export function Square({
	css,
	num,
	onClick,
	selected = false,
	text,
	spinTime = 500,
	fadeTime = 200,
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
	spinTime?: number;
	fadeTime?: number;
}) {
	const [showHint, setShowHint] = useState(false);

	useEffect(() => {
		// setTimeout(() => {
		setShowHint(selected);
		// }, 500);
	}, [selected]);

	return (
		<>
			<SquareComponent
				childradius={css.childRadius * 2}
				radius={css.radius}
				rotate={css.rotate}
				rotatereverse={css.rotateReverse}
				selected={selected}
				maincolor={"rgb(66, 86, 122)"} //sh
				onClick={onClick}
			>
				<SquareValue>{num}</SquareValue>
				{showHint && <HintText fadeTime={fadeTime}>{text}</HintText>}
			</SquareComponent>
		</>
	);
}
