// Save a key-value pair to local storage
const saveToLocalStorage = (key, value) => localStorage.setItem(key, value);

// Retrieve a value from local storage by its key
const getFromLocalStorage = key => localStorage.getItem(key);

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
