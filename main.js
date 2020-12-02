
const urlApi = 'https://itunes.apple.com/search?media=music&attribute=artistTerm&term='
const audioPlayer = document.querySelector('#media-player')
const cardHolder = document.querySelector('#card-holder')
const form = document.querySelector('#search-field')
const searchTerm = document.querySelector('input')

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

  const collectionName = document.createElement('div')
  collectionName.classList.add('collection')
  newCard.appendChild(collectionName)

  const artistName = document.createElement('div')
  artistName.classList.add('artist-name')
  newCard.appendChild(artistName)

  trackImage.innerHTML = `<img class='image' data-target=${track.previewUrl} data-title="${track.trackName}" src=${track.artworkUrl100}></img>`
  trackTitle.innerHTML = track.trackName
  collectionName.innerHTML = track.collectionName
  // artistName.innerHTML = track.artistName
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
  audioPlayer.classList.remove('hideme')
  const audioValue = event.target.dataset.target
  const titleValue = event.target.dataset.title
  audioPlayer.innerHTML = `<audio controls autoplay src=${audioValue}></audio><div class='title-playing'>Now Playing<p>${titleValue}</p></div>`
})

form.addEventListener('submit', function (event) {
  event.preventDefault()
  cardHolder.innerHTML = ''
  audioPlayer.innerHTML = ''
  getTracks(searchTerm.value)
  searchTerm.value = ''
})
