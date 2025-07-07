import React from "react";
import { useTranslation } from "react-i18next";
import Emoji from "../emoji/Emoji";

const languages = [
    { code: "en", lang: "english" },
    { code: "fr", lang: "french" },
    { code: "es", lang: "spanish" },
    { code: "ru", lang: "russian" }
];

const Languages = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        console.log(lng);
        i18n.changeLanguage(lng);
    };

    return (
        <>
            {languages.map((lng) => (
                <div key={lng.code} style={{ display: "inline-flex", alignItems: "center", padding: "2px" }}>
                    <Emoji
                        emoji={lng.lang}
                        size={24}
                        onClick={() => changeLanguage(lng.code)}
                        cursor={"pointer"}
                    />
                </div>
            ))}
        </>
    );
};

export default Languages;
