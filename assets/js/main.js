const ordersData = async () => {
    const ordersUrl = 'https://extendsclass.com/api/json-storage/bin/addcdbf'

    const response = await fetch(ordersUrl)
    

    const data = await response.json()

    const arrayOfOrders = data.Results

    const c = sessionStorage.getItem('keyPassword')
    const customer = c.substring(0,c.length - 1)

    for(let i = 0; i < arrayOfOrders.length; i++){
        if(customer == arrayOfOrders[i].order.customerId){
            console.log('Nasao sam korisnika');
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
                <p styles="font-size: 20px">
                    OrderID ${resultOrder.id}<br/><br/>
                </p>
            </div>
        </div>
    `
}  