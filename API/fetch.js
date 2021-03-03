const Endpoint = {

    all: "https://restcountries.eu/rest/v2/all",
    name: "https://restcountries.eu/rest/v2/name/{}",
    capital: "https://restcountries.eu/rest/v2/capital/{}",
    region: "https://restcountries.eu/rest/v2/region/{}",
    language: "https://restcountries.eu/rest/v2/lang/{}",

    setName(name) {
        return Endpoint.name.replace("{}", name);
    },

    setCapital(capital) {
        return Endpoint.capital.replace("{}", capital);
    },

    setRegion(region) {
        return Endpoint.capital.replace("{}", region);
    },

    setLang(lang) {
        return Endpoint.language.replace("{}", lang);
    }
}

const addImage = (country = 'brazil') => {
    
    let image = document.getElementById('country-flag');

    fetch(Endpoint.setName(country)).then((response) => {
        return response.json();
    }).then((myBlob) => {
        let imageURL = myBlob[0].flag;
        image.src = imageURL;
    }).then(() => {
        // tirando o visibility hidden
        image.classList.remove('country');
    });
}

const App = {
    init(event) {
        App.submit(event);
    },

    submit(event) {
        event.preventDefault();
        const query = document.getElementById('search').value;

        try {
            addImage(query);
        } catch (e) {
            alert("A bandeira não foi encontrada!");
        }
    }
}

