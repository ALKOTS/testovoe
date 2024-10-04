import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import { Date } from "../Rotator/Rotator";
import styled, { keyframes } from "styled-components";
import left_arrow from "../../../assets/left_arrow.svg";
import right_arrow from "../../../assets/right_arrow.svg";
import Swiper_t from "swiper";

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
	height: fit-content;
`;

const YearNum = styled.div`
	font-family: "Bebas Neue";
	font-style: normal;
	font-weight: 400;
	line-height: 120%;
	text-transform: uppercase;
	text-align: start;
	color: #3877ee;
`;

const YearText = styled.div`
	font-family: "PT Sans";
	font-style: normal;
	font-weight: 400;
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

function SwiperPc({
	children,
	swiperRef,
	onSlideChange,
	childrenAmount,
}: {
	children: React.ReactNode;
	swiperRef: React.RefObject<SwiperRef>;
	onSlideChange: (swiper: Swiper_t) => void;
	childrenAmount: number;
}) {
	return (
		<Swiper
			modules={[Navigation]}
			slidesPerView={childrenAmount}
			spaceBetween={10}
			pagination={{
				clickable: true,
			}}
			onSlideChange={(swiper: Swiper_t) => onSlideChange(swiper)}
			ref={swiperRef}
		>
			{children}
		</Swiper>
	);
}

function SwiperMobile({
	children,
	swiperRef,
	onSlideChange,
	childrenAmount,
}: {
	children: React.ReactNode;
	swiperRef: React.RefObject<SwiperRef>;
	onSlideChange: (swiper: Swiper_t) => void;
	childrenAmount: number;
}) {
	return (
		<Swiper
			// modules={[Navigation]}
			slidesPerView={childrenAmount}
			spaceBetween={10}
			// pagination={{
			//     clickable: true,
			// }}
			onSlideChange={(swiper: Swiper_t) => onSlideChange(swiper)}
			ref={swiperRef}
		>
			{children}
		</Swiper>
	);
}

export default function EventShowcase({
	data: initialData,
	currentDate,
	padding = 40,
	spinTime = 500,
	fadeTime = 200,
	isMobile = false,
	textSize = 20,
}: {
	data: Date;
	currentDate: number;
	padding?: number;
	spinTime?: number;
	fadeTime?: number;
	isMobile?: boolean;
	textSize?: number;
}) {
	const [pButton, setPButton] = useState(false);
	const [fButton, setFButton] = useState(true);

	const [fading, setFading] = useState(false);
	const [data, setData] = useState(initialData);

	const [timeOut, setTimeOut] = useState<number | undefined>(undefined);

	const [childrenAmount, setChildrenAmount] = useState(1);
	const swiperRef = useRef<SwiperRef>(null);

	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		if (isMobile) {
			setChildrenAmount(1.5);
		} else {
			setChildrenAmount(3);
		}
		setFButton(!isMobile && Object.keys(data.years).length > childrenAmount);
	}, []);

	useEffect(() => {
		if (timeOut) clearTimeout(timeOut);
		setFading(true);

		setTimeout(() => {
			swiperRef.current?.swiper.slideTo(0);
		}, fadeTime);

		const a = setTimeout(() => {
			setData(initialData);
			setFading(false);
		}, spinTime);
		setTimeOut(a);
	}, [currentDate]);

	const swiperChildren = Object.keys(data.years).map(
		(year: string, index: number) => {
			return (
				<SwiperSlide
					key={index}
					style={!isMobile || currentSlide === index ? {} : { opacity: 0.5 }}
				>
					<YearContainer>
						<YearNum style={{ fontSize: textSize + 5 }}>{year}</YearNum>
						<YearText style={{ fontSize: textSize }}>
							{data.years[Number.parseInt(year)]}
						</YearText>
					</YearContainer>
				</SwiperSlide>
			);
		}
	);

	return (
		<ShowCaseContainer fading={fading} fadeTime={fadeTime}>
			{!isMobile && (
				<ScrollButtonContainer padding={padding}>
					{pButton && (
						<ScrollButton onClick={() => swiperRef.current?.swiper.slidePrev()}>
							<img src={left_arrow} alt={"<"} />
						</ScrollButton>
					)}
				</ScrollButtonContainer>
			)}

			{!isMobile ? (
				<SwiperPc
					swiperRef={swiperRef}
					onSlideChange={(swiper) => {
						let showPrevious;
						let showNext;
						if (swiper.isBeginning) {
							showPrevious = false;
							showNext = true;
						} else if (swiper.isEnd) {
							showPrevious = true;
							showNext = false;
						} else {
							showPrevious = true;
							showNext = true;
						}
						setCurrentSlide(swiper.activeIndex);
						setPButton(showPrevious && !isMobile);
						setFButton(showNext && !isMobile);
					}}
					childrenAmount={childrenAmount}
				>
					{swiperChildren}
				</SwiperPc>
			) : (
				<SwiperMobile
					childrenAmount={childrenAmount}
					swiperRef={swiperRef}
					onSlideChange={(swiper) => {
						let showPrevious;
						let showNext;
						if (swiper.isBeginning) {
							showPrevious = false;
							showNext = true;
						} else if (swiper.isEnd) {
							showPrevious = true;
							showNext = false;
						} else {
							showPrevious = true;
							showNext = true;
						}
						setCurrentSlide(swiper.activeIndex);
						setPButton(showPrevious && !isMobile);
						setFButton(showNext && !isMobile);
					}}
				>
					{swiperChildren}
				</SwiperMobile>
			)}

			{!isMobile && (
				<ScrollButtonContainer padding={padding}>
					{fButton && (
						<ScrollButton onClick={() => swiperRef.current?.swiper.slideNext()}>
							<img src={right_arrow} alt={">"} />
						</ScrollButton>
					)}
				</ScrollButtonContainer>
			)}
		</ShowCaseContainer>
	);
}
