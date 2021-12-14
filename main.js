function getInputs() {
    yearsInput = document.getElementById("years").value;
    rateInput = document.getElementById("rate").value;
    rateDollars = moneyToUsd(Number(rateInput));
    totalAmount = rateInput * 40 * 52.1429 * yearsInput;
    dollarAmount = moneyToUsd(totalAmount);

    displayWealth();
}

function displayWealth() {
    let wealthOutput = `After working for ${yearsInput} years at ${rateDollars} an hour,
                        with the standard 40-hour work week,
                        you would accumulate a wealth of ${dollarAmount}.
                        `;
    document.getElementById("user-wealth").innerHTML = wealthOutput;

    consoleResult();
}

async function getBillionaires() {
    const response = await fetch('https://forbes400.herokuapp.com/api/forbes400/getAllBillionaires');
    const data = await response.json();
    return data;
}

var billionaireInfo = {};

function compareWealths(data) {
    var billionaireNames = [];
    var billionaireWorths = [];
    var billionaireName;
    var billionaireWorth;

    for (let i = 0; i < data.length; i++) {
        netWorth = (data[i].finalWorth) * 1000000;
        billionaireNames.push(data[i].person.name);
        billionaireWorths.push(netWorth);
    }

    for (let i = 0; i < billionaireWorths.length; i++) {
        if (billionaireWorths[i] < totalAmount) {
            billionaireName = billionaireNames[i - 1];
            billionaireWorth = billionaireWorths[i - 1];
            break;
        }
    }
    billionaireInfo.billionaireName = billionaireName;
    billionaireInfo.billionaireWorth = moneyToUsd(billionaireWorth);
}

function showBillionaireInfo(){
    let informationOutput = `You would still have less wealth than ${billionaireInfo.billionaireName}
                            who has a net worth of ${billionaireInfo.billionaireWorth}.
                            `
    document.getElementById("billionaire-information").innerHTML = informationOutput;
}

function consoleResult() {
    getBillionaires().then(compareWealths).then(showBillionaireInfo);
}

function moneyToUsd(number) {
    return number.toLocaleString('en-US',
        {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });
}