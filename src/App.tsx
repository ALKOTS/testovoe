import "./App.css";

import "swiper/css";
import "swiper/css/navigation";
import HistoryShowCase from "./components/historyShowcase/HistoryShowCase";

const data = [
	{
		theme: "Кино",
		years: {
			2017: "Release of 'Dunkirk' directed by Christopher Nolan",
			2018: "Oscar winner 'The Shape of Water' directed by Guillermo del Toro",
			2019: "Release of 'Parasite' directed by Bong Joon-ho",
			2020: "Release of 'Tenet' directed by Christopher Nolan",
			2021: "Oscar winner 'Nomadland' directed by Chloé Zhao",
		},
	},
	{
		theme: "Литература",
		years: {
			2017: "Publication of 'The Underground Railroad' by Colson Whitehead",
			2018: "Publication of 'The Overstory' by Richard Powers",
			2019: "Publication of 'The Testaments' by Margaret Atwood",
			2020: "Publication of 'Deacon King Kong' by James McBride",
			2021: "Publication of 'Klara and the Sun' by Kazuo Ishiguro",
		},
	},
	{
		theme: "Живопись",
		years: {
			2017: "Exhibition of 'The Artist's Garden: American Impressionism' at the Philadelphia Museum of Art",
			2018: "The 58th Venice Biennale featuring contemporary artists",
			2019: "Exhibition of 'Yayoi Kusama: Love is Calling' at the David Zwirner Gallery",
			2020: "Virtual exhibitions due to the pandemic showcasing various artists",
			2021: "Exhibition of 'Frida Kahlo: Appearances Can Be Deceiving' at the Brooklyn Museum",
		},
	},
	{
		theme: "Placeholder1",
		years: {
			2017: "placeholder_2017_1",
			2018: "placeholder_2018_1",
			2019: "placeholder_2019_1",
			2020: "placeholder_2020_1",
			2021: "placeholder_2021_1",
		},
	},
	{
		theme: "Placeholder2",
		years: {
			2017: "placeholder_2017_2",
			2018: "placeholder_2018_2",
			2019: "placeholder_2019_2",
			2020: "placeholder_2020_2",
			2021: "placeholder_2021_2",
		},
	},
	{
		theme: "Placeholder3",
		years: {
			2017: "placeholder_2017_3",
			2018: "placeholder_2018_3",
			2019: "placeholder_2019_3",
			2020: "placeholder_2020_3",
			2021: "placeholder_2021_3",
		},
	},
];

function App() {
	return <HistoryShowCase data={data} />;
}

export default App;
