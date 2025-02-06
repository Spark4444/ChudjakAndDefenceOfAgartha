// DOM elements
let currentlyPlaying = document.querySelector(".currentlyPlaying");
let pauseButton = document.querySelector(".pauseButton");
let timeInput = document.querySelector(".timeInput");
let volumeInput = document.querySelector(".volumeInput");

// Timers
let songTimeInterval;

// Game state
let isInteracting = false;

// Varaibles for input range
let min = timeInput.min;
let max = timeInput.max;
let value = timeInput.value;
let min2 = volumeInput.min;
let max2 = volumeInput.max;
let value2 = volumeInput.value;

// Function to update the background of the time input
function updateTime(){
    min = timeInput.min;
    max = timeInput.max;
    value = timeInput.value;
    timeInput.style.background = `linear-gradient(to right, white 0%, white ${(value-min)/(max-min)*100}%, #aaaaaa ${(value-min)/(max-min)*100}%, #aaaaaa 100%)`;
}

// Function to update the background of the volume input
function updateVolume(){
    min2 = volumeInput.min;
    max2 = volumeInput.max;
    value2 = volumeInput.value;
    volumeInput.style.background = `linear-gradient(to right, white 0%, white ${(value2-min2)/(max2-min2)*100}%, #aaaaaa ${(value2-min2)/(max2-min2)*100}%, #aaaaaa 100%)`;
}

updateVolume();

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
    updateTime();
});

// Event listeners for volume input
volumeInput.addEventListener("input", () => {
    audio.volumeAll(volumeInput.value);
    updateVolume();
});

//Event listener for user input for controlling the audio
document.addEventListener("keyup", (event) => {
    switch(event.code){
        case "KeyJ":
            audio.rewindCurrent();
            break;
        case "KeyK":
            audio.playPauseCurrent();
            break;
        case "KeyL":
            audio.forwardTrack();
            break;
    }
});

class Audio {
    // Current track
    currentTrack = getFromLocalStorageIfPresent("3", 0);

    // Is track playing
    trackState = false;

    // Tracks
    tracks = [];

    constructor() {
        let counter = 0;
        while (true) {
            counter++;
            let track = document.querySelector(`#audio${counter}`);
            if(track){
                this.tracks.push(track);
            } 
            else {
                break;
            }
        }
        this.tracks[this.currentTrack].currentTime = getFromLocalStorageIfPresent("4", 0);
        this.pauseAll();
        this.volumeAll(volumeInput.value);
        setTimeout(() => {
            this.updateInput();
        }, 200);
        this.updateName();
        volumeInput.value = getFromLocalStorageIfPresent("5", 50);
        updateVolume();
    }

    // Updates the input range and the step of the input
    updateInput() {
        timeInput.max = this.tracks[this.currentTrack].duration;
        timeInput.step = this.tracks[this.currentTrack].duration / 100;
        if(this.currentTrack == getFromLocalStorage("3")){
            timeInput.value = getFromLocalStorageIfPresent("4", 0);
            saveToLocalStorage("4", 0);
        }
        else{
            timeInput.value = 0;
        }
        updateTime();
    }

    // Updates the name of the currently playing track
    updateName(time) {
        let src = this.tracks[this.currentTrack].src;
        let fileName = src.substring(src.lastIndexOf("/") + 1);
        fileName = fileName.replace(/%20/g, " ");
        if(time){
            currentlyPlaying.innerHTML = `${fileName} - ${time}`;
        }
        else{
            currentlyPlaying.innerHTML = `${fileName} - ${formatTime(this.tracks[this.currentTrack].currentTime)}`;
        }
        if(currentlyPlaying.innerHTML.length > 38){
            currentlyPlaying.style.fontSize = `0.8vw`;
            currentlyPlaying.style.margin = `5% 0 0 0`;
        }
        else{
            currentlyPlaying.style.fontSize = ``;
            currentlyPlaying.style.margin = ``;
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
        this.songControl();
        songTimeInterval = setInterval(this.songControl, 100);
    }

    // Pauses the current track
    pauseCurrent() {
        this.trackState = false;
        this.tracks[this.currentTrack].pause();
        clearInterval(songTimeInterval);
    }

    // Fade in and fade out and track changing
    songControl = () => {
        if (!isInteracting) {
            timeInput.value = this.tracks[this.currentTrack].currentTime;
            updateTime();
            this.updateName();
        }

        if(this.tracks[this.currentTrack].duration - this.tracks[this.currentTrack].currentTime < 10){
            this.tracks[this.currentTrack].volume = ((this.tracks[this.currentTrack].duration - this.tracks[this.currentTrack].currentTime) / 10)  * (volumeInput.value / 100);
        }
        else if(this.tracks[this.currentTrack].currentTime < 10){
            this.tracks[this.currentTrack].volume = (this.tracks[this.currentTrack].currentTime / 10).toFixed(2) * (volumeInput.value / 100);
        }
        else{
            this.tracks[this.currentTrack].volume = volumeInput.value / 100;
        }

        if(this.tracks[this.currentTrack].ended){
            this.tracks[this.currentTrack].volume = volumeInput.value / 100;
            this.currentTrack++;
            if (this.currentTrack >= this.tracks.length) {
                this.currentTrack = 0;
            }
            this.updateInput();
            this.updateName();
            this.trackState = false;
            this.playCurrent();
        }
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

// Initialize audio
let audio = new Audio();