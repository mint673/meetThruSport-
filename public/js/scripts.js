import {suggestions} from "./suggestions.js";
const addSportButton = document.getElementById("add-sport-button");
const listOfSport = document.getElementById("list-of-sport");

// add sport btn
let numSports = 1;
addSportButton.onclick = (ev => {
    numSports++;
    /*
    let sportField = document.createElement('li');
    sportField.innerHTML = 
    `<input type="text" name="sport" id="sport${numSports}"> <input type="text" name="level" value="skill level"> <span id="remove-sport${numSports}" class="btn btn-outline-secondary btn-sm" id="add-sport-button">remove</span>`;
    listOfSport.appendChild(sportField);
    */
    $('#list-of-sport').append(
        `<li class="input-group">
            <input class="form-control" type="text" name="sport" id="sport${numSports}" autocomplete="off">
            <input class="form-control" type="text" name="level" placeholder="describe your skill level and preferences when looking for sportmate"> 
            <span id="remove-sport${numSports}" class="btn btn-outline-secondary" id="add-sport-button">remove</span>
        </li>`
    );
    addAutocomplete(`#sport${numSports}`, "name of sport");

    

    // add js to the remove button
    let removeBtn = document.getElementById(`remove-sport${numSports}`);
    removeBtn.onclick = ( ev => {
        ev.target.parentNode.parentNode.removeChild( ev.target.parentNode );
    })
})

// add autocomplete to search bar and first sport input
addAutocomplete("#search", "eg.badminton");
addAutocomplete("#sport1", "name of sport");

function addAutocomplete(sel, defaultText){

    let autocom = new autoComplete({
        selector: sel,
        placeHolder: defaultText,
        data: {
            src: suggestions.sort(),
            cache: true,
        },
        resultItem: {
            highlight: true,
            class: 'dropdown-item'
        },
        resultsList: {
            class: 'dropdown-menu'
        },
        events: {
            input: {
                selection: (event) => {
                    const selection = event.detail.selection.value;
                    autocom.input.value = selection;
                }
            }
        }
    })

    return autocom;
};

