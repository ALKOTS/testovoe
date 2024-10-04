import right_arrow from "../../../../assets/right_arrow.svg";
import left_arrow from "../../../../assets/left_arrow.svg";
import styled from "styled-components";

const PaginationContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 120px;
	height: 90px;
	justify-content: space-between;
	gap: 30px;
`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const PaginationButton = styled.button`
	background: none;
	border: 1px solid;
	border-radius: 100%;
	color: inherit;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		background: white;
	}
`;

export function Pagination({
	currentIndex,
	updateIndex,
	amount,
	padding = 40,
	size = 50,
	font = 18,
}: {
	currentIndex: number;
	updateIndex: (index: number) => void;
	amount: number;
	padding?: number;
	size?: number;
	font?: number;
}) {
	return (
		<PaginationContainer style={{ paddingLeft: padding }}>
			<div style={{ fontSize: `${font}px`, alignSelf: "flex-start" }}>
				{currentIndex > 10 ? currentIndex + 1 : `0${currentIndex + 1}`}/
				{amount > 10 ? amount : `0${amount}`}
			</div>
			<ButtonContainer>
				<PaginationButton
					style={{ width: size, height: size }}
					onClick={() => {
						updateIndex(currentIndex - 1);
					}}
				>
					<img src={left_arrow} alt="<" />
				</PaginationButton>
				<PaginationButton
					style={{ width: size, height: size }}
					onClick={() => {
						updateIndex(currentIndex + 1);
					}}
				>
					<img src={right_arrow} alt=">" />
				</PaginationButton>
			</ButtonContainer>
		</PaginationContainer>
	);
}
