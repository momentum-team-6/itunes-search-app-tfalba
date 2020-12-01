
const urlApi = 'https://itunes.apple.com/search?media=music&attribute=artistTerm&term='
const audioPlayer = document.querySelector('#media-player')
const body = document.querySelector('body')


//https://itunes.apple.com/search?term=john%2Blegend

function getTracks (artist) {
  const url = urlApi + encodeURI(artist)
  // console.log(`${url}&media=music&entity=musicArtist`)
  fetch (url)
    .then(res => res.json())
    .then(user => {
      for (const result of user.results) {
        console.log(result.collectionName)
        renderTrack(result)
      }
      console.log(urlApi+artist)
      console.log(url)
      // debugger
      // for (let song of user) {
      //   console.log(song.collectionName)
      // }
    }
    )
    // body.classList.remove('background-img')
}
// function getAudio (obj) {
//   // a fetch request here for the selected item -- this may be a reason to post locally??
//   // so that can get from local?? 
// }
const cardHolder = document.querySelector('#card-holder')
cardHolder.addEventListener('click', function (event) {
  // getAudio (objTarget) -- don't need this with below
// (figure out if this will pull the assigned value)
  const audioValue = event.target.dataset.target
  debugger
  audioPlayer.innerHTML = `<audio controls autoplay src=${audioValue}></audio>`
})
// could asign a value during rendering to be able to pull the fetch url
// something like =>
// trackImage.innerHTML = `<img class='image' value=${track.previewUrl} src=${track.artworkUrl100}></img>`

function renderTrack(track) {
  const newCard = document.createElement('div')
  newCard.classList.add('card')
  cardHolder.appendChild(newCard)

  const trackImage = document.createElement('div')
  trackImage.classList.add('image-div')
  newCard.appendChild(trackImage)

  const trackTitle = document.createElement('div')
  trackTitle.classList.add('title')
  newCard.appendChild(trackTitle)

  // const collectionName = document.createElement('div')
  // collectionName.classList.add('collection')
  // newCard.appendChild(collectionName)

  trackImage.innerHTML = `<img class='image' data-target=${track.previewUrl} src=${track.artworkUrl100}></img>`
  trackTitle.innerHTML = track.trackName
  // collectionName.innerHTML = track.collectionName
}

const form = document.querySelector('#search-field')
const searchTerm = document.querySelector('input')
form.addEventListener('submit', function (event) {
  event.preventDefault()
  console.log(login.value)
  getTracks(searchTerm.value)
})
