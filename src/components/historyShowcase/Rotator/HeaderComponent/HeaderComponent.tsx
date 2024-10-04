import { useRef } from "react";
import styled from "styled-components";

const Header = styled.div`
	/* Исторические даты */

	font-style: normal;
	font-weight: 700;
	/* font-size: 56px; */
	line-height: 120%;
	max-width: 385px;
	text-align: start;
	user-select: none;
`;

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

export function HeaderComponent({
	fromColor,
	toColor,
	padding = 0,
	show_gradient = true,
	style = { fontSize: 56 },
}: {
	fromColor: string;
	toColor: string;
	padding?: number;
	show_gradient?: boolean;
	style?: React.CSSProperties;
}) {
	const headerRef = useRef<HTMLDivElement>(null);
	return (
		<HeaderContainer style={{ gap: padding }}>
			{show_gradient && (
				<div
					style={{
						height: "100%",
						width: "5px",
						background: `linear-gradient(180deg, ${fromColor}0%, ${toColor} 100%)`,
					}}
				></div>
			)}
			<Header style={style} ref={headerRef}>
				Исторические даты
			</Header>
		</HeaderContainer>
	);
}
