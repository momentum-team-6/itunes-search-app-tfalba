
const urlApiArtist = 'https://itunes.apple.com/search?media=music&attribute=artistTerm&term='
const urlApiSong = 'https://itunes.apple.com/search?media=music&attribute=songTerm&term='
const urlApiAlbum = 'https://itunes.apple.com/search?media=music&attribute=albumTerm&term='
const urlApiAll = 'https://itunes.apple.com/search?media=music&term='

// const urlApiArtist = 'https://itunes-api-proxy.glitch.me/search?media=music&attribute=artistTerm&term='
// const urlApiSong = 'https://itunes-api-proxy.glitch.me/search?media=music&attribute=songTerm&term='
// const urlApiAlbum = 'https://itunes-api-proxy.glitch.me/search?media=music&attribute=albumTerm&term='
// const urlApiAll = 'https://itunes-api-proxy.glitch.me/search?media=music&term='

const audioPlayer = document.querySelector('#media-player')
const cardHolder = document.querySelector('#card-holder')
const form = document.querySelector('#search-field')
const searchTerm = document.querySelector('input')
const selector = document.querySelector('#selector')
const sortField = document.querySelector('#sort-field')

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                   JSON Retrieval                                                   */
/* ------------------------------------------------------------------------------------------------------------------ */
let originalArray = []
function runSearch (url) {
  originalArray = []
  fetch (url)
    .then(res => res.json())
    .then(data => {
      // validateSearch(data)
      for (const result of data.results) {
        if (result.collectionName !== undefined) {
          originalArray.push(result)
          // renderTrack(result)
        }
      }
      const newArray = originalArray.sort(song)
      for (let i = 0; i < newArray.length; i++) {
        // console.log('am i getting to this line?')
        renderTrack(newArray[i])
      }
      if (originalArray.length === 0) {
        renderTrack(originalArray)
      } else {
        sortField.classList.remove('hideme')
      }
    })
}

/* ------------------------------- Now renderTrack over whichever array is appropriate ------------------------------ */
function artist (a, b) {
  // Use toUpperCase() to ignore character casing
  const varA = a.artistName.toUpperCase()
  const varB = b.artistName.toUpperCase()
  let comparison = 0
  if (varA > varB) {
    comparison = 1
  } else if (varA < varB) {
    comparison = -1
  }
  return comparison
}
function album (a, b) {
  // Use toUpperCase() to ignore character casing
  const varA = a.collectionName.toUpperCase()
  const varB = b.collectionName.toUpperCase()
  let comparison = 0
  if (varA > varB) {
    comparison = 1
  } else if (varA < varB) {
    comparison = -1
  }
  return comparison
}

function song (a, b) {
  // Use toUpperCase() to ignore character casing
  const varA = a.trackName.toUpperCase()
  const varB = b.trackName.toUpperCase()
  let comparison = 0
  if (varA > varB) {
    comparison = 1
  } else if (varA < varB) {
    comparison = -1
  }
  return comparison
}


function getTracks (keyword, selector) {
  if (selector === 'artist') {
    const url = urlApiArtist + encodeURI(keyword)
    console.log('running artist search')
    runSearch(url)
  } else if (selector === 'song') {
    const url = urlApiSong + encodeURI(keyword)
    runSearch(url)
  } else if (selector === 'album') {
    const url = urlApiAlbum + encodeURI(keyword)
    runSearch(url)
  } else if (selector === 'all') {
    const url = urlApiAll + encodeURI(keyword)
    runSearch(url)
  }
}

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                  DOM Manipulation                                                  */
/* ------------------------------------------------------------------------------------------------------------------ */

// change track input to be input from whichever array want to display after sort
// track is just the originalArray[i]

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

  // debugger
  if (originalArray.length === 0) {
    cardHolder.innerHTML = 'Your search has returned no results. Please try a new one.'
    console.log('no results')
  } else {
    trackImage.innerHTML = `<img class='image' data-target=${track.previewUrl} data-title="${track.trackName}" src=${track.artworkUrl100}></img>`

    trackTitle.innerHTML = track.trackName

    const trackYear = track.releaseDate.slice(0,4)
    collectionName.innerHTML = `${track.collectionName} (${trackYear})`
    artistName.innerHTML = track.artistName
  }
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
const pastTargets = []
cardHolder.addEventListener('click', function (event) {
  if (typeof (event.target.dataset.target) === 'string') {
    pastTargets.push(event.target)
    audioPlayer.classList.remove('hideme')
    const audioValue = event.target.dataset.target
    const titleValue = event.target.dataset.title
    if (pastTargets[pastTargets.length - 1] === (pastTargets[pastTargets.length - 2])) {
      if (pastTargets[pastTargets.length - 1] === (pastTargets[pastTargets.length - 3])) {
        audioPlayer.innerHTML = `<audio controls autoplay src=${audioValue}></audio><div class='title-playing'>Now Playing<p>${titleValue}</p></div>`
      } else {
        audioPlayer.innerHTML = `<audio controls src=${audioValue}></audio><div class='title-playing'>Now Playing<p>${titleValue}</p></div>`
      }
    } else {
      audioPlayer.innerHTML = `<audio controls autoplay src=${audioValue}></audio><div class='title-playing'>Now Playing<p>${titleValue}</p></div>`
    }
  }
})

form.addEventListener('submit', function (event) {
  event.preventDefault()
  cardHolder.innerHTML = ''
  audioPlayer.innerHTML = ''
  
  if (selector.children[0].checked === true) {
    console.log('artist is selected')
    getTracks(searchTerm.value, 'artist')
  } else if (selector.children[2].checked === true) {
    console.log('song is selected')
    getTracks(searchTerm.value, 'song')
  } else if (selector.children[4].checked === true) {
    console.log('album is selected')
    getTracks(searchTerm.value, 'album')
  } else {
    console.log('defaulting to any')
    getTracks(searchTerm.value, 'all')
  }
  // else return error message???

  //getTracks(searchTerm.value, selector)
  searchTerm.value = ''
})
