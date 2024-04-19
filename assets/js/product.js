document.addEventListener('DOMContentLoaded', () => {
    const x = new URLSearchParams(window.location.search)
    const productId = x.get('id')

    fetch(`https://apis.nervesys.com/api/de3333b1-fcb1-4dfb-a606-7e813249790e`)
        .then(response => response.json())
        .then(data => {
            const product = data.items.find(item => item.product_id == productId)
            
            if (product) {
                const productDetailsElement = document.querySelector('.details')
                productDetailsElement.innerHTML = `
                    <div class="section-title">
                        <h2>${product.product_name}</h2>
                    </div>
                    <div class="product-center">
                        <div class="about-product">
                            <div class="product-image">
                                <img class="img4" src="${product.product_image}" alt="Product Image">
                            </div>
                            <div class="product-description">
                                <h3 class="description">${product.product_description}</h3>
                                <h1 class="price2">Price: ${product.product_price}$</h1>
                            </div>
                        </div>
                        <div class="product-gallery">
                            <img class="img4" src="${product.product_gallery.image1}" alt="img">
                            <img class="img4" src="${product.product_gallery.image2}" alt="img">
                            <img class="img4" src="${product.product_gallery.image3}" alt="img">
                        </div>
                    </div>
                `
                
    const images = document.querySelectorAll('.img4')
        images.forEach((image, index) => {
            image.addEventListener('click', () => {
                    showFullScreen(image, index, images)
                    })
                })
            } else {
                console.error('Nisam uvelicao sliku')
            }
        })
        .catch(error => console.error('Error', error))
});


function showFullScreen(image, index, images) {
    const overlay = document.createElement('div')
    overlay.classList.add('overlay')

    const imgFullScreen = document.createElement('img')
    imgFullScreen.src = image.src;
    imgFullScreen.classList.add('full-screen-image')
    
    const closeButton = document.createElement('span')
    closeButton.innerHTML = '&#10005;'
    closeButton.classList.add('close-button')
    closeButton.addEventListener('click', () => {
        document.body.removeChild(overlay)
    });

    const nextButton = document.createElement('span')
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>'
    nextButton.classList.add('next-button')
    nextButton.addEventListener('click', () => {
        const nextIndex = (index + 1) % images.length
        showFullScreen(images[nextIndex], nextIndex, images)
    })

    const prevButton = document.createElement('span')
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>'
    prevButton.classList.add('prev-button')
    prevButton.addEventListener('click', () => {
        const prevIndex = (index - 1 + images.length) % images.length
        showFullScreen(images[prevIndex], prevIndex, images) 
    })

    overlay.appendChild(imgFullScreen)
    overlay.appendChild(closeButton)
    overlay.appendChild(nextButton)
    overlay.appendChild(prevButton)
    document.body.appendChild(overlay)
}