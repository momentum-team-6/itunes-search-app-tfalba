/* ------------------------------------------------------------------------------------------------------------------ */
/*                                          Set elements that will be grabbed                                         */
/* ------------------------------------------------------------------------------------------------------------------ */

const audioPlayer = document.querySelector('#media-player')
const cardHolder = document.querySelector('#card-holder')
const form = document.querySelector('#search-field')
const searchTerm = document.querySelector('input')
const selector = document.querySelector('#selector')
const sortField = document.querySelector('#sort-field')
const sortOptions = document.querySelector('#sort-options')
let originalArray = []

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                   JSON Retrieval                                                   */
/* ------------------------------------------------------------------------------------------------------------------ */

function runSearch (url) {
  originalArray = []
  // validateSearch(data)
  fetch (url)
    .then(res => res.json())
    .then(data => {

/* --------------------------------- Push data for each track to an array of objects -------------------------------- */

      for (const result of data.results) {
        if (result.collectionName !== undefined) {
          originalArray.push(result)
        }
      }

/* ---------------- Sort each array depending on sort feature criteria -- use callback sort functions --------------- */

/* -------------------------------- Either default or all sets new array as original -------------------------------- */

      let newArray = []
      if (sortOptions.value !== 'default') {
        if (sortOptions.value === 'artist') {
          newArray = originalArray.sort(artist)
        } else if (sortOptions.value === 'album') {
          newArray = originalArray.sort(album)
        } else if (sortOptions.value === 'song') {
          newArray = originalArray.sort(song)
        } else if (sortOptions.value === 'year') {
          newArray = originalArray.sort(year)
        } else {
          newArray = originalArray
        }
      } else {
        newArray = originalArray
      }

/* ------------------------------- Now renderTrack over whichever array is appropriate ------------------------------ */

      for (let i = 0; i < newArray.length; i++) {
        renderTrack(newArray[i])
      }
      if (originalArray.length === 0) {
        renderTrack(originalArray)
      } else {
        sortField.classList.remove('hideme')
      }
    })
}

/* ------------ Sets of combinations to set up for sort array based on whichever object key is being used ----------- */
/* ---------------------------------- Could turn this into a function for all four ---------------------------------- */

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
function year (a, b) {
  // Use toUpperCase() to ignore character casing
  const varA = a.releaseDate.toUpperCase()
  const varB = b.releaseDate.toUpperCase()
  let comparison = 0
  if (varA > varB) {
    comparison = 1
  } else if (varA < varB) {
    comparison = -1
  }
  return comparison
}

function getTracks (searchWord, selectionType) {
  const url = `https://itunes.apple.com/search?media=music&attribute=${selectionType}&term=${encodeURI(searchWord)}`
  runSearch(url)
}

/* ------------------------------------------------------------------------------------------------------------------ */
/*                                                  DOM Manipulation                                                  */
/* ------------------------------------------------------------------------------------------------------------------ */

function renderTrack (track) {
/* ------------------ Place new card in container and then append children to it for track details ------------------ */

  const newCard = document.createElement('div')
  newCard.classList.add('card')
  cardHolder.appendChild(newCard)

  const trackImage = document.createElement('div')
  trackImage.classList.add('image-div')
  newCard.appendChild(trackImage)

  const trackTitle = document.createElement('div')
  trackTitle.classList.add('title')
  newCard.appendChild(trackTitle)

  const collectionName = document.createElement('div')
  collectionName.classList.add('collection')
  newCard.appendChild(collectionName)

  const artistName = document.createElement('div')
  artistName.classList.add('artist-name')
  newCard.appendChild(artistName)

  /* ------------------------------------------------ Validation checks ----------------------------------------------- */
  if (originalArray.length === 0) {
    cardHolder.innerHTML = 'Your search has returned no results. Please try a new one.'
    console.log('no results')
  } else {
    /* -------------------------------------------- Else set content of card -------------------------------------------- */

    trackImage.innerHTML = `<img class='image' data-target=${track.previewUrl} data-title="${track.trackName}" src=${track.artworkUrl100}></img>`
    trackTitle.innerHTML = track.trackName
    const trackYear = track.releaseDate.slice(0,4)
    collectionName.innerHTML = `${track.collectionName} (${trackYear})`
    artistName.innerHTML = track.artistName
  }
}

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

  for (let i = 0; i <= 6; i++) {
    if (selector.children[i].checked === true) {
      console.log(`${selector.children[i].value} is selected as selector`)
      getTracks(searchTerm.value, selector.children[i].value)
    } else {
      console.log("SHOULDN'T BE HERE -- NO SELECTOR CHECKED")
    }
  }
})

sortOptions.addEventListener('change', function (event) {
  console.log("You've made it to sort! " + sortOptions.value)
  event.preventDefault()
  cardHolder.innerHTML = ''
  audioPlayer.innerHTML = ''

  for (let i = 0; i <= 6; i++) {
    if (selector.children[i].checked === true) {
      getTracks(searchTerm.value, selector.children[i].value)
    } else {
      console.log("SHOULDN'T BE HERE -- NO SELECTOR CHECKED FOR -- STUCK IN SORT FUNCTION")
    }
  }
})
