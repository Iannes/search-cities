const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = []
const body = document.querySelector('body')
const form = document.querySelector('.search-form')


document.addEventListener("DOMContentLoaded", function () {
  body.classList.add('fade-in')
  form.classList.add('loaded')
});


fetch(endpoint)
  .then(res => res.json())
  .then(data => cities.push(...data))


function findMatch(wordToMatch, cities) {

  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi')
    return place.city.match(regex) || place.state.match(regex)
  })
}

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function showResults() {

  const matchArray = findMatch(this.value, cities)
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi')
    const city = place.city.replace(regex, `<span class="highlight">${this.value}</span>`)
    const state = place.state.replace(regex, `<span class="highlight">${this.value}</span>`)
    return `

     <li>
        <span class="name">${city}, ${state}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>

      `
  }).join('')

  searchResults.innerHTML = html
}

const searchInput = document.querySelector('.search')
const searchResults = document.querySelector('.search-results')


searchInput.addEventListener('change', showResults)
searchInput.addEventListener('keyup', showResults)