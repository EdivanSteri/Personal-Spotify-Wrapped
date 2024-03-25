//callback of the backend developed on .net that implements calls to Spotify's api
const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_PATH+"SpotifyAuthorization";

export const GetSpotifyOauthToAuthorization = async () => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const response = await fetch(`${backendBaseUrl}/GetSpotifyOauthToAuthorization`, config);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  export const GetAccessTokenNextToAuthorizationService = async () => {
    const verifierSession = sessionStorage.getItem("verifier");
    const codeSession = sessionStorage.getItem("code");
    const endpoint = `${backendBaseUrl}/GetAccessTokeNextToAuthorization?code=${encodeURIComponent(codeSession)}&verifier=${encodeURIComponent(verifierSession)}`;
    console.log("Enpoint: " + endpoint);
    const config = {
      method: 'GET',
      headers: {
        'Accept': 'text/plain'
      }
    };

    try {
      const response = await fetch(endpoint, config)
      .then((result) => result.text());
      console.log("SpotifyCallback - Fetch Api - Ret: " + response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };