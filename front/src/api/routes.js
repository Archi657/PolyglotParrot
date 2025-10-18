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
    const dictationID = dictation.id
    const dictationTitle = dictation.title
    const dictationText = dictation.text
    const response = await api.post(`/solutions/`, { userID, dictationID, dictationTitle, dictationText, typedText });
    return response.data
  } catch (error) {
    console.error('Error fetching dictation details:', error);
    throw error;
  }
};



// maybe delete and replace it?
export const getDictationAudios = async (audios) => {
  try {
    const urls = [];

    for (const audio of audios) {
      console.log("Audio : ", audio.file_id)
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
    console.log("user token ",  response.data)
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