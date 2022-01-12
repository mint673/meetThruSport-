
const addSportButton = document.getElementById("add-sport-button");
const listOfSport = document.getElementById("list-of-sport");

let numSports = 1;
addSportButton.onclick = (ev => {
    numSports++;
    let sportField = document.createElement('li');
    sportField.innerHTML = 
    '<li><input type="text" name="sport" value="sport"> <input type="text" name="level" value="skill level">\n <div class="remove-sport-btn">remove</div>';
    listOfSport.appendChild(sportField);
})
