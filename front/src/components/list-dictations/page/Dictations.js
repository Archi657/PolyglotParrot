import React, { useState, useEffect } from 'react';
import CardDic from "../card/CardDic";
import api from '../../../api/axiosConfig'

const Dictations = () => {
    const [dictations, setDictations] = useState([]);
    const getDictations = async () => {
        try {
            const response = await api.get("/api/v1/dictations");
            setDictations(response.data);
        } catch (error) {
            console.error('Error fetching dictations:', error);
        }
    }

    useEffect(() => {       
        getDictations();
    }, []);

    //debug
    useEffect(() => {
        console.log(dictations); // Side effect after dictations state update
    }, [dictations]); // Run this effect whenever the dictations state changes

    return (
        <>
            <CardDic dictations={dictations} />
        </>
    );
}

export default Dictations;