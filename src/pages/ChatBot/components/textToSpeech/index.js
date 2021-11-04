import React, { useState } from "react";
import "./styles.css";

const TextToSpeech = ({ audio }) => {
  const [speechStatus, setSpeechStatus] = useState(false);

  const toggleAudio = () => {
    var speech = document.getElementById("audio");
    if (speech.paused) {
      setSpeechStatus(!speechStatus);
      speech.play();
    } else {
      setSpeechStatus(!speechStatus);
      speech.pause();
    }
    speech.addEventListener("ended", () => {
      setSpeechStatus(false);
    });
  };
  return (
    <div className="text-speech">
      <audio src={audio} id="audio" />
      <i
        className={speechStatus && audio ? "fas fa-pause" : "fas fa-play"}
        style={{ fontSize: "1rem" }}
        onClick={toggleAudio}
      />
    </div>
  );
};
export default TextToSpeech;
