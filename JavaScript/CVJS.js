_preparePage();




async function _preparePage(){
    //Collect all the data from the different APIs
    let rando;
    rando = await _generateRandomPerson();
    

    let loreAbout;
    loreAbout = await _generateRandomParagraphs(3);

    let randomSkills = _generateSkills();
    let randomexperiences = await _generateExperience(rando.results[0].gender);
    let randomlanguages = _generateLanguages();
    let randomeducations = _generateEducations();

    //Create a person to show in the main page
    let finishedPerson = _assemblePerson(rando.results[0], loreAbout, randomSkills, randomexperiences, randomlanguages, randomeducations);
    
    //Pass the finished object to the HTML
    _displayPerson(finishedPerson);
}

function _displayPerson(person){
    //Header
    document.getElementById("person-picture").setAttribute("src", person.picture.large);
    document.getElementById("person-name").innerHTML= person.name.first + " " + person.name.last;
    document.getElementById("person-location").innerHTML= person.location.city + ", " + person.location.state + ", " + person.location.country;
    document.getElementById("person-email").innerHTML= person.contact.email;
    document.getElementById("person-cell").innerHTML= person.contact.phone;


    //Main Section
    //Prepare data
    //About
    document.getElementById("about-paragraph").innerHTML = person.about;

    //Education
    let template = document.getElementById("education-template");
    let target = document.getElementById("education-section");
    person.education.forEach(function(education) {

        clone = template.content.cloneNode(true);
        title = clone.querySelector(".education-title");
        institution = clone.querySelector(".education-institution");
        duration = clone.querySelector(".education-duration");

        title.textContent = education.education;
        institution.textContent = education.institution;
        duration.textContent = education.from + " - " + education.to;

        target.appendChild(clone);

    });
    //Experience
    template = document.getElementById("experience-template");
    target = document.getElementById("experience-section");
    person.experience.forEach(function(experience) {

        clone = template.content.cloneNode(true);
        title = clone.querySelector(".experience-title");
        company = clone.querySelector(".experience-company");
        duration = clone.querySelector(".experience-duration");
        description = clone.querySelector(".experience-description");

        title.textContent = experience.title;
        company.textContent = experience.company;
        duration.textContent = experience.from + " - " + experience.to;
        description.textContent = experience.description;
        

        target.appendChild(clone);
    });

    //Skills
    template = document.getElementById("skill-template");
    target = document.getElementById("skill-list");
    person.skills.forEach(function(skill) {

        clone = template.content.cloneNode(true);
        _skill = clone.querySelector(".skill-name");
        level = clone.querySelector(".skill-level");

        _skill.textContent = skill.skill;
        level.textContent = skill.level;
        

        target.appendChild(clone);
    });

    target = document.getElementById("language-list");
    person.languages.forEach(function(language) {

        clone = template.content.cloneNode(true);
        _language = clone.querySelector(".skill-name");
        level = clone.querySelector(".skill-level");

        _language.textContent = language.language;
        level.textContent = language.level;
        

        target.appendChild(clone);
    });

    //Show the about section
    document.getElementById("about-section").style.display = 'block';

    //Bind the navbar events
    document.getElementById("about-link").addEventListener("click",function(){
        _showSection("about-section");
    });
    document.getElementById("education-link").addEventListener("click",function(){
        _showSection("education-section");
    });
    document.getElementById("experience-link").addEventListener("click",function(){
        _showSection("experience-section");
    });
    document.getElementById("skills-link").addEventListener("click",function(){
        _showSection("skills-section");
    });
    
    
}

async function _generateRandomPerson(){
    var randomPersonData;

    await $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json'        
      })
      .done(function(data){
        randomPersonData = data;
      });

    return randomPersonData;
};

async function _generateRandomParagraphs(numberOfParagraphs){
    var randomParas;
    let connectionString = "https://baconipsum.com/api/?type=meat-and-filler&paras=";
    if(numberOfParagraphs <= 0){
        connectionString = connectionString.concat("1");
    }else{
        connectionString = connectionString.concat(numberOfParagraphs.toString());
    }
    await $.get(connectionString, (data, status) => {
        randomParas = data;
    });

    return randomParas;
}

