document.addEventListener('DOMContentLoaded', () => {
    const x = new URLSearchParams(window.location.search);
    const productId = x.get('id');

    console.log(x);

    fetch(`https://apis.nervesys.com/api/64190077-3c01-4874-8d8c-ff06e26712b1`)
        .then(response => response.json())
        .then(data => {
            const product = data.items.find(item => item.product_id == productId);
            
            if (product) {
                const productDetailsElement = document.querySelector('.details');
                productDetailsElement.innerHTML = `
                    <div class="section-title">
                        <h2>${product.product_name}</h2>
                    </div>
                    <div class="product-center">
                        <div class="about-product">
                            <div class="product-image">
                                <img src="${product.product_image}" alt="Product Image">
                            </div>
                            <h1 class="price2">Price: ${product.product_price}</h1>
                            <h3 class="description">${product.product_description}</h3>
                        </div>
                        <div class="product-gallery">
                            <img src="${product.product_gallery.image1}" alt="img">
                            <img src="${product.product_gallery.image2}" alt="img">
                            <img src="${product.product_gallery.image3}" alt="img">
                        </div>
                    </div>
                `;
            } else {
                console.error('Product not found');
            }
        })
        .catch(error => console.error('Error', error));
});


