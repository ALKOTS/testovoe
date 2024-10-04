import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Square } from "./Child";
import AnimatedCounter from "./AnimatedCounter/AnimatedCounter";

// import { AnimatedCounter } from "react-animated-counter";

export interface Date {
	theme: string;
	years: { [key: number]: string };
}

const RotatorComponent = styled.div`
	align-self: center;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const YearsShowcase = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	/* width: 100%; */
	z-index: 1;
	gap: 100px;
	position: absolute;
`;

interface Child {
	radius: number;
	rotate: number;
	rotateReverse: number;
	childRadius: number;
}

function buildRotator(
	childCount: number,
	rotatorRadius: number,
	childRadius: number,
	childPosition: number,
	setChildren: React.Dispatch<React.SetStateAction<Child[]>>
) {
	const spacing = 1;
	const slice = (360 * spacing) / childCount;

	const items = [];
	for (let i = 0; i < childCount; i++) {
		const rotate = slice * i + childPosition;
		const rotateReverse = rotate * -1;

		items.push({
			radius: rotatorRadius,
			rotate: rotate,
			rotateReverse: rotateReverse,
			childRadius: childRadius,
		});
	}
	setChildren(items);
}

export function Rotator({
	rotatorRadius = 100,
	childRadius = 10,
	dates = [{ theme: "placeholder", years: { 2024: "placeholder_2024" } }],
	currentDate = 0,
	setCurrentDate = () => {
		console.log("No setter configured");
	},
	spinTime = 500,
	fadeTime = 200,
}: {
	rotatorRadius?: number;
	childRadius?: number;
	dates?: Date[];
	currentDate?: number;
	setCurrentDate?: (date: number) => void; //React.Dispatch<React.SetStateAction<number>>;
	spinTime?: number;
	fadeTime?: number;
}) {
	const fromColor = "rgba(93,95,239,1)";
	const toColor = "rgba(239,93,168,1)";
	const animStyle = {
		fontWeight: "700",
		lineHeight: "160px",
		textAlign: "center",
		letterSpacing: "-0.02em",
		fontSize: "200px",
	};
	const childCount = dates.length;
	const childOffset = rotatorRadius - childRadius;

	const [currentDate_, setCurrentDate_] = useState(currentDate);

	const [position, setPosition] = useState(
		-360 /
			((childCount - 2) % 4 > 0 && (childCount - 2) % 4 <= 2
				? childCount * 2
				: childCount)
	); //squares shift on rotator, deg
	const [children, setChildren] = useState<Child[]>([]);

	const changeDate = (date: number) => {
		const clockwiseDistance =
			(date - currentDate_ + dates.length) % dates.length;
		const counterClockwiseDistance =
			(currentDate_ - date + dates.length) % dates.length;

		let new_pos;
		//pml
		if (clockwiseDistance < counterClockwiseDistance) {
			new_pos = position - clockwiseDistance * (360 / childCount);
		} else {
			new_pos = position + counterClockwiseDistance * (360 / childCount);
		}

		setPosition(new_pos);
		setCurrentDate_(date);
		// setCurrentDate(date);
	};

	useEffect(() => {
		buildRotator(childCount, rotatorRadius, childRadius, position, setChildren);
	}, [position]);

	useEffect(() => {
		changeDate(currentDate);
	}, [currentDate]);

	return (
		<RotatorComponent
			style={{
				width: `${rotatorRadius * 2}px`,
				height: `${rotatorRadius * 2}px`,
				position: "absolute",
				left: `calc(50% - ${rotatorRadius}px)`,
			}}
			className="transparent-border"
		>
			<YearsShowcase>
				<AnimatedCounter
					style={{ ...animStyle, ...{ color: `${fromColor}` } }}
					targetNumber={Number.parseInt(
						Object.keys(dates[currentDate].years)[0]
					)}
				/>
				<AnimatedCounter
					style={{ ...animStyle, ...{ color: `${toColor}` } }}
					targetNumber={Number.parseInt(
						Object.keys(dates[currentDate].years).slice(-1)[0]
					)}
				/>
			</YearsShowcase>
			<div
				style={{
					position: "absolute",
					top: `${childOffset}px`,
					left: `${childOffset}px`,
				}}
			>
				{children.map(function (value, index) {
					return (
						<Square
							key={index}
							css={value}
							num={index + 1}
							selected={index === currentDate}
							text={dates[index].theme}
							onClick={() => setCurrentDate(index)}
							spinTime={spinTime}
							fadeTime={fadeTime}
						/>
					);
				})}
			</div>
		</RotatorComponent>
	);
}
