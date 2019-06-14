const imageContainer = document.querySelector('#cat-picture')
const refreshButton = document.querySelector('#refresh')
const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']

const image = new Image()
imageContainer.appendChild(image)

refreshButton.addEventListener('click', () => {
  randomImage()
})

window.addEventListener('load', () => {
  randomImage()
})

function randomImage() {
  image.src = 'images/' + images[getRandomInt(0, images.length - 1)]
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
