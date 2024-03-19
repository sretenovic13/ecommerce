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
    console.log(response);
    const data = await response.json()

    const arrayOfProducts = data.items

    const product = sessionStorage.getItem('product_id')
    

    for(let i = 0; i < arrayOfProducts.length; i++){
        if(product == arrayOfProducts[i].product_id){
            showProducts(arrayOfProducts[i])
        }
    }
    console.log(arrayOfProducts);
}

    productsData()
