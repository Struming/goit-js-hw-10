import debounce from 'lodash/debounce';
import fetchCountries from './fetchCountries.js';
import * as Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const showCountryList = (countries) => {
    // Очищаємо контейнер перед відображенням нового списку
    countryList.innerHTML = '';

    // Створюємо елементи списку для кожної країни і додаємо їх до контейнера
    countries.forEach(({ name, flags }) => {
    const listItem = document.createElement('li');
    const flagImg = document.createElement('img');
    flagImg.src = flags.svg;
    flagImg.alt = 'Flag';
    const countryName = document.createTextNode(name);

    listItem.appendChild(flagImg);
    listItem.appendChild(countryName);
    countryList.appendChild(listItem);
    });
};

const showCountryInfo = (country) => {
    const { name, capital, population, languages, flags } = country;

    const markupInfo = `
    <div class="country-card">
        <h2>${name}</h2>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${languages.join(', ')}</p>
        <img class="flag-image" src="${flags.svg}" alt="Flag" />
    </div>
    `;
    countryInfo.innerHTML = markupInfo;
};

const handleSearch = async () => {
    const searchTerm = searchBox.value.trim();

    if (searchTerm === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
    }

    try {
    const countries = await fetchCountries(searchTerm);
    if (countries.length > 10) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length === 1) {
        showCountryInfo(countries[0]);
        countryList.innerHTML = '';
    } else {
        showCountryList(countries);
        countryInfo.innerHTML = '';
    }
    } catch (error) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    Notiflix.Notify.failure('Oops, there is no country with that name');
    }
};

searchBox.addEventListener('input', debounce(handleSearch, 300));
