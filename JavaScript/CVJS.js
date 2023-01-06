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

    let finishedPerson = _assemblePerson(rando.results[0], loreAbout, randomSkills, randomexperiences, randomlanguages, randomeducations);
    console.log(finishedPerson);
    
    //Pass the finished object to the HTML
}


async function _generateRandomPerson(){
    var _randomPersonData;

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
    let possibleExperiences = ["Asistente","Pasante"];

    if(gender == "male"){
        possibleExperiences.push("Tecnico","Programador","Investigador");
    }else{
        possibleExperiences.push("Tecnica","Programadora","Investigadora");
    }

    possibleExperiences = possibleExperiences.sort((a,b) => 0.5 - Math.random());

    for(let i = 0; i < total; i++){
        experiences.push({
            experience: possibleExperiences.pop(),
            description: paras[i]
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
            institution: possibleInstitutions.pop()
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