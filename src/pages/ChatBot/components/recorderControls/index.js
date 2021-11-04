import React, { useEffect, useState } from "react";
import { formatMinutes, formatSeconds } from "../utils/format-time";
import { interceptor } from "../../../../utils/interceptor";
import LocalStorageService from "../../../../utils/localStorageService";
import "./styles.css";

const localStorageService = LocalStorageService.getService();
const axiosInstance = interceptor();
const token = localStorageService.getAccessToken();
const RecorderControls = ({ recorderState, handlers, encodedAudio }) => {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;
  const [cancelRec, setCancelRec] = useState(false);

  useEffect(() => {
    handleSaveVoice();
  }, [encodedAudio]);

  const handleSaveVoice = () => {
    setCancelRec(true);
    const payload = {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: encodedAudio,
    };

    if (encodedAudio && cancelRec) {
      axiosInstance
        .post(`/api/chatbot/speechtotext`, payload)
        .then((response) => {
          if (response) return response.data;
          else return "もう一度入力してください！";
        })
        .catch((error) => "ネットワークエラー!もう一度入力してください。");
    }
  };
  const handleReccord = () => {
    setCancelRec(false);
  };
  return (
    <div className="controls-container">
      <div className="recorder-display">
        <div className="recording-time">
          {initRecording && (
            <>
              <div className="recording-indicator"></div>
              <span>{formatMinutes(recordingMinutes)}</span>
              <span>:</span>
              <span>{formatSeconds(recordingSeconds)}</span>
            </>
          )}
        </div>
        {initRecording && (
          <div className="cancel-button-container">
            <button
              className="cancel-button"
              title="Cancel recording"
              onClick={cancelRecording}
            >
              <i
                className="fas fa-trash"
                style={{ fontSize: "1rem" }}
                onClick={handleReccord}
              />
            </button>
          </div>
        )}
      </div>
      <div className="start-button-container">
        {initRecording ? (
          <button
            className={initRecording ? "border-none" : "start-button"}
            title="Save recording"
            disabled={recordingSeconds === 0}
            onClick={saveRecording}
          >
            <i
              className="fas fa-save save-record"
              style={{ fontSize: "1.3rem" }}
              onClick={handleSaveVoice}
            />
          </button>
        ) : (
          <button
            className="start-button"
            title="Start recording"
            onClick={startRecording}
          >
            <i className="fas fa-microphone " style={{ fontSize: "1.3rem" }} />
          </button>
        )}
      </div>
    </div>
  );
};
export default RecorderControls;
