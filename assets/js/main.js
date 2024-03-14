const ordersData = async () => {
    const ordersUrl = 'https://extendsclass.com/api/json-storage/bin/addcdbf'

    const response = await fetch(ordersUrl)
    

    const data = await response.json()
    console.log(data);

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

ordersData()