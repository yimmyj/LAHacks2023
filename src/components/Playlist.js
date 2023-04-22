const Playlist = ({playlistLink}) => {
    if (playlistLink === "") {
        return;
    }
    else {
        return (
            <iframe src={playlistLink}
                width="50%"
                height="380" 
                frameBorder="0" 
                allowFullScreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy">
            </iframe>
        )
    }
}

export default Playlist;