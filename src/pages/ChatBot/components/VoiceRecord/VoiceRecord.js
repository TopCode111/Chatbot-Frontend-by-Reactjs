import React from "react";
import RecorderControls from "../recorderControls";
// import RecordingsList from "../recordingsList";
import useRecorder from "../hooks/useRecorder";
import "./styles.css";

const VoiceRecord = () => {
  const { encodedAudio, recorderState, ...handlers } = useRecorder();

  return (
    <>
      <div className="voice-record-content">
        <RecorderControls
          recorderState={recorderState}
          handlers={handlers}
          encodedAudio={encodedAudio}
        />

        {/* <RecordingsList audio={audio} /> */}
      </div>
    </>
  );
};
export default VoiceRecord;
