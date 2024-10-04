import React, { useEffect, useState } from "react";
import { Square } from "./Child";

// import { AnimatedCounter } from "react-animated-counter";

export interface Date {
	theme: string;
	years: { [key: number]: string };
}

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
	);
}
