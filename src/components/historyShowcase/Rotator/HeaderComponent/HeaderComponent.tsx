import { useRef } from "react";
import styled from "styled-components";

const Header = styled.div`
	/* Исторические даты */

	font-style: normal;
	font-weight: 700;
	font-size: 56px;
	line-height: 120%;
	max-width: 385px;
	text-align: start;
`;

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

export function HeaderComponent({
	fromColor,
	toColor,
	padding,
}: {
	fromColor: string;
	toColor: string;
	padding: number;
}) {
	const headerRef = useRef<HTMLDivElement>(null);
	return (
		<HeaderContainer style={{ gap: padding }}>
			<div
				style={{
					height: "100%",
					width: "5px",
					background: `linear-gradient(180deg, ${fromColor}0%, ${toColor} 100%)`,
				}}
			></div>
			<Header ref={headerRef}>Исторические даты</Header>
		</HeaderContainer>
	);
}
