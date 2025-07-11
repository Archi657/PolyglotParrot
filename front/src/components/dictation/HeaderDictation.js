import React from "react";
import Emoji from "../shared/emoji/Emoji";
import { useTranslation } from 'react-i18next';

const HeaderDictation = ({ title, language }) => {

    const { t } = useTranslation();
    const { Diclanguage } = t("Dictation Header")

    return (
        <>
            <h2> {title}</h2>
            <p>{Diclanguage} : <Emoji
                key="en"
                emoji={language}
                size={24}
            />
            </p>
        </>
    )
}

export default HeaderDictation