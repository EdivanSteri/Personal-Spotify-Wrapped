import React, {useEffect}from 'react';
import {useNavigate } from 'react-router-dom';

const SpotifyCallback = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.has("code") ? queryParams.get("code") : ''; //Get code from Url pameter only if there is
    

    useEffect(() => {
        if(code !== '' ){
          sessionStorage.setItem("code", code); //Set code into sessionStorage
          navigate("/user-logged-page") //Redirect To User Logged Page
        }else
          navigate("/no-auth");
      }, [code, navigate]); 

    return (
        <div>
            Authorization loading...
        </div>
    );
};

export default SpotifyCallback;