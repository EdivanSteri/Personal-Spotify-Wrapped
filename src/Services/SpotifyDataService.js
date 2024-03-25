//callback of the backend developed on .net that implements calls to Spotify's api

//Base path from backend
const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_PATH+"SpotifyData";

// Get a user's top three artists of the last month
export const GetUserTopThreeArtistsLastMonth = async (accessToken) => {
  const endpoint = `${backendBaseUrl}/GetUserTopThreeArtistsLastMonth?accessToken=${encodeURIComponent(accessToken)}`;
  console.log("Enpoint: " + endpoint);
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  try {
    const response = await fetch(endpoint, config).then((res) => res.json());
    console.log("SpotifyDataService - GetMyFavouriteArtists - Fetch Api - Ret: ", response);

    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


//Get a user top fifty tracks of the last month
export const GetUserTopFiftyTracksLastMonth = async (accessToken) => {
  const endpoint = `${backendBaseUrl}/GetUserTopFiftyTracksLastMonth?accessToken=${encodeURIComponent(accessToken)}`;
  console.log("Enpoint: " + endpoint);
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  try {
    const response = await fetch(endpoint, config).then((res) => res.json());
    console.log("SpotifyDataService - GetUserTopFiftyTracksLastMonth - Fetch Api - Ret: ", response);

    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

//Get top tracks of a specif artist name
export const GetArtistTopTracksByArtistName = async (artistName, accessToken) => {
  const endpoint = `${backendBaseUrl}/GetArtistTopTracksByArtistName?artistName=${encodeURIComponent(artistName)}&accessToken=${encodeURIComponent(accessToken)}`;
  console.log("Endpoint: " + endpoint);

  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  try {
    const response = await fetch(endpoint, config);    
    const data = await response.json();
    console.log("SpotifyDataService - GetArtistTopTracksByArtistName - Fetch Api - Ret: ", data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


//Get the albums of a specific artist id
export const GetArtistAlbumsByArtistId = async (artistId, accessToken) => {
  const endpoint = `${backendBaseUrl}/GetArtistAlbumsByArtistId?artistId=${encodeURIComponent(artistId)}&accessToken=${encodeURIComponent(accessToken)}`;
  console.log("Enpoint: " + endpoint);
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  try {
    const response = await fetch(endpoint, config).then((res) => res.json());
    console.log("SpotifyDataService - GetArtistAlbumsByArtistId - Fetch Api - Ret: ", response);

    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};