import { useState } from "react";
import EventShowcase from "./eventShowcase/EventShowcase";
import { Rotator, type Date } from "./Rotator/Rotator";
import styled from "styled-components";
import "./HistoryShowCase.css";
import { HeaderComponent } from "./Rotator/HeaderComponent/HeaderComponent";
import { Pagination } from "./Rotator/Pagination/Pagination";
import AnimatedCounter from "./Rotator/AnimatedCounter/AnimatedCounter";
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

const YearsShowcase = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	/* width: 100%; */
	z-index: 1;
	gap: 100px;
	position: absolute;
`;

const YearsShowcase_mobile = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	width: 100%;
	/* z-index: 1; */
	/* gap: 100px;
	position: absolute; */
`;

const RotatorComponent = styled.div`
	align-self: center;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const HistoryShowCaseContainer_mobile = styled("div").withConfig({
	shouldForwardProp: (prop) => !["padding"].includes(prop),
})<{ padding: number }>`
	/* display: flex;
	flex-direction: column;
	align-items: start; */
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-rows: 1fr 1fr;

	> * {
		margin: ${({ padding }) => padding}px ${({ padding }) => padding / 2}px;
	}
	/* justify-content: space-between; */
`;

export default function HistoryShowCase({
	data,
	isLargeScreen,
}: {
	data: Date[];
	isLargeScreen: boolean;
}) {
	const [currentDate, setCurrentDate] = useState(0);
	const padding = 40;
	const spinTime = 500;
	const fadeTime = 200;
	const rotatorRadius = 265;

	const fromColor = "rgba(93,95,239,1)";
	const toColor = "rgba(239,93,168,1)";

	const animStyle = {
		fontWeight: "700",
		// lineHeight: "160px",
		textAlign: "center",
		letterSpacing: "-0.02em",
		fontSize: "200px",
	};

	const updateDate = (date: number) => {
		if (date < 0) {
			date = data.length - 1;
		}
		if (date > data.length - 1) {
			date = 0;
		}
		console.log(`From ${currentDate + 1} to ${date + 1}`);
		setCurrentDate(date);
	};

	if (isLargeScreen)
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
							updateIndex={updateDate}
							amount={data.length}
							padding={padding}
						/>
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
								style={{ ...animStyle, ...{ color: `${fromColor}` } }}
								targetNumber={Number.parseInt(
									Object.keys(data[currentDate].years)[0]
								)}
							/>
							<AnimatedCounter
								style={{ ...animStyle, ...{ color: `${toColor}` } }}
								targetNumber={Number.parseInt(
									Object.keys(data[currentDate].years).slice(-1)[0]
								)}
							/>
						</YearsShowcase>
						<Rotator
							rotatorRadius={265}
							childRadius={28}
							dates={data}
							currentDate={currentDate}
							setCurrentDate={updateDate}
							spinTime={spinTime}
							fadeTime={fadeTime}
						/>
					</RotatorComponent>
				</RotatorContainer>

				<EventShowcase
					data={data[currentDate]}
					currentDate={currentDate}
					spinTime={spinTime}
					fadeTime={fadeTime}
				/>
			</HistoryShowCaseContainer>
		);
	return (
		<HistoryShowCaseContainer_mobile padding={padding}>
			<div
				className="transparent-border-bottom"
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-evenly",
				}}
			>
				<HeaderComponent
					fromColor={fromColor}
					toColor={toColor}
					style={{ fontSize: 20, maxWidth: 123 }}
					show_gradient={false}
				/>
				<YearsShowcase_mobile>
					<AnimatedCounter
						style={{
							...animStyle,
							...{ color: `${fromColor}`, fontSize: "56px" },
						}}
						targetNumber={Number.parseInt(
							Object.keys(data[currentDate].years)[0]
						)}
					/>
					<AnimatedCounter
						style={{
							...animStyle,
							...{ color: `${toColor}`, fontSize: "56px" },
						}}
						targetNumber={Number.parseInt(
							Object.keys(data[currentDate].years).slice(-1)[0]
						)}
					/>
				</YearsShowcase_mobile>
			</div>
			<div>
				<Pagination
					currentIndex={currentDate}
					updateIndex={updateDate}
					amount={data.length}
					padding={padding}
				/>
			</div>
		</HistoryShowCaseContainer_mobile>
	);
}
