import React, { useEffect, useState } from "react";

import './UserLoggedPage.css';

import { useNavigate } from "react-router-dom";
import {GetAccessTokenNextToAuthorizationService} from '../Services/SpotifyOauthService.js';
import {GetUserTopThreeArtistsLastMonth, GetUserTopFiftyTracksLastMonth, GetArtistTopTracksByArtistName, GetArtistAlbumsByArtistId} from '../Services/SpotifyDataService.js';
import FavouriteArtists from "../Components/FavouriteArtists.js";

const UserLoggedPage = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState('');
  const [userTopArtists, setUserTopArtists] = useState(null);
  const [userTopTracks, setUserTopTracks] = useState(null);
  const [artistTopTracks, setArtistTopTracks] = useState(null);
  const [mostListenedSongsUserFavoriteSingers, setMostListenedSongsUserFavoriteSingers] = useState(null);//most listened to songs of a user's favorite singers
  const [lastAlbumsUserFavouriteArtists, setLastAlbumsUserFavouriteArtists] = useState(null);
  
  useEffect(() => {       
    const fetchAccessToken = async () => {
      try {
        const accessTokenLocal = await GetAccessTokenNextToAuthorizationService();
        console.log("UserLoggedPage - fetchAccessToken - GetAccessTokenNextToAuthorizationService - result: "+ accessTokenLocal);
        setAccessToken(accessTokenLocal);
      } catch (error) {
        // Handle error if needed
      }
    };

    return () => {
      fetchAccessToken();
    } 
  }, []);

  useEffect(() => {
    const fetchUserFavouriteArtist = async (accessTokenLocal) => {
      try {
        const fetchUserFavouriteArtistResult = await GetUserTopThreeArtistsLastMonth(accessTokenLocal);
        console.log("UserLoggedPage - fetchMyFavouriteArtist - GetMyFavouriteArtists - response: ", fetchUserFavouriteArtistResult);
        setUserTopArtists(fetchUserFavouriteArtistResult);
      } catch (error) {
        // Handle error if needed
        console.error("Error fetching user's favorite artists:", error);
      }
    };

    const fetchUserFavouriteTracks = async (accessTokenLocal) => {
      try {
        const fetchUserFavouriteTracksResult = await GetUserTopFiftyTracksLastMonth(accessTokenLocal);
        console.log("UserLoggedPage - fetchMyFavouriteArtist - GetUserTopFiftyTracksLastMonth - response: ", fetchUserFavouriteTracksResult);
        setUserTopTracks(fetchUserFavouriteTracksResult);
      } catch (error) {
        // Handle error if needed
        console.error("Error fetching user's favorite tracks:", error);
      }
    };

    if (accessToken !== '') {
      fetchUserFavouriteArtist(accessToken);
      fetchUserFavouriteTracks(accessToken);
    }

  }, [accessToken, setUserTopArtists, setUserTopTracks]);

  useEffect(() => {
    const getTrack = (trackItems, artistName) => {
      const foundTrack = trackItems.find(topTrack => topTrack.artists.some(element => element.name === artistName));
      return foundTrack ? { Id: foundTrack.id, Name: foundTrack.name, Images: foundTrack.album.images, PreviewUrl: foundTrack.preview_url,  Duration: foundTrack.duration_ms } : null;
    };

    const getLastAlbumFavouriteArtist = async artistId => {
      const artistAlbums = await GetArtistAlbumsByArtistId(artistId, accessToken);
      const lastAlbum = artistAlbums.items[0];
      return {
        Id: lastAlbum.id,
        Name: lastAlbum.name,
        TotalTracks: lastAlbum.total_tracks,
        Images: lastAlbum.images,
        ReleaseDate: lastAlbum.release_date
      };
    };

    const getArtistTopTracks = async artistName => {
      const topTracks = await GetArtistTopTracksByArtistName(artistName, accessToken);
      console.log("topTracks: ",topTracks);
      const topTrack = topTracks.tracks[0];

      return  {
        Id: topTrack.id,
        Name: topTrack.name,
        Images: topTrack.album.images,
        PreviewUrl: topTrack.preview_url,
        Duration: topTrack.duration_ms
      };
    };

    const getData = async (artistItems, accessToken) => {
      const mostUserListenedSongs = [];
      const artistLastAlbums = [];
      const artistTopTracks = [];

      for (const artist of artistItems) {
        const track = getTrack(userTopTracks.items, artist.name);
        mostUserListenedSongs.push(track);

        const topTrack = await getArtistTopTracks(artist.name, accessToken);
        console.log('topTrack: ', topTrack);
        artistTopTracks.push(topTrack);

        const lastAlbum = await getLastAlbumFavouriteArtist(artist.id);
        console.log('lastAlbum: ', lastAlbum);
        artistLastAlbums.push(lastAlbum);
      }

      setMostListenedSongsUserFavoriteSingers(mostUserListenedSongs);
      setArtistTopTracks(artistTopTracks);
      setLastAlbumsUserFavouriteArtists(artistLastAlbums);
    };

    if (userTopArtists !== null && userTopTracks !== null && !mostListenedSongsUserFavoriteSingers && !lastAlbumsUserFavouriteArtists) {
      getData(userTopArtists.items, accessToken);
    }
  }, [userTopArtists, userTopTracks, mostListenedSongsUserFavoriteSingers, lastAlbumsUserFavouriteArtists, accessToken]);


  const handleLogout = async () => {
    try {
      // Rimuovo il verifier e il code dalla sessionStorage
      sessionStorage.removeItem("verifier");
      sessionStorage.removeItem("code");

      // Reindirizza alla pagina iniziale
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div >
      {accessToken !== '' ? (
        <div>
          {userTopArtists !== null && mostListenedSongsUserFavoriteSingers != null && artistTopTracks !== null && lastAlbumsUserFavouriteArtists != null ?  (     
                <FavouriteArtists 
                  userTopArtists={userTopArtists.items} 
                  mostListenedSongsUserFavoriteSingers={mostListenedSongsUserFavoriteSingers}
                  artistTopTracks={artistTopTracks}
                  lastAlbumsUserFavouriteArtists={lastAlbumsUserFavouriteArtists}
                /> 
          ) : (
            <div>Fetching Data From Spotify</div>
          )}
        </div>                  
      ) : (
        <div><p>Loading...</p></div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
  
};

export default UserLoggedPage;