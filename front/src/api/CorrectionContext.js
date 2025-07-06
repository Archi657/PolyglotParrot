import React, { createContext, useContext, useState } from 'react';

// Create a context for the correction data
const CorrectionContext = createContext();

export const useCorrection = () => {
    return useContext(CorrectionContext);
};

export const CorrectionProvider = ({ children }) => {
    const [correctionData, setCorrectionData] = useState(null);

    // Method to update the correction data (pub)
    const updateCorrectionData = (newData) => {
        setCorrectionData(newData);
    };

    return (
        <CorrectionContext.Provider value={{ correctionData, updateCorrectionData }}>
            {children}
        </CorrectionContext.Provider>
    );
};
