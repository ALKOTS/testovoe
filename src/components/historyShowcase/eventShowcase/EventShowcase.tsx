import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import reactLogo from "../../../assets/react.svg";
import viteLogo from "/vite.svg";
import { Navigation } from "swiper/modules";
export default function EventShowcase() {
	const [count, setCount] = useState(0);
	return (
		<Swiper
			modules={[Navigation]}
			slidesPerView={1}
			navigation
			spaceBetween={10}
			pagination={{
				clickable: true,
			}}
			// preventInteractionOnTransition={true}
			// allowTouchMove={false}
			// noSwiping={true}
			onSlideChange={() => {
				setCount(count + 1);
			}}
		>
			<SwiperSlide>
				<img src={reactLogo} alt="React logo" />
			</SwiperSlide>
			<SwiperSlide>
				<img src={viteLogo} alt="Vite logo" />
			</SwiperSlide>
		</Swiper>
	);
}
