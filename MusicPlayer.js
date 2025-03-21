let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek-slider');
let volume_slider = document.querySelector('.volume-slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/sia picture.png',
        name : 'Angel By The Wings',
        artist : 'Sia',
        music : 'audio/sia_-_angel_by_the_wings_[128]_w5nh.mp3'
    },

    {
        img : 'images/titanium picture.jpg',
        name : 'Titanium',
        artist : 'David Guetta ft Sia',
        music : 'audio/David Guetta - Titanium ft. Sia (Official Video).mp3'
    },

    {
        img : 'images/i dont care picture.jpeg',
        name : 'I Don\'t Care',
        artist : 'Justine Bieber ft Edsheeran',
        music : 'audio/Ed Sheeran & Justin Bieber - I Don\'t Care [Official Music Video].mp3'
    },

    {
        img : 'images/mocking bird picture.jpeg',
        name : 'Mocking Bird',
        artist : 'Eminem',
        music : 'audio/Eminem-Mockingbird.mp3'
    },

    {
        img : 'images/antisocial.jpeg',
        name : 'Antisocial',
        artist : 'Edsheeran ft Travis Scott',
        music : 'audio/Ed Sheeran & Travis Scott - Antisocial [Official Music Video].mp3'
    },

    {
        img : 'images/ill be good picture.jpg',
        name : 'I\'ll Be Good To You',
        artist : 'Jaymes Young',
        music : 'audio/Jaymes Young - I\'ll Be Good [Official Video].mp3'
    },

    {
        img : 'images/perfect picture.jpeg',
        name : 'Perfect',
        artist : 'Edsheeran',
        music : 'audio/Ed Sheeran - Perfect (Official Music Video).mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    // Update the track art with the correct image path
    track_art.style.backgroundImage = `url('${music_list[track_index].img}')`;

    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = `Playing ${track_index + 1} of ${music_list.length}`;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color() {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    function populate(o) {
        let color = o;
        for (let i = 0; i < 6; i++) {
            let x = Math.floor(Math.random() * 16);
            color += hex[x];
        }
        return color;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    let gradient = 'linear-gradient(to right, ' + Color1 + ', ' + Color2 + ')';
    document.body.style.background = gradient;
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    loadTrack(track_index);
    playTrack();
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    track_index = isRandom ? Math.floor(Math.random() * music_list.length) : (track_index + 1) % music_list.length;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    track_index = (track_index - 1 + music_list.length) % music_list.length;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
