import { useEffect, useState } from "react";
import styled from "styled-components";
import { Square } from "./Child";

export interface Date {
	theme: string;
	years: { [key: number]: string };
}

const RotatorComponent = styled.div`
	/* background: orange; */
	align-self: center;
	border-radius: 50%;
	border: 1px solid rgb(217, 221, 230);
	/* margin: 40px auto 40px; */
	position: relative;
`;

const RotatorContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: start;
	position: relative;
`;

const PaginationContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
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

export default function Rotator({
	rotatorRadius = 100,
	childRadius = 10,
	dates = [{ theme: "placeholder", years: { 2024: "placeholder_2024" } }],
	currentDate = 0,
	setCurrentDate = () => {
		console.log("No setter configured");
	},
}: {
	rotatorRadius?: number;
	childRadius?: number;
	dates?: Date[];
	currentDate?: number;
	setCurrentDate?: React.Dispatch<React.SetStateAction<number>>;
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
		if (date < 0) {
			date = dates.length - 1;
		}
		if (date > dates.length - 1) {
			date = 0;
		}

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
		setCurrentDate(date);
	};

	useEffect(() => {
		buildRotator(childCount, rotatorRadius, childRadius, position, setChildren);
	}, [position]);

	return (
		<RotatorContainer>
			<RotatorComponent
				style={{
					width: `${rotatorRadius * 2}px`,
					height: `${rotatorRadius * 2}px`,
				}}
			>
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
								selected={index === currentDate_}
								onClick={() => changeDate(index)}
							/>
						);
					})}
				</div>
			</RotatorComponent>
			<PaginationContainer>
				<div>
					{currentDate_ + 1}/{dates.length}
				</div>
				<ButtonContainer>
					<button
						onClick={() => {
							changeDate(currentDate_ - 1);
						}}
					>
						{"<-"}
					</button>
					<button
						onClick={() => {
							changeDate(currentDate_ + 1);
						}}
					>
						{"->"}
					</button>
				</ButtonContainer>
			</PaginationContainer>
		</RotatorContainer>
	);
}
