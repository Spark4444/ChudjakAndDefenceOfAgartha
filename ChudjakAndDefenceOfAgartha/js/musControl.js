// DOM elements
let currentlyPlaying = document.querySelector(".currentlyPlaying");
let pauseButton = document.querySelector(".pauseButton");
let timeInput = document.querySelector(".timeInput");
let volumeInput = document.querySelector(".volumeInput");

// Timers
let songTimeInterval;

// Game state
let isInteracting = false;

// Event listeners for time input when the user is using it
timeInput.addEventListener("mousedown", () => {
    isInteracting = true;
});

timeInput.addEventListener("mouseup", () => {
    isInteracting = false;
    audio.changeTime(timeInput.value);
});

timeInput.addEventListener("input", () => {
    audio.updateName(formatTime(timeInput.value));
});

// Event listeners for volume input
volumeInput.addEventListener("input", () => {
    audio.volumeAll(volumeInput.value);
});

class Audio {
    // Current track
    currentTrack = 0;

    // Is track playing
    trackState = false;

    // Tracks
    tracks = [
        document.querySelector("#audio"),
        document.querySelector("#audio2"),
        document.querySelector("#audio3"),
        document.querySelector("#audio4"),
        document.querySelector("#audio5"),
        document.querySelector("#audio6"),
        document.querySelector("#audio7"),
    ];

    constructor() {
        this.pauseAll();
        this.volumeAll(volumeInput.value);
        this.updateInput();
        this.updateName();
    }

    // Updates the input range and the step of the input
    updateInput() {
        timeInput.max = this.tracks[this.currentTrack].duration;
        timeInput.step = this.tracks[this.currentTrack].duration / 100;
        timeInput.value = 0;
    }

    // Updates the name of the currently playing track
    updateName(time) {
        if(time){
            currentlyPlaying.innerHTML = `${this.tracks[this.currentTrack].getAttribute("name")}.mp3 - ${time}`;
        }   
        else{
            currentlyPlaying.innerHTML = `${this.tracks[this.currentTrack].getAttribute("name")}.mp3 - ${formatTime(this.tracks[this.currentTrack].currentTime)}`;
        }
    }

    // Pauses every track
    pauseAll() {
        this.tracks.forEach((track) => {
            track.pause();
        });
    }

    // Plays/pauses the current track
    playPauseCurrent() {
        if (this.trackState) {
            this.pauseCurrent();
            pauseButton.src = "img/play.svg";
        } else {
            this.playCurrent();
            pauseButton.src = "img/pause.svg";
        }
    }

    // Plays the current track
    playCurrent() {
        this.trackState = true;
        this.tracks[this.currentTrack].play();
        clearInterval(songTimeInterval);
        songTimeInterval = setInterval(() => {
            if (!isInteracting) {
                timeInput.value = this.tracks[this.currentTrack].currentTime;
                this.updateName();
            }
            if (this.tracks[this.currentTrack].ended) {
                this.currentTrack++;
                if (this.currentTrack >= this.tracks.length) {
                    this.currentTrack = 0;
                }
                this.updateInput();
                this.updateName();
                this.trackState = false;
                this.playCurrent();
            }
        });
    }

    // Pauses the current track
    pauseCurrent() {
        this.trackState = false;
        this.tracks[this.currentTrack].pause();
        clearInterval(songTimeInterval);
    }

    // Rewinds the current track
    rewindCurrent() {
        let currentState = this.trackState;
        this.pauseCurrent();
        if(this.tracks[this.currentTrack].currentTime < 4){
            this.currentTrack--;
            if(this.currentTrack < 0){
                this.currentTrack = this.tracks.length - 1;
            }
            this.tracks[this.currentTrack].currentTime = 0;
        }
        else{
            this.tracks[this.currentTrack].currentTime = 0;
        }

        this.updateInput();
        this.updateName();
        if(currentState){
            this.playCurrent();
        }
    }

    // Changes the time of the current track
    changeTime(time) {
        this.tracks[this.currentTrack].currentTime = time;
        this.updateName();
    }

    // Skips to the next track
    forwardTrack() {
        let currentState = this.trackState;
        this.pauseCurrent();
        this.currentTrack++;
        if(this.currentTrack > this.tracks.length - 1){
            this.currentTrack = 0;
        }
        this.tracks[this.currentTrack].currentTime = 0;

        this.updateInput();
        this.updateName();
        if(currentState){   
            this.playCurrent();
        }
    }

    // Changes volume of the track
    volumeAll(value) {
        this.tracks.forEach(function (track) {
            track.volume = value / 100;
        }, this);
    }

    // Changes volume of the track
    volume(index, value) {
        this.tracks[index].volume = value / 100;
    }
}

// Initialize audio 10ms after page loads so that all audio elements are loaded
let audio;
setTimeout(() => {
    audio = new Audio();
}, 10);