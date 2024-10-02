import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface AnimatedCounterProps {
	targetNumber: number;
	animationDuration?: number;
	style?: { [key: string]: string };
}

function AnimatedCounter({
	targetNumber,
	animationDuration = 0.3,
	style,
}: AnimatedCounterProps) {
	const countRef = useRef<HTMLHeadingElement | null>(null);

	const [currentNumber, setCurrentNumber] = useState(targetNumber);

	useEffect(() => {
		const duration = animationDuration;
		const start = currentNumber;

		if (countRef.current) {
			gsap.fromTo(
				countRef.current,
				{ innerText: start },
				{
					innerText: targetNumber,
					duration: duration,
					snap: { innerText: 1 },
					onUpdate: () => {
						if (countRef.current) {
							countRef.current.innerText = Math.floor(
								Number(countRef.current.innerText)
							).toString();
						}
					},
				}
			);
		}
		setCurrentNumber(targetNumber);
	}, [targetNumber]);

	return (
		<div style={style} ref={countRef}>
			{currentNumber}
		</div>
	);
}

export default AnimatedCounter;
