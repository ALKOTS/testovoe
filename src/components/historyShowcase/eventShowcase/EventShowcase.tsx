import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import { Date } from "../Rotator/Rotator";
import styled, { keyframes } from "styled-components";
import left_arrow from "../../../assets/left_arrow.svg";
import right_arrow from "../../../assets/right_arrow.svg";

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const fadeOut = keyframes`
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
`;

const ShowCaseContainer = styled("div").withConfig({
	shouldForwardProp: (prop) => !["fading", "fadeTime"].includes(prop),
})<{ fading: boolean; fadeTime: number }>`
	display: flex;
	flex-direction: row;
	overflow: hidden;
	animation: ${({ fading }) => (fading ? fadeOut : fadeIn)}
		${({ fadeTime }) => fadeTime / 1000}s linear;
	opacity: ${({ fading }) => (fading ? 0 : 1)};
`;

const YearNum = styled.div`
	font-family: "Bebas Neue";
	font-style: normal;
	font-weight: 400;
	font-size: 25px;
	line-height: 120%;
	/* identical to box height, or 30px */
	text-transform: uppercase;
	text-align: start;
	/* синий */
	color: #3877ee;
`;

const YearText = styled.div`
	font-family: "PT Sans";
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	line-height: 30px;
	text-align: start;
	/* or 150% */

	/* Black blue */
	color: #42567a;
`;

const YearContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	max-width: 320px;

	/* padding: 0 40px; */
`;

const ScrollButtonContainer = styled("div").withConfig({
	shouldForwardProp: (prop) => !["padding"].includes(prop),
})<{ padding: number }>`
	width: ${({ padding }) => padding * 2}px;
	height: ${({ padding }) => padding * 2}px;
	display: flex;
	justify-content: center;
	flex: none;
`;

const ScrollButton = styled.div`
	flex: none;
	height: 40px;
	width: 40px;
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: white;
	&:hover {
		cursor: pointer;
	}
	-webkit-user-select: none; /* Safari */
	-ms-user-select: none; /* IE 10 and IE 11 */
	user-select: none;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

export default function EventShowcase({
	data: initialData,
	currentDate,
	padding = 40,
	spinTime = 500,
	fadeTime = 200,
}: {
	data: Date;
	currentDate: number;
	padding?: number;
	spinTime?: number;
	fadeTime?: number;
}) {
	const [pButton, setPButton] = useState(false);
	const [fButton, setFButton] = useState(true);

	const [fading, setFading] = useState(false);
	const [data, setData] = useState(initialData);

	const [timeOut, setTimeOut] = useState<number | undefined>(undefined);

	useEffect(() => {
		if (timeOut) clearTimeout(timeOut);
		setFading(true);

		setTimeout(() => {
			swpiperRef.current?.swiper.slideTo(0);
		}, fadeTime);

		const a = setTimeout(() => {
			setData(initialData);
			setFading(false);
		}, spinTime);
		setTimeOut(a);
	}, [currentDate]);

	// console.log(data);
	const swpiperRef = useRef<SwiperRef>(null);
	return (
		<ShowCaseContainer fading={fading} fadeTime={fadeTime}>
			<ScrollButtonContainer padding={padding}>
				{pButton && (
					<ScrollButton onClick={() => swpiperRef.current?.swiper.slidePrev()}>
						<img src={left_arrow} alt={"<"} />
					</ScrollButton>
				)}
			</ScrollButtonContainer>

			<Swiper
				modules={[Navigation]}
				slidesPerView={3}
				// navigation
				spaceBetween={10}
				pagination={{
					clickable: true,
				}}
				onSlideChange={(swiper) => {
					if (swiper.isBeginning) {
						setPButton(false);
						setFButton(true);
					} else if (swiper.isEnd) {
						setPButton(true);
						setFButton(false);
					} else {
						setPButton(true);
						setFButton(true);
					}
					// setCurrentDate(swiper.activeIndex);
				}}
				ref={swpiperRef}
			>
				{Object.keys(data.years).map((year: string, index: number) => {
					return (
						<SwiperSlide key={index}>
							<YearContainer>
								<YearNum>{year}</YearNum>
								<YearText>{data.years[Number.parseInt(year)]}</YearText>
							</YearContainer>
						</SwiperSlide>
					);
				})}
			</Swiper>
			<ScrollButtonContainer padding={padding}>
				{fButton && (
					<ScrollButton onClick={() => swpiperRef.current?.swiper.slideNext()}>
						<img src={right_arrow} alt={">"} />
					</ScrollButton>
				)}
			</ScrollButtonContainer>
		</ShowCaseContainer>
	);
}
