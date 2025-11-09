import api from './axiosConfig';
import { jwtDecode } from 'jwt-decode';

// can be improved to receive less items. maybe keep random?
export const getSlider = async () => {
  try {
    const response = await api.get("/dictations/random/5");
    return (response);
  } catch (error) {
    console.error('Error fetching dictations:', error);
  }
}

// Fetch all dictations (solutions) for a given user
export const getDictationsUser = async (username) => {
  try {
    const response = await api.get(`/solutions/${username}`); // or /solutions/by-username/{username} if you use username
    const solutions = response.data;

    if (!Array.isArray(solutions) || solutions.length === 0) {
      console.log("No solutions found for this user");
      return [];
    }

    // TODO language to be able to filder and add flag ?
    const dictations = solutions.map(sol => ({
      id: sol._id,
      dictationID: sol.dictationID,
      dictationTitle: sol.dictationTitle,
      accuracy: sol.accuracy,
      language: sol.language,
      difficulty: sol.difficulty
    }));

    // DEBUG console.log("User dictations:", dictations);
    return dictations;

  } catch (error) {
    console.error("Error solutions for the user :", error);
    throw error;
  }
};

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
      difficulty: response.data.difficulty,
      image: response.data.image,
      audios: response.data.audios
    };

    // DEBUG console.log("difficulty " + response.data.difficulty)

    return dictation;
  } catch (error) {
    console.error('Error fetching dictation details:', error);
    throw error;
  }
};

// TODO Add language ? 
export const postDictation = async (userID, dictation, typedText) => {
  try {
    
    const dictationID = dictation.id
    const dictationTitle = dictation.title
    const dictationText = dictation.text
    const language = dictation.language
    const difficulty = dictation.difficulty
    console.log(difficulty)
    const response = await api.post(`/solutions/`, { userID, dictationID, dictationTitle, typedText, dictationText, language, difficulty });
    return response.data
  } catch (error) {
    console.error('Error uploading dictation solution to be solved:', error);
    throw error;
  }
};

export const getDictationAudio = async (audio) => {
  try {
    const response = await api.get(`/dictations/audio/${audio.file_id}`, {
      responseType: 'blob',
    });

    const audioUrl = URL.createObjectURL(response.data);

    return {
      label: audio.label,
      url: audioUrl,
    };
  } catch (error) {
    console.error('Error fetching audio:', audio.file_id, error);
    return {
      label: audio.label,
      url: null, 
    };
  }
};

export const getSolution = async (solutionId) => {
  try {
    const response = await api.get(`/solutions/get/${solutionId}`);
    const solutionData = response.data;
    console.log(solutionData)
    return solutionData;

  } catch (err) {
    console.error("Error fetching solution:", err);
    alert("Failed to load solution.");
  }
};


export const register = async (user) => {
  try {
    const username = user.username
    const password = user.password
    const email = user.email
    const response = await api.post(`/auth/register`, { username, email, password });
    return response.data
  } catch (error) {
    console.error('Error with register method:', error);
    throw error;
  }
};

export const login = async (user) => {
  try {
    // OAuth2PasswordRequestForm expects these keys:
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', user.email);     // Even though it's email, backend expects "username"
    params.append('password', user.password);
    params.append('scope', '');

    // Make the POST request with correct headers and body
    const response = await api.post('/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Optional: store the access token in localStorage/sessionStorage
    const token = response.data.access_token;
    const decoded = jwtDecode(token)
    //console.log("user token ",  response.data)
    //const userId = response.data.user_token.userid;

    localStorage.setItem('token', token); // or sessionStorage.setItem()
    localStorage.setItem('username', decoded.username)
    localStorage.setItem('id', decoded.id)

    return response.data;
  } catch (error) {
    console.error('Error with login method:', error.response?.data || error.message);
    throw error;
  }
};

/* Get audios in a bucle
export const getDictationAudios = async (audios) => {
  try {
    const urls = [];

    for (const audio of audios) {
      //console.log("Audio : ", audio.file_id)
      const response = await api.get(`/dictations/audio/${audio.file_id}`, {
        responseType: 'blob',
      });

      const audioUrl = URL.createObjectURL(response.data);
      urls.push({
        label: audio.label,
        url: audioUrl
      });
    }

    return urls;
  } catch (error) {
    console.error('Error fetching dictation audios:', error);
    throw error;
  }
};
*/