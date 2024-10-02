import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import reactLogo from "../../../assets/react.svg";
import viteLogo from "/vite.svg";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import { Date } from "../datePicker/components/Rotator/Rotator";
export default function EventShowcase({
	data,
	currentDate,
}: {
	data: Date[];
	currentDate: number;
}) {
	// const [count, setCount] = useState(0);
	console.log(data);
	return (
		<div style={{ overflow: "hidden" }}>
			<Swiper
				modules={[Navigation]}
				slidesPerView={3}
				navigation
				spaceBetween={10}
				pagination={{
					clickable: true,
				}}
				// preventInteractionOnTransition={true}
				// allowTouchMove={false}
				// noSwiping={true}
				// onSlideChange={() => {
				// 	setCount(count + 1);
				// }}
			>
				{Object.keys(data[currentDate].years).map(
					(year: string, index: number) => {
						return (
							<SwiperSlide key={index}>
								<div>{year}</div>
								<div>{data[currentDate].years[Number.parseInt(year)]}</div>
							</SwiperSlide>
						);
					}
				)}
			</Swiper>
		</div>
	);
}
