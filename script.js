const buttonElement = document.getElementById('button-element')


function makeRequest(coin,getLink){
    const url = getLink(coin)
    const request = new XMLHttpRequest()

    request.open("GET", url)
    request.responseType = 'text'
    request.send()

    request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
            const response = JSON.parse(request.responseText)
            console.log(response)
            
            for(let key in response){
                if(typeof response[key] === 'object'){
                    const criptCoin = {...response[key]}
                    document.querySelector('p').innerHTML = `name: ${criptCoin.name} <br> valor atual: ${criptCoin.ask} <br> alta: ${criptCoin.high} <br> baixa: ${criptCoin.low}`
                }
                else console.log('error')
            }
        }
    }

    return request.onload()
}


function start(){
    let coinSelected = document.getElementById('coin-selector').value
    const getLink = coinSelected => `https://economia.awesomeapi.com.br/json/all/${coinSelected}-BRL`

    makeRequest(coinSelected, getLink)
}

buttonElement.onclick = start