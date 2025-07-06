import React from "react";

const AudioPlayer = ({ audioFile }) => {
  return (
      <div>
          {audioFile ? (
              <audio controls>
                  <source src={audioFile} type="audio/mpeg" />
                  Your browser does not support the audio tag.
              </audio>
          ) : (
              <p>Loading audio...</p>
          )}
      </div>
  );
};

export default AudioPlayer;
