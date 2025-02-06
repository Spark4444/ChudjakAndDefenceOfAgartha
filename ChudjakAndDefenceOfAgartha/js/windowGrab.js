// Window positions
let pauseMenuX = getFromLocalStorageIfPresent("6", "");
let pauseMenuY = getFromLocalStorageIfPresent("7", "");
let settingsX = getFromLocalStorageIfPresent("8", "");
let settingsY = getFromLocalStorageIfPresent("9", "");

settings.style.left = settingsX;
settings.style.top = settingsY;
pauseMenu.style.left = pauseMenuX;
pauseMenu.style.top = pauseMenuY;

// function to drag an element by an element inside it
function dragWindow(window){
    let ps1 = 0, ps2 = 0, ps3 = 0, ps4 = 0;
    if(document.querySelector(`.${window.classList[0]}Grab`)){
        document.querySelector(`.${window.classList[0]}Grab`).onmousedown = assignEvents;
    }

    function assignEvents(e){
        e = e || window.event;
        e.preventDefault();
        ps3 = e.clientX;
        ps4 = e.clientY;
        window.style.transition = "none";
        document.onmouseup = stopDrag;
        document.onmousemove = dragElem;
    }

    function dragElem(e){
        e = e || window.event;
        e.preventDefault();
        ps1 = ps3 - e.clientX;
        ps2 = ps4 - e.clientY;
        ps3 = e.clientX;
        ps4 = e.clientY;
        window.style.top = (window.offsetTop - ps2) + "px";
        window.style.left = (window.offsetLeft - ps1) + "px";
        window.style.right = "";
        window.style.bottom = "";
    }

    function stopDrag(){
        window.style.transition = "";
        document.onmouseup = null;
        document.onmousemove = null;
        if(window.classList[0] === "settings"){
            settingsX = window.style.left;
            settingsY = window.style.top;
        }
        else if(window.classList[0] === "pauseMenu"){
            pauseMenuX = window.style.left;
            pauseMenuY = window.style.top;
        }
    }
}

dragWindow(menuWrap);
dragWindow(settings);