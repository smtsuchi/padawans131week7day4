const CLIENT_ID = '1df7e6ba51a04b19b04db128916fc008';
const CLIENT_SECRET = '8dcd53b220104d23a70f1d6d7414985b';
let audio
const getToken = async () => {
    const tokenUrl = 'https://accounts.spotify.com/api/token';

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(CLIENT_ID+":"+CLIENT_SECRET)}`
        },
        body: 'grant_type=client_credentials',
    };

    const res = await fetch(tokenUrl, options);
    const data = await res.json();
    const token = data.access_token
    return token
};

const getSong = async (track, artist) => {
    const searchUrl = `https://api.spotify.com/v1/search?q=${track},${artist}&type=track&limit=3`;
    const token = await getToken()
    const res = await fetch(searchUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await res.json();
    const previewUrl = data.tracks.items[0].preview_url
    return previewUrl
};

const startSong = (song) => {
    if (audio){
        audio.pause()
    }
    audio = new Audio(song);
    audio.volume = .2
    audio.play()

};
const stopSong = () => {
    if (audio){
        audio.pause()
    }
};


const clickedEvent = async (alt) => {
    const [track, artist] = alt.split(' - ')
    const song = await getSong(track, artist)
    startSong(song)
};