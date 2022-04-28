import { fetchCountries } from "./fetchCountries.js";

import Notiflix from 'notiflix';
import _ from "lodash";

import countryCard from "./country-card.hbs";
import countryList from "./country-list.hbs";


const DEBOUNCE_DELAY = 300;

const refs = {
    countryInfoEl: document.querySelector(".country-info"),
    countryListEl: document.querySelector(".country-list"),
    searchBoxEl: document.querySelector("#search-box"),
}

refs.searchBoxEl.addEventListener("input", _.debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    const input = e.target.value;
    if (input === "") {
        refs.countryListEl.innerHTML = "";
        refs.countryInfoEl.innerHTML = "";
        return;
    }
    fetchCountries(input).then(renderCountryView);
};

function renderCountryView(countries) {
    if (countries.length > 10) {
        refs.countryListEl.innerHTML = "";
        refs.countryInfoEl.innerHTML = "";
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    } else if (countries.length <= 10 && countries.length > 1) {
        renderCountryList(countries)
    } else {
        renderCountryCard(countries)
    };
}

function renderCountryList(countries) {
    refs.countryInfoEl.innerHTML = "";
    const markup = countryList(countries)
    refs.countryListEl.innerHTML = markup;
}

function renderCountryCard(country) {
    refs.countryListEl.innerHTML = "";
    const markup = countryCard(country[0]);
    refs.countryInfoEl.innerHTML = markup;
};