import { useState } from "react";
import DatePicker from "./datePicker/DatePicker";
import EventShowcase from "./eventShowcase/EventShowcase";
import type { Date } from "./datePicker/components/Rotator/Rotator";

export default function HistoryShowCase({ data }: { data: Date[] }) {
	const [currentDate, setCurrentDate] = useState(0);
	return (
		<>
			<DatePicker
				rotatorRadius={265}
				childRadius={28}
				data={data}
				currentDate={currentDate}
				setCurrentDate={setCurrentDate}
			/>
			<EventShowcase />
		</>
	);
}
