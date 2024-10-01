import "./App.css";

import "swiper/css";
import "swiper/css/navigation";
import HistoryShowCase from "./components/historyShowcase/HistoryShowCase";

const data = [
	{
		theme: "Кино",
		years: {
			1980: "Release of 'Raging Bull' directed by Martin Scorsese",
			1994: "Release of 'Pulp Fiction' directed by Quentin Tarantino",
			2017: "Release of 'Dunkirk' directed by Christopher Nolan",
			2018: "Oscar winner 'The Shape of Water' directed by Guillermo del Toro",
			2019: "Release of 'Parasite' directed by Bong Joon-ho",
			2021: "Oscar winner 'Nomadland' directed by Chloé Zhao",
		},
	},
	{
		theme: "Литература",
		years: {
			1984: "Publication of 'Neuromancer' by William Gibson",
			1997: "Publication of 'Harry Potter and the Philosopher's Stone' by J.K. Rowling",
			2019: "Publication of 'The Testaments' by Margaret Atwood",
			2020: "Publication of 'Deacon King Kong' by James McBride",
			2021: "Publication of 'Klara and the Sun' by Kazuo Ishiguro",
			2027: "Publication of 'The Overstory' by Richard Powers",
		},
	},
	{
		theme: "Живопись",
		years: {
			1985: "Exhibition of 'The Great American Nude' at the Whitney Museum",
			1990: "Exhibition of 'Van Gogh: The Life' at the National Gallery",
			2017: "Exhibition of 'The Artist's Garden: American Impressionism' at the Philadelphia Museum of Art",
			2018: "The 58th Venice Biennale featuring contemporary artists",
			2019: "Exhibition of 'Yayoi Kusama: Love is Calling' at the David Zwirner Gallery",
			2020: "Virtual exhibitions due to the pandemic showcasing various artists",
		},
	},
	{
		theme: "Placeholder1",
		years: {
			1980: "placeholder_1980_1",
			1990: "placeholder_1990_1",
			2017: "placeholder_2017_1",
			2019: "placeholder_2019_1",
			2020: "placeholder_2020_1",
			2021: "placeholder_2021_1",
		},
	},
	{
		theme: "Placeholder2",
		years: {
			1985: "placeholder_1985_2",
			1995: "placeholder_1995_2",
			2017: "placeholder_2017_2",
			2018: "placeholder_2018_2",
			2019: "placeholder_2019_2",
			2021: "placeholder_2021_2",
		},
	},
	{
		theme: "Placeholder3",
		years: {
			1990: "placeholder_1990_3",
			1998: "placeholder_1998_3",
			2017: "placeholder_2017_3",
			2018: "placeholder_2018_3",
			2019: "placeholder_2019_3",
			2020: "placeholder_2020_3",
		},
	},
];

function App() {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
			}}
		>
			<HistoryShowCase data={data} />
		</div>
	);
}

export default App;
