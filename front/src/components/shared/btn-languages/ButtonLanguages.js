import React from "react";
import { useTranslation } from "react-i18next";
import Emoji from "../emoji/Emoji";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const ButtonLanguages = ({ languagesAvaliable }) => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    const changeLanguage  = (lng) => { 
        navigate(`/dictation/${id}`, { state: { languageChange: lng, languageOld: location.state.language  } });
    };

    return (
        <>
            {languagesAvaliable.map((lng) => {
                console.log(lng)
                //if (languagesAvaliable.includes(lng.lang)) {
                    return (
                        <React.Fragment key={lng}>
                            <Emoji
                                emoji={lng}
                                size={24}
                                onClick={() => changeLanguage(lng)} // Corrected here
                                cursor={"pointer"}
                            />
                            <p1> </p1>
                        </React.Fragment>
                    );
               // }
                return null;
            })}
        </>
    );
};

export default ButtonLanguages;

/*
const languages = [
    { code: "en", lang: "english" },
    { code: "fr", lang: "french" },
    { code: "es", lang: "spanish" },
    { code: "ru", lang: "russian" },
];

// sleep time expects milliseconds
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

sleep(500).then(() => {
});
*/