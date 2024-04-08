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
            const result = await fetch('https://apis.nervesys.com/api/566aa5c8-9adb-49fc-84d0-71c6752d0312')
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
                    <a href="product_details.html?id=${product.product_id}">
                        <img class="product-img" src="${product.product_image}" alt="${product.product_name}">
                    </a>
                    <button class="bag-btn" data-id="${product.product_id}">
                        <i class="fas fa-shopping-cart"></i>
                        Add to cart
                    </button>
                </div>
                    <a href="product_details.html?id=${product.product_id}">
                        <h3>${product.product_name}</h3>
                        <h4>$${product.product_price}</h4>
                    </a>
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
    setCartValues(cart){
        let tempTotal = 0
        let itemsTotal = 0
        cart.map(item => {
            tempTotal += item.product_price * item.amount
            itemsTotal += item.amount
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
        cartItems.innerText = itemsTotal
    }
    addCartItem(item){
        const div = document.createElement('div')
        div.classList.add('cart-item')
        div.innerHTML = `
        <img class="product-img" src=${item.product_image}>
        <div>
            <h4>${item.product_name}</h4>
            <h5>$${item.product_price}</h5>
            <span class='remove-item' data-id=${item.product_id}>Remove from cart</span>
        </div>
        <div>
            <i class='fas fa-chevron-up' data-id=${item.product_id}></i>
            <p class='item-amount'>${item.amount}</p>
            <i class='fas fa-chevron-down' data-id=${item.product_id}></i>
        </div>
        `
        cartContent.appendChild(div)
    }
    showCart(){
        cartOverlay.classList.add('transparentBcg')
        cartDOM.classList.add('showCart')
    }
    setupAPP(){
        cart = Storage.getCart()
        this.setCartValues(cart)
        this.populateCart(cart)
        cartBtn.addEventListener('click', this.showCart)
        closeCartBtn.addEventListener('click', this.hideCart)
    }
    populateCart(cart){
        cart.forEach(item => this.addCartItem(item))
    }
    hideCart(){
        cartOverlay.classList.remove('transparentBcg')
        cartDOM.classList.remove('showCart')
    }
    cartLogic(){
        clearCartBtn.addEventListener('click', ()=>{
            this.clearCart()
        })
        cartContent.addEventListener('click', event => {
            if(event.target.classList.contains('remove-item')){
                let removeItem = event.target
                let id = removeItem.dataset.id
                cartContent.removeChild(removeItem.parentElement.parentElement)
                this.removeItem(id)
            }
            else if(event.target.classList.contains('fa-chevron-up')){
                let addAmount = event.target
                let id = addAmount.dataset.id
                let tempItem = cart.find(item => item.product_id.toString() === id)
                tempItem.amount = tempItem.amount + 1
                Storage.saveCart(cart)
                this.setCartValues(cart)
                addAmount.nextElementSibling.innerText = tempItem.amount
            }
            else if(event.target.classList.contains('fa-chevron-down')){
                let lowerAmount = event.target
                let id = lowerAmount.dataset.id
                let tempItem = cart.find(item => item.product_id.toString() === id)
                tempItem.amount = tempItem.amount - 1
                if(tempItem.amount > 0){
                    Storage.saveCart(cart)
                    this.setCartValues(cart)
                    lowerAmount.previousElementSibling.innerText = tempItem.amount
                } else{
                    cartContent.removeChild(lowerAmount.parentElement.parentElement)
                    this.removeItem(id)
                }
            }
        })
    }
    clearCart() {
        let cartItems = cart.map(item => item.product_id.toString());
        cartItems.forEach(id => this.removeItem(id));


        while(cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0])
        }
        this.hideCart();
    }
    removeItem(id) {
        cart = cart.filter(item => item.product_id.toString() !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart)
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-cart"></i>Add to cart`;
    }
    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id);
    }
}

class Storage{
    static saveProducts(products){
        localStorage.setItem('products', JSON.stringify(products))
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'))
        return products.find(product => product.product_id.toString() === id)
    }
    static saveCart(cart){
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    static getCart(){
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const x = new Products()
    const ui = new UI()

    ui.setupAPP()

    x.getProducts()
    .then(data => {
        ui.displayProducts(data)
        Storage.saveProducts(data)
    })
    .then(()=>{
        ui.getBagButtons()
        ui.cartLogic()
    })
    
})

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
