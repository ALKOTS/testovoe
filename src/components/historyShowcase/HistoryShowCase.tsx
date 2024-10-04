import { useState } from "react";
import EventShowcase from "./eventShowcase/EventShowcase";
import { Rotator, type Date } from "./Rotator/Rotator";
import styled from "styled-components";
import "./HistoryShowCase.css";
import { HeaderComponent } from "./Rotator/HeaderComponent/HeaderComponent";
import { Pagination } from "./Rotator/Pagination/Pagination";
const VLine = styled.div`
	width: 1px;
	height: 100%;
	position: absolute;
	left: 50%;
`;

const HLine = styled.div`
	width: 100%;
	height: 1px;
	position: absolute;
	top: 50%;
`;

const HistoryShowCaseContainer = styled.div`
	max-width: 1440px;
	min-width: 1100px;
	max-height: 1080px;
	width: 100%;
	position: relative;
	display: grid;
	grid-template-rows: 1fr 1fr 1fr;
	grid-template-columns: 100%;
	align-items: center;
	height: 100%;
	justify-content: center;
`;

const RotatorContainer = styled.div`
	width: 100%;
	position: relative;
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

export default function HistoryShowCase({ data }: { data: Date[] }) {
	const [currentDate, setCurrentDate] = useState(0);
	const padding = 40;
	const spinTime = 500;
	const fadeTime = 200;
	const rotatorRadius = 265;

	const fromColor = "rgba(93,95,239,1)";
	const toColor = "rgba(239,93,168,1)";

	const updateDate = (date: number) => {
		if (date < 0) {
			date = data.length - 1;
		}
		if (date > data.length - 1) {
			date = 0;
		}
		setCurrentDate(date);
	};

	return (
		<HistoryShowCaseContainer className="transparent-border">
			<VLine className="transparent-line" />
			<HLine className="transparent-line" />
			<div></div>
			<RotatorContainer style={{ height: `${rotatorRadius * 2}px` }}>
				<LeftContainer>
					<HeaderComponent
						fromColor={fromColor}
						toColor={toColor}
						padding={padding}
					/>
					<Pagination
						currentIndex={currentDate}
						updateIndex={setCurrentDate}
						amount={data.length}
						padding={padding}
					/>
				</LeftContainer>
				<Rotator
					rotatorRadius={265}
					childRadius={28}
					dates={data}
					currentDate={currentDate}
					setCurrentDate={updateDate}
					spinTime={spinTime}
					fadeTime={fadeTime}
				/>
			</RotatorContainer>

			<EventShowcase
				data={data[currentDate]}
				currentDate={currentDate}
				spinTime={spinTime}
				fadeTime={fadeTime}
			/>
		</HistoryShowCaseContainer>
	);
}
