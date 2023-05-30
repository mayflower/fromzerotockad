import * as React from "react";
import YoutubeEmbed from "./components/YoutubeEmbed";
import Slider from "./components/Slider";
import SearchInput from "./components/SearchInput";
import { useDiscoBall } from "../public/discoball";

const App = () => {
	const [leftVideoId, setLeftVideoId] = React.useState("Zzf0FU41qzc");
	const [rightVideoId, setRightVideoId] = React.useState("fXJc2NYwHjw");

	React.useEffect(() => {
		const discoBall = document.getElementById("discoBall");
		useDiscoBall(discoBall);
	});

	return (
		<div className="App">
			<div id="left_frame">
				<div className="inner">
					<YoutubeEmbed position="left" videoId={leftVideoId} />
					<SearchInput setId={setLeftVideoId} />
				</div>
			</div>
			<div id="slider">
				<div id="discoBallLight"></div>
				<div id="discoBall">
					<div id="discoBallMiddle"></div>
				</div>
				<Slider />
			</div>
			<div id="right_frame">
				<div className="inner">
					<YoutubeEmbed position="right" videoId={rightVideoId} />
					<SearchInput setId={setRightVideoId} />
				</div>
			</div>
		</div>
	);
};
export default App;
