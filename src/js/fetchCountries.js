import Country from "../templates/country.hbs"
import Countries from "../templates/countries.hbs"
import "@pnotify/core/dist/BrightTheme.css"
const { alert, notice, info, success, error } = require("@pnotify/core")

const debounce = require("lodash.debounce")
// const pnotify = require("pnotify")

const inputCountry = document.querySelector(".search-input")
const countryContainer = document.querySelector(".js-container")

/*
1. повесить событие input на inputCountry
2. считать то что ввел человек.
3. создать полный url = basicURL + то, что ввел человек
4. отправить GET-запрос по полному адресу.
5. 
*/

const basicURL = "https://restcountries.eu/rest/v2/name"

inputCountry.addEventListener("input", debounce(onInput, 500))

function onInput(e) {
  const countryName = this.value
  const fullURL = `${basicURL}/${countryName}`
  const countryRequest = fetch(`${fullURL}`)

  countryRequest
    .then((response) => {
      if (!response.ok) {
        throw new Error("Хрень какая-та")
      }
      return response.json()
    })
    .then((result) => {
      if (result.length > 10) {
        onError("Слишком много стран подходящих под запрос! Укоротите")

        // countryContainer.innerHTML = "Слишком много стран подходящих под запрос! Укоротите"
      } else if (result.length > 1 && result.length <= 10) {
        countryContainer.innerHTML = Countries(result)
      } else if (result.length === 1) {
        countryContainer.innerHTML = Country(result[0])
      }
    })
    .catch((error) => {
      onError("че за хрень?")
    })
}

function onError(message) {
  error({ delay: 1000, text: message })
}

export default countryContainer
