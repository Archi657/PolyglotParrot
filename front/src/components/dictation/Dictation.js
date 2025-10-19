import './Dictation.css';
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import TextDictation from './TextDictation';
import AudioPlayer from './AudioPlayer';
import HeaderDictation from './HeaderDictation';
import ConfirmButton from "../shared/btn-confirm/ConfirmButton"

import CircularProgress from '@mui/material/CircularProgress';
//import { LinearProgress } from '@mui/material';

import { getDictationDetails, getDictationAudios } from '../../api/routes';

const Dictation = () => {
    const [dictation, setDictation] = useState({});
    const [audioFiles, setAudioFiles] = useState([]);
    const [typedText, setTypedText] = useState('');
    const [correctedText, setCorrectedText] = useState(null);

    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let dictationData = location.state?.dictation;

                if (!dictationData) {
                    dictationData = await getDictationDetails(id);
                }

                setDictation(dictationData);

                const urls = await getDictationAudios(dictationData.audios);
                setAudioFiles(urls);
            } catch (error) {
                console.error('Error fetching dictation or audio:', error);
            }
        };

        fetchData();
    }, [id, location.state]);

    const handleTextChange = (text) => {
        setTypedText(text);
    };

    return (
        <>
            <div className="dictation-header">
                <HeaderDictation title={dictation.title} language={dictation.language} />
            </div>

            <div className="dictation-container">
                <div className="dictation-box">
                    <TextDictation
                        onTextChange={handleTextChange}
                        correctedText={correctedText}
                    />
                    <ConfirmButton
                        actionType="sendDictation"
                        buttonText="Send"
                        dictation={dictation}
                        typedText={typedText}
                        setCorrectedText={setCorrectedText}
                    />
                    {correctedText && (
                        <>
                        <div className="">
                            <h1 className='dictation-header-score'>Resultado</h1>
                            <p className='dictation-score'>{correctedText[1]}%</p>
                        </div>
                            
                        </>
                    )}
                </div>

                <div className="dictation-audio">
  <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Audio Clips</h3>
  <div className="audio-grid">
    {audioFiles.length > 0 ? (
      audioFiles.map(({ label, url }) => (
        <div key={label} className="audio-item">
          <AudioPlayer audioFile={url} />
          <p className="audio-label">{label}</p>
        </div>
      ))
    ) : (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Loading audios...</p>
        <CircularProgress size="30px" />
      </div>
    )}
  </div>
</div>

            </div>
        </>
    );
};

export default Dictation;
