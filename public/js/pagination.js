const resultsPerPage = 8;
let data = document.getElementById('peopleData');
let peopleData = data.dataset.people;
let people = jQuery.parseJSON(peopleData);
let numPages = Math.floor((people.length - 1) / resultsPerPage) + 1;

$('#pagination-bar').twbsPagination({
    totalPages: Math.max(numPages,1),
    visiblePages: Math.min(1, numPages, 3),
    initiateStartPageClick: true,
    onPageClick: function (event, page) {
        document.getElementById('page-content').innerHTML = "<span></span>";
        
        let isEmpty = true;

        for (let i=(page-1)*resultsPerPage; i<page*resultsPerPage; i++) {

            let person;

            if (people[i] != null) {
                person = people[i];
                isEmpty = false;
            } else {
                break;
            }

            let sportSection = `<ul class="list-group">`;

            for (let sport of person.sports) {
                sportSection += 
                    `<li class="sport-info"> 
                        <span class="badge bg-info">${sport.name}</span>
                        -
                        <span class="level">${sport.level}</span>
                    </li>`;
            }
            sportSection += '</ul>';

            $('#page-content').append(
                `<div class="col-lg-3 col-md-4 col-sm-6 card-wrapper">  
                <div class="card overflow-auto text-dark">
                    <div class="card-body">
                        <h5 class="card-title">${people[i].name}</h5>
                        <div class="card-subtitle mb-2 text-muted">${people[i].contact}</div>
                        <p class="card-text overflow-auto"><b>"</b>${people[i].info}<b>"</b></p>
                        ${sportSection}
                    </div>
                </div>
                </div>`
            );
        }

        if (isEmpty) {
            document.getElementById('page-content').innerHTML = "No person found, please make sure that your spelling matches one in the drop-down menu. or it could be that currently no user plays this sport :(";
        }
    }
});
