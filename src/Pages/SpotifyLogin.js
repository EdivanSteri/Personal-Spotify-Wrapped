import React, { useState } from "react";
import {GetSpotifyOauthToAuthorization} from '../Services/SpotifyOauthService.js';
import {redirectToAuthorization} from '../Utilities/DOMUtilities.js';

  const SpotifyLogin = () => {
    const [authorizationUrl,setAuthorizationUrl] = useState('');
    
    const handleClickGetData = async () => {
      try {
        const result = await GetSpotifyOauthToAuthorization(); //Call api into service.js
        
        //Set verifier into SessionStorage
        sessionStorage.setItem("verifier", result["verifier"]);
        
        setAuthorizationUrl(result["authorizationUrl"]);
        
        console.log('Data from API:', result);
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    };
  
    return (

      <div>
        <h2>Spotify Login</h2>
        <button onClick={handleClickGetData}>Login to Spotify</button>
        {authorizationUrl !== '' && 
          (redirectToAuthorization(authorizationUrl))
        }
      </div>
      
    );
  };

export default SpotifyLogin;
