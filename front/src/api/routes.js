import api from './axiosConfig';

// can be improved to receive less items. maybe keep random?
export const getSlider = async () => {
  try {
    console.log(api)
    const response = await api.get("/dictations/random/5");
    return(response);
  } catch (error) {
    console.error('Error fetching dictations:', error);
  }
}

// Fetch dictation details
export const getDictationDetails = async (id) => {
  try {
    // Fetch dictation details
    const response = await api.get(`/dictations/${id}`);
    const dictation = {
      id: id,
      title: response.data.title,
      text: response.data.text,
      language: response.data.language,
      //audio
    };

    return dictation;
  } catch (error) {
    console.error('Error fetching dictation details:', error);
    throw error;
  }
};

//change name, fix details
export const postDictation = async (userID, dictation, typedText) => {
  try {
    // Fetch dictation details
    const response = await api.post(`/api/v1/solve`, { userID, dictation, typedText });
    return response.data
  } catch (error) {
    console.error('Error fetching dictation details:', error);
    throw error;
  }
};



// maybe delete and replace it?
export const getDictationAudio = async (id, language) => {
  try {
    // Fetch the audio file for the dictation
    const response = await api.post(
      `/api/v1/dictations/audio/${id}`,
      { language }, // Include language in the body
      {
        responseType: 'blob', // Important to set the response type to blob
      }
    );

    // Create a blob URL from the audio file
    const audioUrl = URL.createObjectURL(response.data);
    return audioUrl;
  } catch (error) {
    console.error('Error fetching dictation audio:', error);
    throw error;
  }
};


