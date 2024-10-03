import { useState } from "react";
import EventShowcase from "./eventShowcase/EventShowcase";
import { Rotator, type Date } from "./Rotator/Rotator";
import styled from "styled-components";
import "./HistoryShowCase.css";
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

export default function HistoryShowCase({ data }: { data: Date[] }) {
	const [currentDate, setCurrentDate] = useState(0);
	const padding = 40;
	const spinTime = 500;
	const fadeTime = 200;
	return (
		<HistoryShowCaseContainer className="transparent-border">
			<VLine className="transparent-line" />
			<HLine className="transparent-line" />
			<div></div>
			<Rotator
				rotatorRadius={265}
				childRadius={28}
				dates={data}
				currentDate={currentDate}
				setCurrentDate={setCurrentDate}
				padding={padding}
				spinTime={spinTime}
				fadeTime={fadeTime}
			/>
			<EventShowcase
				data={data[currentDate]}
				currentDate={currentDate}
				spinTime={spinTime}
				fadeTime={fadeTime}
			/>
		</HistoryShowCaseContainer>
	);
}
