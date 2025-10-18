import React from "react";
import { Container } from "react-bootstrap";
import CircularProgress from '@mui/material/CircularProgress';

const AudioPlayer = ({ audioFile }) => {
  return (
    <Container className="mt-3">
      {audioFile ? (
        <audio controls className="w-100">
          <source src={audioFile} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </Container>
  );
};

export default AudioPlayer;
