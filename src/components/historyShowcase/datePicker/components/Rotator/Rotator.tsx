import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Square } from "./Child";
import right_arrow from "../../../../../assets/right_arrow.svg";
import left_arrow from "../../../../../assets/left_arrow.svg";
import AnimatedCounter from "../AnimatedCounter/AnimatedCounter";
// import { AnimatedCounter } from "react-animated-counter";

export interface Date {
	theme: string;
	years: { [key: number]: string };
}

const RotatorComponent = styled.div`
	/* background: orange; */
	align-self: center;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const RotatorContainer = styled.div`
	width: 100%;
	/* display: flex; */
	/* flex-direction: row; */
	/* align-items: center; */
	position: relative;
	/* justify-content: center; */
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
`;
const LeftContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	align-items: start;
	position: relative;
	justify-content: space-between;
`;

const PaginationContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 120px;
	height: 90px;
	justify-content: space-between;
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const PaginationButton = styled.button`
	background: none;
	border: 1px solid;
	border-radius: 100%;
	color: inherit;
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		background: white;
	}
`;

const Header = styled.div`
	/* Исторические даты */

	font-style: normal;
	font-weight: 700;
	font-size: 56px;
	line-height: 120%;
	max-width: 385px;
	text-align: start;
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

const HeaderContainer = styled.div`
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

export function Rotator({
	rotatorRadius = 100,
	childRadius = 10,
	dates = [{ theme: "placeholder", years: { 2024: "placeholder_2024" } }],
	currentDate = 0,
	setCurrentDate = () => {
		console.log("No setter configured");
	},
	padding = 40,
}: {
	rotatorRadius?: number;
	childRadius?: number;
	dates?: Date[];
	currentDate?: number;
	setCurrentDate?: React.Dispatch<React.SetStateAction<number>>;
	padding?: number;
}) {
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
	console.log(dates[currentDate_]);

	const headerRef = useRef<HTMLDivElement>(null);
	return (
		<RotatorContainer style={{ height: `${rotatorRadius * 2}px` }}>
			<LeftContainer>
				<HeaderContainer>
					<div
						style={{
							position: "absolute",
							left: `-${padding}px`,
							height: `${headerRef.current?.offsetHeight}px`,
							width: "5px",
							background:
								"linear-gradient(180deg, rgba(93,95,239,1) 0%, rgba(239,93,168,1) 100%)",
						}}
					></div>
					<Header ref={headerRef}>Исторические даты</Header>
				</HeaderContainer>

				<PaginationContainer>
					<div style={{ fontSize: "18px", alignSelf: "flex-start" }}>
						{currentDate_ > 10 ? currentDate_ + 1 : `0${currentDate_ + 1}`}/
						{dates.length > 10 ? dates.length : `0${dates.length}`}
					</div>
					<ButtonContainer>
						<PaginationButton
							onClick={() => {
								changeDate(currentDate_ - 1);
							}}
						>
							<img src={left_arrow} alt="left arrow" />
						</PaginationButton>
						<PaginationButton
							onClick={() => {
								changeDate(currentDate_ + 1);
							}}
						>
							<img src={right_arrow} alt="right arrow" />
						</PaginationButton>
					</ButtonContainer>
				</PaginationContainer>
			</LeftContainer>

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
						style={{ ...animStyle, ...{ color: "rgb(93,95,239)" } }}
						targetNumber={Number.parseInt(
							Object.keys(dates[currentDate_].years)[0]
						)}
					/>
					<AnimatedCounter
						style={{ ...animStyle, ...{ color: "rgb(239,93,168)" } }}
						targetNumber={Number.parseInt(
							Object.keys(dates[currentDate_].years).slice(-1)[0]
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
								selected={index === currentDate_}
								text={dates[index].theme}
								onClick={() => changeDate(index)}
							/>
						);
					})}
				</div>
			</RotatorComponent>
		</RotatorContainer>
	);
}
