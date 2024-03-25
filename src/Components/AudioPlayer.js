function AudioPlayer ({ canzoneCorrente }) {
    return (
        <audio  controls autoPlay={true} loop={true}>
            {console.log("Nome canzone attuale]: ", canzoneCorrente.titolo)}
            <source id={canzoneCorrente.id} src={canzoneCorrente.url} type="audio/mp3" />
        </audio>
    );
};

export default AudioPlayer; 