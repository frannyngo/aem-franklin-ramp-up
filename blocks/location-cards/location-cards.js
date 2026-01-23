export default function decorate(block) {
  block.id = 'contact-card'

  const container = document.getElementById('contact-card')
  const grid = document.createElement('div')
  grid.id = 'grid-container'
  grid.className = 'grid';
  
    [...container.children].forEach(element => {
      const gridItem = document.createElement('div')
      const imageContainer = document.createElement('div')
      const detailsContainer = document.createElement('div')

      imageContainer.className = 'imageContainer'
      detailsContainer.className = 'detailsContainer'

      const photo = element.firstElementChild
      const details = element.children[1];    

      [...photo.children].forEach((img, index)  => {
        const image = img.querySelector('img');
        // if there is 2 images, assign different classNames
        image.className = photo.children.length > 1? index === 0 ? 'firstImage'  : 'secondImage' : 'singleImage'
        imageContainer.append(image)
      });

      [...details.children].forEach(text => {
        const header = text.querySelector('strong');
        const phone = text.querySelector('a');

        if (!text.children.length) {
          // just a regular <p> 
          text.className = 'info'
          detailsContainer.append(text)
        } else if (header) {
          header.className = 'header'
          detailsContainer.append(header) 
        } else if (phone) {
          phone.className = 'phone'
          detailsContainer.append(phone)
        }
      })

      gridItem.append(imageContainer, detailsContainer)
      grid.append(gridItem)
  });


  block.replaceChildren(grid)
}
