const username = sessionStorage.getItem('keyUsername')

$('#logout').text(username)

$('#logout').on({
    mouseover: function(){
        $(this).text('Logout')
        $(this).css({
            "background": "#e3642a",
            "color": "white",
            "border-radius": "10px"
        })
    },
    mouseout: function(){
        $(this).text(username)
    },
    click: function(){
        sessionStorage.removeItem('keyUsername')
        sessionStorage.removeItem('keyPassword')
        location.href = "login.html"
    }
})

const productsData = async () => {
    const productsUrl = 'https://mocki.io/v1/c2e7d692-1f0b-4e7c-b98f-ca488f703abc'
     
    const response = await fetch(productsUrl)
    const data = await response.json()
    console.log(data)

    const arrayOfProducts = data.items
    
    const product = sessionStorage.getItem('product_id')
    showProducts(arrayOfProducts)
}

window.onload = function() {
    productsData();
}


const showProducts = products => {
    const productsDiv = document.querySelector('.products-center');

    products.forEach(product => {
        const productHTML = `
            <div class="img-container">
                <img class="product-img" src="${product.product_image}" alt="${product.product_name}">
                <h3>${product.product_name}</h3>
                <h4>$${product.product_price}</h4>
            </div>
        `;
        productsDiv.innerHTML += productHTML;
        console.log(productHTML)
    });
}
