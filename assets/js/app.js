const cartBtn = document.querySelector('.cart-btn')
const closeCartBtn = document.querySelector('.close-cart')
const clearCartBtn = document.querySelector('.clear-cart')
const cartDOM = document.querySelector('.cart')
const cartOverlay = document.querySelector('.cart-overlay')
const cartItems = document.querySelector('.cart-items')
const cartTotal = document.querySelector('.cart-total')
const cartContent = document.querySelector('.cart-content')
const productsDOM = document.querySelector('.products-center')


let cart = []
let buttonsDOM = []

class Products {
    async getProducts(){
        try{
            const result = await fetch('https://mocki.io/v1/10d97c21-9e40-4ed7-b8d6-926f53beba48')
            const data = await result.json()
            let products = data.items
            products = products.map(item => {
                const {product_name,product_price,product_id,product_image} = item
                return {product_name,product_price,product_id,product_image}
            })
            return products
        }
        catch(error){
            console.log(error);
        }
    }
}


class UI {
    displayProducts(products) {
        let result = ''
        products.forEach(product => {
            result += `
            <article class="product">
                <div class="img-container">
                    <img class="product-img" src="${product.product_image}" alt="${product.product_name}">
                    <button class="bag-btn" data-id="${product.product_id}">
                        <i class="fas fa-shopping-cart"></i>
                        Add to cart
                    </button>
                </div>
                <h3>${product.product_name}</h3>
                <h4>$${product.product_price}</h4>
            </article>
            `
        })
        productsDOM.innerHTML = result
    }

    getBagButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')]
        buttonsDOM = buttons
        buttons.forEach(button => {
            let id = button.dataset.id
            let inCart = cart.find(item => item.id === id)
            if(inCart) {
                button.innerText = "In cart"
                button.disabled = true
            } else {
                button.addEventListener('click', event => {
                    event.target.innerText = "In cart"
                    event.target.disabled = true

                    let cartItem = {...Storage.getProduct(id), amount: 1}
                    cart = [...cart,cartItem]

                    Storage.saveCart(cart)
                    this.setCartValues(cart)
                    this.addCartItem(cartItem)
                    this.showCart()
                })
            }
        })
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const x = new Products()
    const ui = new UI()
    x.getProducts()
    .then(data => {
        ui.displayProducts(data)
        ui.getBagButtons
    })
})