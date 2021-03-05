
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

const addInformation = (country) => {
    
    // elementos
    const name = document.getElementById('name');
    const population = document.getElementById('population')
    const capital = document.getElementById('capital');
    const continent = document.getElementById('continent');

    name.innerHTML = country.translations.pt;
    population.innerHTML = country.population;
    capital.innerHTML = country.capital;
    continent.innerHTML = country.region;
};

const addImage = (country = 'brazil') => {
    

    fetch(Endpoint.setName(country)).then((response) => {
        return response.json();
    }).then((request) => {
        const countries = request[0]
        const imageURL = countries.flag;
        const name_pt = countries.translations.pt;

        image.src = imageURL;
        image.alt = `Bandeira do ${name_pt}`

        addInformation(countries);
    }).then(() => {
        // tirando o hidden
        const elements = document.getElementsByClassName('hidden')
        for (let i = 0; i < 2; i++) {
            elements[i].classList.remove('hidden');
        }
    });
}

const all = () => {

    const datalist = document.getElementById('listcountries');
    let allCountries = [];

    fetch(Endpoint.all).then(response => {
        return response.json();
    }).then((request) => {
       request.forEach(country => {
            datalist.innerHTML += `
                <option>${country.name}</option>
            `;
            allCountries.push(country.name);
       });
    });

    return allCountries;
}

const arrayCountries = all();

const App = {
    init(event) {
        App.submit(event);
    },

    submit(event) {
        event.preventDefault();
        const query = document.getElementById('search').value;

        if (arrayCountries.indexOf(query) != -1) {
            addImage(query)
        } else {
            alert("O país não existe! Digite o nome do país em inglês.")
        }
    }
}