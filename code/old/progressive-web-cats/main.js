const imageContainer = document.querySelector('.image-container')
const image = new Image()
imageContainer.appendChild(image)

fetch('https://cataas.com/cat', { cache: 'no-store' })
  .then(response => response.blob())
  .then(blob => URL.createObjectURL(blob))
  .then(url => {
    image.src = url
  })
