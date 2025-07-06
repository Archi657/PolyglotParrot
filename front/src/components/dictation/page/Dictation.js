import './Dictation.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextDictation from '../text-dictation/TextDictation';
import AudioPlayer from '../audio/AudioPlayer';
import HeaderDictation from '../header-dictation/HeaderDictation';
import ConfirmButton from '../../shared/btn-confirm/ConfirmButton';
import { getDictationDetails, getDictationAudio } from '../../../api/routes'; // Import routes

const Dictation = () => {
    const [dictation, setDictation] = useState({});
    const [audioFile, setAudioFile] = useState(null);
    const [typedText, setTypedText] = useState('');
    const [correctedText, setCorrectedText] = useState(null); // Store corrected text

    const handleTextChange = (text) => {
        setTypedText(text);
    };

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dictationData = await getDictationDetails(id);
                setDictation(dictationData);
                const audioUrl = await getDictationAudio(id, dictationData.language);
                setAudioFile(audioUrl);
            } catch (error) {
                console.error('Error fetching dictations:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <div className='dictation-header'>
                <HeaderDictation title={dictation.title} language={dictation.language} />
            </div>
            <div className="dictation-container">
                <div className="dictation-box">
                    <TextDictation onTextChange={handleTextChange} correctedText={correctedText} />
                    <ConfirmButton 
                        actionType="sendDictation" 
                        buttonText="Send" 
                        dictation={dictation} 
                        typedText={typedText} 
                        setCorrectedText={setCorrectedText} // Pass function to update corrected text
                    />
                </div>
                <div className="dictation-audio">
                    <AudioPlayer audioFile={audioFile} />
                </div>
            </div>
        </>
    );
};

export default Dictation;
