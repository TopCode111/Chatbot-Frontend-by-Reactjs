import React from "react";
import useRecordingsList from "../hooks/use-recordings-list";
import "./styles.css";

const RecordingsList = ({ audio }) => {
  const { recordings, deleteAudio } = useRecordingsList(audio);
  console.log(recordings, "audio");
  return (
    <div className="recordings-container">
      {recordings.length > 0 ? (
        <>
          {/* <h1>Your recordings</h1> */}
          <div className="recordings-list">
            {recordings.map((record) => (
              <div className="record" key={record.key}>
                <audio controls src={record.audio} />
                <div className="delete-button-container">
                  <button
                    className="delete-button"
                    title="Delete this audio"
                    onClick={() => deleteAudio(record.key)}
                  >
                    <i
                      className="fas fa-trash "
                      style={{ fontSize: "1.3rem" }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-records">
          {/* <i
            className="fas fa-exclamation-circle"
            style={{ fontSize: "1.3rem" }}
          />
          <span> no record</span> */}
        </div>
      )}
    </div>
  );
};
export default RecordingsList;
