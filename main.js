function getInputs(){
    getBillionaires();
}

function getBillionaires(){
    fetch('https://forbes400.herokuapp.com/api/forbes400/getAllBillionaires')
    .then((res) => res.json())
    .then((data) => {
        let output = '';
        data.forEach(function(billionaire){
            netWorth = (billionaire.finalWorth) * 1000000
            dollarValue = moneyToUsd(netWorth);
            output += `
                <div>
                    <p>${billionaire.rank}) 
                    ${billionaire.person.name} = 
                    ${dollarValue}</p>
                </div>
            `
        });
        document.getElementById('information').innerHTML = output;
    })
}

function moneyToUsd(number) {
    return number.toLocaleString('en-US', 
    { 
        style: 'currency', 
        currency: 'USD' 
    });
}