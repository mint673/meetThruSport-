const resultsPerPage = 12;
let data = document.getElementById('peopleData');
let peopleData = data.dataset.people;
console.log(peopleData);
let people = jQuery.parseJSON(peopleData);

$('#pagination-bar').twbsPagination({
    totalPages: 5,
    visiblePages: 3,
    initiateStartPageClick: true,
    onPageClick: function (event, page) {
        document.getElementById('page-content').innerHTML = "<span></span>";
        for (let i=(page-1)*resultsPerPage; i<page*resultsPerPage; i++) {

            let person;

            if (people[i] != null) {
                person = people[i];
            } else {
                break;
            }

            let sportSection = `<ul class="list-group">`;

            for (let sport of person.sports) {
                console.log(sport.name);
                sportSection += 
                    `<li class="list-group-item"> 
                        <span class="badge bg-secondary">${sport.name}</span> 
                        <span class="level">${sport.level}</span>
                    </li>`;
            }
            sportSection += '</ul>';

            $('#page-content').append(
                `<div class="col-lg-3 col-md-4 col-sm-6 card-wrapper">  
                <div class="card overflow-auto">
                    <div class="card-body">
                        <h5 class="card-title">${people[i].name}</h5>
                        <div class="card-subtitle mb-2 text-muted">${people[i].contact}</div>
                        <p class="card-text overflow-auto">"${people[i].info}"</p>
                        ${sportSection}
                    </div>
                </div>
                </div>`
            );
        }
    }
});
