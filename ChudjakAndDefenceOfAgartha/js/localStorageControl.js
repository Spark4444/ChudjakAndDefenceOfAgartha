// If the player updates the page save all of the localStorage values
window.addEventListener("beforeunload", function (event) {
    saveToLocalStorage("0", levelId);
    saveToLocalStorage("1", musicPlayerStatus);
    saveToLocalStorage("2", time);
    saveToLocalStorage("3", audio.currentTrack);
    saveToLocalStorage("4", audio.tracks[audio.currentTrack].currentTime);
    saveToLocalStorage("5", volumeInput.value);
});