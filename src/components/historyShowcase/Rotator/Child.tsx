import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const SquareComponent = styled("div").withConfig({
	shouldForwardProp: (prop) =>
		!["radius", "childRadius", "rotate", "rotateReverse", "spinTime"].includes(
			prop
		),
})<{
	radius: number;
	childradius: number;
	rotate: number;
	rotatereverse: number;
	spinTime: number;
}>`
	position: absolute;
	z-index: 1;
	-webkit-transition: all ${({ spinTime }) => spinTime / 1000}s linear;
	-moz-transition: all ${({ spinTime }) => spinTime / 1000}s linear;
	transition: all ${({ spinTime }) => spinTime / 1000}s linear;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ childradius }) => childradius}px;
	height: ${({ childradius }) => childradius}px;
	transform: rotate(${({ rotate }) => rotate}deg)
		translate(${({ radius }) => radius}px)
		rotate(${({ rotatereverse }) => rotatereverse}deg);

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

const SquareValue = styled("div").withConfig({
	shouldForwardProp: (prop) =>
		!["fadeTime", "selected", "childRadius", "maincolor"].includes(prop),
})<{
	fadeTime: number;
	selected?: boolean;
	childRadius: number;
	maincolor: string;
}>`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid;
	border-radius: 100%;
	transition: transform ${({ fadeTime }) => fadeTime / 1000}s linear;
	-webkit-user-select: none; /* Safari */
	-ms-user-select: none; /* IE 10 and IE 11 */
	user-select: none;

	background-color: ${({ selected, maincolor }) =>
		selected ? "white" : maincolor};
	transform: scale(
		${({ selected, childRadius }) => (selected ? 1 : 6 / childRadius)}
	);
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
	shouldForwardProp: (prop) => !["fadeTime", "fading"].includes(prop),
})<{ fadeTime: number; fading: boolean }>`
	position: absolute;
	left: 150%;
	/* background: none !important; */
	animation: ${({ fading }) => (fading ? fadeOut : fadeIn)}
		${({ fadeTime }) => fadeTime / 1000}s linear;
	scale: 1 !important;
`;

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

	const [fading, setFading] = useState(false);

	const [timeOut, setTimeOut] = useState<number | undefined>(undefined);

	useEffect(() => {
		if (timeOut) clearTimeout(timeOut);
		let a: number;
		if (selected) {
			a = setTimeout(() => {
				setFading(!selected);
				setShowHint(selected);
			}, spinTime);
		} else {
			setFading(!selected);
			a = setTimeout(() => {
				setShowHint(selected);
			}, fadeTime * 0.99);
		}
		setTimeOut(a);
	}, [selected]);

	return (
		<>
			<SquareComponent
				childradius={css.childRadius * 2}
				radius={css.radius}
				rotate={css.rotate}
				rotatereverse={css.rotateReverse}
				spinTime={spinTime}
				onClick={onClick}
			>
				<SquareValue
					fadeTime={fadeTime}
					selected={selected}
					childRadius={css.childRadius * 2}
					maincolor={"rgb(66, 86, 122)"} //sh
				>
					{num}
				</SquareValue>
				{showHint && (
					<HintText fadeTime={fadeTime} fading={fading}>
						{text}
					</HintText>
				)}
			</SquareComponent>
		</>
	);
}
