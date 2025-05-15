// Update the localStorage values
function updateLocalStorage(){
    saveToLocalStorage("0", settingObj.levelId);
    saveToLocalStorage("1", musicPlayerStatus);
    saveToLocalStorage("2", settingObj.time);
    saveToLocalStorage("3", audio.currentTrack);
    saveToLocalStorage("4", audio.getCurrentTrack().currentTime);
    saveToLocalStorage("5", volumeInput.value);
    saveToLocalStorage("6", pauseMenuX);
    saveToLocalStorage("7", pauseMenuY);
    saveToLocalStorage("8", settingsX);
    saveToLocalStorage("9", settingsY);
    saveToLocalStorage("10", settingsStatus);
    saveToLocalStorage("11", audio.modes.loop.state);
    saveToLocalStorage("12", audio.modes.shuffle.state);
    let save = [];
    audio.tracks.forEach(element => {
        save.push(element.id);
    });
    saveToLocalStorage("13", JSON.stringify(save));
}

// If the player updates the page save all of the localStorage values
window.addEventListener("beforeunload", updateLocalStorage);