async function _generateExperience(gender){
    let total = Math.random() * (4 - 1) + 1;
    total = Math.trunc(total);
    let experiences = [];
    
    let paras = await _generateRandomParagraphs(total);
    let possibleCompanies = ["Globant", "INFOSIS", "IBM", "Microsoft", "Apple"];
    let possibleExperiences = ["Asistente","Pasante"];

    if(gender == "male"){
        possibleExperiences.push("Tecnico","Programador","Investigador");
    }else{
        possibleExperiences.push("Tecnica","Programadora","Investigadora");
    }

    possibleExperiences = possibleExperiences.sort((a,b) => 0.5 - Math.random());
    possibleCompanies = possibleCompanies.sort((a,b) => 0.5 - Math.random());

    for(let i = 0; i < total; i++){
        experiences.push({
            title: possibleExperiences.pop(),
            company: possibleCompanies.pop(),
            description: paras[i],
            from: "mm/yyyy",
            to: "mm/yyyy"
        });
    }

    return experiences;
}

function _generateSkills(){
    let total = Math.random() * (4 - 1) + 1;
    total = Math.trunc(total);
    let levels = ["Basico","Intermedio","Avanzado"];
    let possibleSkills = ["C","C++","C#","Java","HTML","CSS","JavaScript","SQL","Git","Perforce"];
    possibleSkills = possibleSkills.sort((a, b) => 0.5 - Math.random());
    let skills = [];
    for (let i = 0; i < total; i++){
        randomLevel = Math.random() * (levels.length - 1) + 1;
        randomLevel = Math.trunc(randomLevel);
        skills.push({
            skill: possibleSkills.pop(),
            level: levels[randomLevel]
        });
    }
    return skills;
}

function _generateEducations(){
    let total = Math.random() * (4 - 1) + 1;
    total = Math.trunc(total);
    let possibleEducations = ["Tecnicatura en sistemas informaticos","Ingenieria Civil","Licenciatura en Psycologia","Doctorado en astrofisica"];
    possibleEducations = possibleEducations.sort((a, b) => 0.5 - Math.random());
    let possibleInstitutions = ["UBA", "Universidad del Centro", "Instituto Balseiro","Universidad Nacional de Cuyo"];
    possibleInstitutions = possibleInstitutions.sort((a, b) => 0.5 - Math.random());
    let educations = [];
    for (let i = 0; i < total; i++){
        educations.push({
            education: possibleEducations.pop(),
            institution: possibleInstitutions.pop(),
            from: "mm/yyyy",
            to: "mm/yyyy"
        });
    }
    return educations;
}

function _generateLanguages(){
    let total = Math.random() * (4 - 1) + 1;
    total = Math.trunc(total);
    let levels = ["Basico","Intermedio","Avanzado"];
    let possibleLanguages = ["Español","Ingles","Holandes","Aleman","Portugues"];
    possibleLanguages = possibleLanguages.sort((a, b) => 0.5 - Math.random());
    let languages = [];
    for (let i = 0; i < total; i++){
        randomLevel = Math.random() * (levels.length - 1) + 1;
        randomLevel = Math.trunc(randomLevel);
        languages.push({
            language: possibleLanguages.pop(),
            level: levels[randomLevel]
        });
    }
    return languages;
}

function _assemblePerson(individual, ranAbout, ranSkills, ranExpirience, ranLanguages, ranEducations){
    let person = {
        name:{
            first: individual.name.first,
            last: individual.name.last
        },
        location:{
            city: individual.location.city,
            state: individual.location.state,
            country: individual.location.country,
        },
        picture: {
            medium: individual.picture.medium,
            large: individual.picture.large
        },
        contact:{
            email: individual.email,
            phone: individual.cell
        },
        about: ranAbout,
        skills: ranSkills,
        experience: ranExpirience,
        languages: ranLanguages,
        education: ranEducations 
    };


    return person;
}

function _hideAll(){
    document.getElementById("about-section").style.display='none';
    document.getElementById("education-section").style.display='none';
    document.getElementById("experience-section").style.display='none';
    document.getElementById("skills-section").style.display='none';
}

function _showSection(section){
    _hideAll();

    document.getElementById(section).style.display = 'block';
}

