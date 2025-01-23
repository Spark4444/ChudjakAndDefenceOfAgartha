// DOM elements
let currentlyPlaying = document.querySelector(".currentlyPlaying");
let pauseButton = document.querySelector(".pauseButton");
let timeInput = document.querySelector(".timeInput");

// Timers
let songTimeInterval;

// Game state
let isInteracting = false;

//Event listners for time input when the user is using it
timeInput.addEventListener("mousedown", () => {
    isInteracting = true;
});

timeInput.addEventListener("mouseup", () => {
    isInteracting = false;
    audio
    audio.changeTime(timeInput.value);
});

timeInput.addEventListener("input", () => {
    audio.changeTime(timeInput.value);
});

class Audio {
    // Current track
    currentTrack = 0;

    // Is track playing
    trackState = false;

    // Tracks
    tracks = [
        document.querySelector("#audio")
    ]

    constructor(){ 
        this.pauseAll();
        this.updateInput();
        this.updateName();
     }

     // Updates the input range and the step of the input
     updateInput(){
        timeInput.max = this.tracks[this.currentTrack].duration;
        timeInput.step = this.tracks[this.currentTrack].duration / 100;
     }

     // Updates the name of the currently playing track
     updateName(){
        currentlyPlaying.innerHTML = `${this.tracks[this.currentTrack].getAttribute("name")}.mp3 - ${formatTime(this.tracks[this.currentTrack].currentTime)}`;
     }

    // Pauses every track
    pauseAll(){
        this.tracks.forEach((track) =>{
            track.pause();
            track.volume =  0;
        }, this);
    }

    // Plays/pauses the current track
    playPauseCurrent(){
        if(this.trackState){
            this.pauseCurrent();
            pauseButton.src = "img/play.svg";
        }
        else{
            this.playCurrent();
            pauseButton.src = "img/pause.svg";
        }
    }

    // Plays the current track
    playCurrent(){
        this.trackState = true;
        this.tracks[this.currentTrack].play();
        clearInterval(songTimeInterval);
        songTimeInterval = setInterval(() => {
            if(!isInteracting){
                timeInput.value = this.tracks[this.currentTrack].currentTime;
                this.updateName();
            }
            if(this.tracks[this.currentTrack].ended){
                this.currentTrack++;
                if(this.currentTrack >= this.tracks.length){
                    this.currentTrack = 0;
                }
                this.updateInput();
                this.trackState = false;
                this.playCurrent();
            }
        });
    }

    // Pauses the current track
    pauseCurrent(){
        this.trackState = false;
        this.tracks[this.currentTrack].pause();
        clearInterval(songTimeInterval);
    }

    // Rewinds the current track
    rewindCurrent(){
        this.tracks[this.currentTrack].currentTime = 0;
    }

    // Changes the time of the current track
    changeTime(time){
        this.tracks[this.currentTrack].currentTime = time;
        this.updateName();
    }

    // Skips to the next track
    forwardTrack(){
        if(this.trackState){
            this.pauseCurrent();
        }
        this.currentTrack++;
        if(this.currentTrack >= this.tracks.length){
            this.currentTrack = 0;
        }
        this.rewindCurrent();
        if(this.trackState){
            this.playCurrent();
        }
    }

    // Changes volume of the track
    volumeAll(value){
        this.tracks.forEach(function(track){
            track.volume = value / 100;
        }, this);
    }

    //Changes volume of the track
    volume(index, value){
        this.tracks[index].volume = value / 100;
    }
}

let audio = new Audio();