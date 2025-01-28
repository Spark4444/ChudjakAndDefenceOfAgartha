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

// Check if value is not NaN
function checkDuration(value) {
    return !isNaN(value);
}

// Async function to wait until value is not NaN
async function waitUntilIsNotNaN(value) {
    while (isNaN(value)) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Check every 100ms
    }
}