window.onload = function () {
    var btn = document.getElementById("btn");
    if (btn.addEventListener) {
        btn.addEventListener("click", calculate, false);
    } 
    else if (btn.attachEvent) {
        btn.attachEvent("onclick", calculate);
    }
};

function calculate() {
    yearsInput = document.getElementById("years").value;
    rateInput = document.getElementById("rate").value;
    totalAmount = rateInput * 40 * 52.1429 * yearsInput;
    totalAmount = moneyToUsd(totalAmount);
    
    displayWealth();
}

function displayWealth(){
    let wealthOutput = `After working for ${yearsInput} years at $${rateInput} an hour,
                        with the standard 40-hour work week,
                        you would accumulate a wealth of ${totalAmount}.
                        `;
    document.getElementById("user-wealth").innerHTML = wealthOutput;

    getBillionaires();
}

function getBillionaires(){
    fetch('https://forbes400.herokuapp.com/api/forbes400/getAllBillionaires')
    .then((res) => res.json())
    .then((data) => {
        let billionaireOutput = '';
        data.forEach(function(billionaire){
            netWorth = (billionaire.finalWorth) * 1000000
            dollarValue = moneyToUsd(netWorth);
            billionaireOutput += `
                <div>
                    <p>${billionaire.rank}) 
                    ${billionaire.person.name} = 
                    ${dollarValue}</p>
                </div>
                `
        });
        document.getElementById("information").innerHTML = billionaireOutput;
    })
    .catch((err) => console.log(err));
}

function moneyToUsd(number) {
    return number.toLocaleString('en-US', 
    { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}