
const urlApi = 'https://itunes.apple.com/search?media=music&attribute=artistTerm&term='
const audioPlayer = document.querySelector('#media-player')
const cardHolder = document.querySelector('#card-holder')
const form = document.querySelector('#search-field')
const searchTerm = document.querySelector('input')

// use body if decide to change background on submit
// const body = document.querySelector('body')

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                   JSON Retrieval                                                   */
/* ------------------------------------------------------------------------------------------------------------------ */

function getTracks (artist) {
  const url = urlApi + encodeURI(artist)
  fetch (url)
    .then(res => res.json())
    .then(data => {
      // validateSearch(data)
      for (const result of data.results) {
        renderTrack(result)
      }
    })
    // save for later if want to toggle background-img
    // body.classList.remove('background-img')
}

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                  DOM Manipulation                                                  */
/* ------------------------------------------------------------------------------------------------------------------ */

function renderTrack(track) {
  // validateInput(track)

  const newCard = document.createElement('div')
  newCard.classList.add('card')
  cardHolder.appendChild(newCard)

  const trackImage = document.createElement('div')
  trackImage.classList.add('image-div')
  newCard.appendChild(trackImage)

  const trackTitle = document.createElement('div')
  trackTitle.classList.add('title')
  newCard.appendChild(trackTitle)

/* ---------------------------- save this if want to add collection name or other details --------------------------- */

  // const collectionName = document.createElement('div')
  // collectionName.classList.add('collection')
  // newCard.appendChild(collectionName)

  trackImage.innerHTML = `<img class='image' data-target=${track.previewUrl} data-title='${track.trackName}' src=${track.artworkUrl100}></img>`
  trackTitle.innerHTML = track.trackName
  // collectionName.innerHTML = track.collectionName
}


/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                Validation Functions                                                */
/* ------------------------------------------------------------------------------------------------------------------ */

// function validateInput(inputTrack) {
//   // checks on what input looks like before adding --
//   if (inputTrack.trackTitle !== undefined) {
//   }
// }

// function validateSearch(searchData) {
//   // checks for search not returning 200
// }

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                   Event Listeners                                                  */
/* ------------------------------------------------------------------------------------------------------------------ */

cardHolder.addEventListener('click', function (event) {
  const audioValue = event.target.dataset.target
  const titleValue = event.target.dataset.title
  audioPlayer.innerHTML = `<audio controls autoplay src=${audioValue}></audio><div class='title-playing'><p>${titleValue}</p></div>`
})

form.addEventListener('submit', function (event) {
  event.preventDefault()
  cardHolder.innerHTML = ''
  getTracks(searchTerm.value)
  searchTerm.value = ''
})
