// Save a key-value pair to local storage
let saveToLocalStorage = (key, value) => localStorage.setItem(key, value);

// Retrieve a value from local storage by its key
let getFromLocalStorage = key => localStorage.getItem(key);

// Function to get a value from local storage if it is present, otherwise save the default value to local storage and return the default value
function getFromLocalStorageIfPresent(key, defaultValue){
    let item = getFromLocalStorage(key);
    if(item){
        return item;
    }
    else{
        saveToLocalStorage(key, defaultValue);
        return defaultValue;
    }
}

// Function to generate a random number between a start and end value
function getRandomNumber(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

// formats time in mm:ss format
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Function to reset the local storage
function resetLocal(){
    localStorage.clear();
    window.removeEventListener("beforeunload", updateLocalStorage);
    location.reload();
}

function boolean(str){
    if(typeof str === "string"){
        str = str.toLowerCase();
        if(str === "true"){
            return true;
        }
        else if(str === "false"){
            return false;
        }
        else{
            return null;
        }
    }
}