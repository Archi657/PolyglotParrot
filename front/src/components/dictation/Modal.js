import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './Modal.css';
import { useTranslation } from 'react-i18next';
import ButtonLanguages from '../shared/btn-languages/ButtonLanguages';
import { useNavigate } from "react-router-dom";

const Modal = ({ dictation, setLanguage, languageOld }) => {

    const [modalOpen, setModalOpen] = useState(true);
    const { t } = useTranslation();
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    //const languages = dictation.texts ? dictation.texts.map(text => text.language) : [];

    const { description } = t("Language Change")
    const { yes, no } = t("Options")

    const selectLanguage = () => {
        console.log('change modal yes', location.state.languageChange)
        setLanguage(location.state.languageChange);
        setModalOpen(false);
        navigate(`/dictation/${id}`, { state: { language: location.state.languageChange } });
    };

    const selecOld = () => {
        console.log('change modal no', languageOld)
        setLanguage(location.state.languageOld);
        setModalOpen(false);
        navigate(`/dictation/${id}`, { state: { language: location.state.languageOld } });
    };

    if (!modalOpen) {
        document.body.classList.remove('active-modal');

        return null;
    }

    document.body.classList.add('active-modal');
    //<ButtonLanguages languagesAvaliable={languages}/>
    return (
        <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
                <h2>{description}</h2>
                <button onClick={() => selectLanguage()} className="btn-modal">{yes}</button>
                <button onClick={() => selecOld()} className="btn-modal">{no}</button>
            </div>
        </div>
    );
};

export default Modal;
