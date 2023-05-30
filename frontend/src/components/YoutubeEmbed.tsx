import * as React from "react";
import YouTube, {YouTubeEvent, YouTubeProps} from "react-youtube";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {setVolume} from "../store/volumeSlice";

interface Props {
    videoId: string;
    position: string;
}

const YoutubeEmbed = ({videoId, position}: Props) => {
    const volume = useSelector((state: RootState) => state.volume.value);
    const opts: YouTubeProps["opts"] = {
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    }

    React.useEffect(() => {
        window.postMessage({type: "setVol", payload: volume})
    }, [volume])

    const onPlayerReady: YouTubeProps["onReady"] = (event) => {
        let vol = volume;
        console.log("VOLUME", vol);
        window.addEventListener("message", (e) => {
            if (e.data.type === "setVol") {
                vol = e.data.payload;
                switch (position) {
                    case "left":
                        event.target.setVolume(100 - vol);
                        return;
                    case "right":
                        event.target.setVolume(vol);
                        return;
                }
            }
        });
        event.target.pauseVideo();
    }

    return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
}

export default YoutubeEmbed;
