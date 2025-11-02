import './Dictation.css';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TextDictation from './TextDictation';
import AudioPlayer from './AudioPlayer';
import HeaderDictation from './HeaderDictation';
import ConfirmButton from "../shared/btn-confirm/ConfirmButton";

import { getDictationDetails, getDictationAudio } from '../../api/routes'; // per-audio fetch

const Dictation = () => {
  const [dictation, setDictation] = useState({});
  const [audioFiles, setAudioFiles] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [correctedText, setCorrectedText] = useState(null);

  const { id } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const { audio_header, result } = t("Dictation");

  const fetchStarted = useRef(false);

  useEffect(() => {
    if (fetchStarted.current) return; // already fetched
    fetchStarted.current = true;

    const fetchData = async () => {
      try {
        let dictationData = location.state?.dictation || await getDictationDetails(id);
        setDictation(dictationData);

        // progressive loading of audios
        for (const audio of dictationData.audios) {
          const audioObj = await getDictationAudio(audio); // fetch single audio
          setAudioFiles(prev => [...prev, audioObj]);      // add only once
          await new Promise(resolve => setTimeout(resolve, 100)); // optional delay
        }

      } catch (error) {
        console.error('Error fetching dictation or audio:', error);
      }
    };

    fetchData();
  }, [id, location.state]);

  const handleTextChange = text => setTypedText(text);

  return (
    <>
      <div className="dictation-header">
        <HeaderDictation
          title={dictation.title}
          language={dictation.language}
          image={dictation.image}
          difficulty={dictation.difficulty}
        />
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
            <div>
              <h1 className='dictation-header-score'>{result}</h1>
              <p className='dictation-score'>{correctedText[1]}%</p>
            </div>
          )}
        </div>

        <div className="dictation-audio">
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>{audio_header}</h3>
          <div className="audio-grid">
            {audioFiles.map(({ label, url, loading }) => (
              <div key={label} className="audio-item">
                {loading ? (
                  <div className="audio-skeleton"></div>
                ) : (
                  <>
                    <AudioPlayer audioFile={url} />
                    <p className="audio-label">{label}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dictation;
