const ordersData = async () => {
    const ordersUrl = 'https://extendsclass.com/api/json-storage/bin/addcdbf'

    const response = await fetch(ordersUrl)
    

    const data = await response.json()

    const arrayOfOrders = data.Results

    const c = sessionStorage.getItem('keyPassword')
    const customer = c.substring(0,c.length - 1)

    for(let i = 0; i < arrayOfOrders.length; i++){
        if(customer == arrayOfOrders[i].order.customerId){
            showOrders(arrayOfOrders[i])
        }
    }
}
 
window.onload = function() {
    ordersData()
}

const showOrders = x => {
    const resultOrder = x.order
    const resultOrderDetails = x.orderDetails

    let suma = 0
    let ukupnaSuma = 0

    const ordersDiv = document.getElementById('orders')

    const parseJsonData = jsonString => {
        return new Date(parseInt(jsonString.replace('/Date(','')))
    }
    
    let datum = parseJsonData(resultOrder.orderDate)

    let konacanDatum = datum.toJSON(resultOrder.orderDate)
    console.log(konacanDatum.slice(0,10));

    ordersDiv.innerHTML = `
        <div class="col-sm-12 center-block" id="${resultOrder.id}">
            <div class="thumbnail col-md-12 box">
                <p class='idOrder'>
                    Order ID ${resultOrder.id}<br/><br/>
                </p>
                ${resultOrderDetails.map(y => {
                    suma += y.quantity * y.unitPrice * (1 - y.discount)
                    ukupnaSuma += suma 
                    return `
                        <p class='price'>
                            Product ID: ${y.productId}<br/><br/>
                        </p>
                        <p class='price'>
                            Quantity: ${y.quantity}<br/><br/>
                        </p>
                        <p class='price'>
                            UnitPrice: ${y.unitPrice}<br/><br/>
                        </p>
                        <p class='price'>
                            Date: ${konacanDatum.slice(0,10)}<hr/>
                        </p>
                        <p class='price'>
                            Amount: ${suma.toFixed(2)}<hr/>
                        </p class='price'>
                    `
                }).join('')}
                <p class="total-price">
                     Total amount: ${ukupnaSuma.toFixed(2)}<br/>
                </p>
            </div>
        </div>
    `
}  