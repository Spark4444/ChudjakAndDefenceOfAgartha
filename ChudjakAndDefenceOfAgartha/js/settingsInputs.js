//DOM elements
let settingElements = document.querySelectorAll(".setting");

// Settings parameters
let settingObj = {
    levelId: getFromLocalStorageIfPresent("0", 0),
    time: getFromLocalStorageIfPresent("2", 3)
};

// Assign events for the inputs to change values of varaibles 
settingElements.forEach((element, index) => {
    element.value = settingObj[element.getAttribute("variable")];
    if(element.type == "range"){
        document.querySelectorAll(".option")[index].querySelector(".inputValue").innerHTML = element.value;
        element.style.background = `linear-gradient(to right, white 0%, white ${(element.value-element.min)/(element.max-element.min)*100}%, #aaaaaa ${(element.value-element.min)/(element.max-element.min)*100}%, #aaaaaa 100%)`;
        element.addEventListener("input", () => {
            settingObj[element.getAttribute("variable")] = element.value;
            document.querySelectorAll(".option")[index].querySelector(".inputValue").innerHTML = element.value;
            element.style.background = `linear-gradient(to right, white 0%, white ${(element.value-element.min)/(element.max-element.min)*100}%, #aaaaaa ${(element.value-element.min)/(element.max-element.min)*100}%, #aaaaaa 100%)`;
        });
    }
    else{
        element.addEventListener("input", () => {
            settingObj[element.getAttribute("variable")] = element.value;
        });
    }
});