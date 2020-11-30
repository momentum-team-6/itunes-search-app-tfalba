
const urlApi = 'https://itunes.apple.com/search?term='
const audioPlayer = document.querySelector('#audio-player')
function getTracks (artist) {
  fetch(urlApi + artist)
    .then(res => res.json())
    .then(user => {
      for (const result of user.results) {
        console.log(result.collectionName)
        renderTrack(result)
      }
      // debugger
      // for (let song of user) {
      //   console.log(song.collectionName)
      // }
    }
    )
}

const cardHolder = document.querySelector('#card-holder')
cardHolder.addEventListener('click', function(event) {
  audioPlayer.innerHTML = ``
})

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

  trackImage.innerHTML = `<img class='image' src=${track.artworkUrl100}></img>`
  trackTitle.innerHTML = track.trackName

}

const form = document.querySelector('#search-field')
const searchTerm = document.querySelector('input')
form.addEventListener('submit', function (event) {
  event.preventDefault()
  console.log(login.value)
  getTracks(searchTerm.value)
})
