import {suggestions} from "./suggestions.js";
const addSportButton = document.getElementById("add-sport-button");
const listOfSport = document.getElementById("list-of-sport");

// add sport btn
let numSports = 1;
addSportButton.onclick = (ev => {
    numSports++;
    let sportField = document.createElement('li');
    sportField.innerHTML = 
    '<li><input type="text" name="sport" value="sport"> <input type="text" name="level" value="skill level">\n <div class="remove-sport-btn">remove</div>';
    listOfSport.appendChild(sportField);
})


// auto-complete
let autocomSearchbar = new autoComplete({
    selector: ".autoComplete",
    placeHolder: "Search for Food...",
    data: {
        src: suggestions.sort(),
        cache: true,
    },
    resultItem: {
        highlight: true
    },
    events: {
        input: {
            selection: (event) => {
                const selection = event.detail.selection.value;
                autoCompleteJS.input.value = selection;
            }
        }
    }
});

let autocomSport = new autoComplete({
    selector: "#search",
    placeHolder: "Search for Food...",
    data: {
        src: suggestions.sort(),
        cache: true,
    },
    resultItem: {
        highlight: true
    },
    events: {
        input: {
            selection: (event) => {
                const selection = event.detail.selection.value;
                autoCompleteJS.input.value = selection;
            }
        }
    }
});

