import { Rotator, Date } from "./components/Rotator/Rotator";

export function DatePicker({
	rotatorRadius,
	childRadius,
	data,
	currentDate,
	setCurrentDate,
}: {
	rotatorRadius?: number;
	childRadius?: number;
	data?: Date[];
	currentDate?: number;
	setCurrentDate?: React.Dispatch<React.SetStateAction<number>>;
}) {
	return (
		<Rotator
			rotatorRadius={rotatorRadius}
			childRadius={childRadius}
			dates={data}
			currentDate={currentDate}
			setCurrentDate={setCurrentDate}
		/>
	);
}
