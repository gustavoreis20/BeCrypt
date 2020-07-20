const buttonElement = document.getElementById('button-element')


function start(){
    let coinSelected = document.getElementById('coin-selector').value


    const getLink = coinSelected => `https://economia.awesomeapi.com.br/json/all/${coinSelected}-BRL`


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
                        document.querySelector('p').innerHTML = `name: ${criptCoin.name} <br> valor atual: ${criptCoin.ask}`
                    }
                    else console.log('error')
                }
            }
        }

        return request.onload()
    }

    makeRequest(coinSelected, getLink)
}

