import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpotifyLogin from "./Pages/SpotifyLogin";
import SpotifyCallback from "./Pages/SpotifyCallback";
import UserLoggedPage from "./Pages/UserLoggedPage";
import NoAuth from "./Pages/NoAuth";

import { ParallaxProvider } from 'react-scroll-parallax';

const App = () => {
  return (
    <ParallaxProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={SpotifyLogin} />    
          <Route path="/spotify-oauth" Component={SpotifyCallback} />
          <Route path="/user-logged-page" Component={UserLoggedPage} />
          <Route path="/no-auth" Component={NoAuth} />
        </Routes>
      </BrowserRouter> 
    </ParallaxProvider>
        
       
      
  );
};

export default App;