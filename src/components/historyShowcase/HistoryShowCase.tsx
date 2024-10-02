import { useRef, useState } from "react";
import { DatePicker } from "./datePicker/DatePicker";
import EventShowcase from "./eventShowcase/EventShowcase";
import type { Date } from "./datePicker/components/Rotator/Rotator";
import styled from "styled-components";
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
export default function HistoryShowCase({ data }: { data: Date[] }) {
	const [currentDate, setCurrentDate] = useState(0);
	const padding = 40;
	return (
		<div
			style={{
				maxWidth: "1440px",
				width: "100%",
				position: "relative",
				display: "grid",
				gridTemplateRows: "1fr 1fr 1fr",
				gridTemplateColumns: "100%",
				// flexDirection: "column",
				alignItems: "center",
				height: "100%",
				justifyContent: "center",
				padding: `0 ${padding}px`,
			}}
			className="transparent-border"
		>
			<VLine className="transparent-line" />
			<HLine className="transparent-line" />
			<div></div>
			<DatePicker
				rotatorRadius={265}
				childRadius={28}
				data={data}
				currentDate={currentDate}
				setCurrentDate={setCurrentDate}
				padding={padding}
			/>
			<EventShowcase data={data} currentDate={currentDate} />
		</div>
	);
}
