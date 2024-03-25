import './FavouriteArtists.css';
import TopArtist from './TopArtist';
import { ParallaxBanner } from 'react-scroll-parallax';

function FavouriteArtists({ userTopArtists, mostListenedSongsUserFavoriteSingers,artistTopTracks, lastAlbumsUserFavouriteArtists }) {

  return (  
	<div className='component'>
	{userTopArtists.map((userTopArtist, index) => (          
		<div key={userTopArtist.id} >
		  <ParallaxBanner
			key={userTopArtist.id}
			layers={[
			  {
				image: userTopArtist.images[0]?.url, // Immagine del TopArtist, aggiustare secondo necessità
				amount: 1.5, // Regola l'effetto parallax, valore consigliato tra 0 e 1
			  },
			]}
			style={{
			  height: '100vh', // Altezza del componente parallax per occupare tutto lo schermo
			  display: 'flex',
			  alignItems: 'center',
			  justifyContent: 'center',
			  overflow: 'hidden' // Nasconde la barra di scorrimento
			}}
		  >
			<TopArtist 
			  key={userTopArtist.id}
			  urlTopArtistImage={userTopArtist.images[0]?.url}
			  topArtistUserMostListenedSongName={mostListenedSongsUserFavoriteSingers[index].Name}
			  topArtistUserMostListenedSongImage={mostListenedSongsUserFavoriteSingers[index]?.Images[0].url}
			  topArtistUserMostListenedSongPreviewUrl={mostListenedSongsUserFavoriteSingers[index]?.PreviewUrl}
			  artistTopTrackName={artistTopTracks[index]?.Name}
			  artistTopTrackImage={artistTopTracks[index]?.Images[0].url}
			  artistTopTrackPreviewUrl={artistTopTracks[index]?.PreviewUrl}
			  topArtistLastAlbumName={lastAlbumsUserFavouriteArtists[index]?.Name}
			  topArtistLastAlbumImage={lastAlbumsUserFavouriteArtists[index]?.Images[0].url}
			/>
		  </ParallaxBanner>
		</div>
	))}
  </div>
    );
  };
  
  export default FavouriteArtists;  