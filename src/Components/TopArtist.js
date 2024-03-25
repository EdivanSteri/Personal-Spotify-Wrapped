import React, { useState } from 'react';
import './TopArtist.css';
import AudioPlayer from './AudioPlayer';

function TopArtist({urlTopArtistImage, topArtistUserMostListenedSongName, topArtistUserMostListenedSongImage, topArtistUserMostListenedSongPreviewUrl, artistTopTrackName, artistTopTrackImage, artistTopTrackPreviewUrl,topArtistLastAlbumName, topArtistLastAlbumImage}) {
    const [index, setIndex] = useState(0);
    const length = 3;

    //TODO: review songs play
    const canzoni = [
        {id: 0, titolo: topArtistUserMostListenedSongName, url: topArtistUserMostListenedSongPreviewUrl },
        {id: 1, titolo: artistTopTrackName, url: artistTopTrackPreviewUrl },
      ];

    const handlePrevious = () => {
        const newIndex = index - 1;
        setIndex(newIndex < 0 ? length - 1 : newIndex);
    };
    
    const handleNext = () => {
        const newIndex = index + 1;
        setIndex(newIndex >= length ? 0 : newIndex);
    };

    const setCaroseulDataIndex = (number) => {
        console.log(canzoni);
        if(number === 0){
            return getArtistData(topArtistUserMostListenedSongImage, topArtistUserMostListenedSongName, canzoni[number]);
        }else if(number === 1){
            return getArtistData(artistTopTrackImage, artistTopTrackName, canzoni[number]);
        }else if(number === 2){
            return getArtistData(topArtistLastAlbumImage, topArtistLastAlbumName, canzoni[number]);
        }
    }

    const getArtistData = (urlImage, nameSong, canzoneCorrente) => {
        return (
            <>
                <div className='image-data' style={{backgroundImage: `url("${urlImage}")`, backgroundSize: 'cover'}} />
                <div className='text-data'>
                    <h2>{nameSong}</h2>
                </div>
                <div style={{clear: 'both'}}></div> 
                {index !== canzoni.length && (
                    <AudioPlayer key={canzoneCorrente.id} canzoneCorrente={canzoneCorrente}/>
                )}      
            </>
        );
    }; 

    return (
        <div className="content">
            <div className="carousel">
                <div className="artist-data">
                    {setCaroseulDataIndex(index)}
                </div>
                <div className='button-left'>
                    <button onClick={handlePrevious}>Previous</button>
                </div>
                <div className='button-right'>
                    <button onClick={handleNext}>Next</button>
                </div>
            </div>
        </div>                
    );
  };
  
  export default TopArtist;  