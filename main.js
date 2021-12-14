function getInputs() {
    document.getElementById("user-wealth").innerHTML = "";
    document.getElementById("billionaire-information").innerHTML = "";

    yearsInput = document.getElementById("years").value;
    rateInput = document.getElementById("rate").value;
    rateDollars = toUsd(Number(rateInput));
    totalAmount = rateInput * 40 * 52.1429 * yearsInput;
    dollarAmount = toUsd(totalAmount);

    displayWealth();
}

function displayWealth() {
    let wealthOutput = `After working for ${Intl.NumberFormat('en-US').format(yearsInput)} years 
                        at ${rateDollars} an hour, with the standard 40-hour work week,
                        you would accumulate a wealth of ${dollarAmount}.`;
    document.getElementById("user-wealth").innerHTML = wealthOutput;

    runBillionaireFunctions();
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
    
    if (billionaireName == undefined) { billionaireInfo.billionaireName = ""; }
    else { billionaireInfo.billionaireName = billionaireName; }

    if (billionaireWorth == undefined) {}
    else { billionaireInfo.billionaireWorth = toUsd(billionaireWorth); }
}

function showBillionaireInfo() {
    if (billionaireInfo.billionaireName !== "") {
        if (billionaireInfo.billionaireName.includes("family")) {
            var informationOutput = `You would still have less than ${billionaireInfo.billionaireName}
                                    who have a combined net worth of ${billionaireInfo.billionaireWorth}.`
        }
        else {
            var informationOutput = `You would still have less than ${billionaireInfo.billionaireName}
                                    who has a net worth of ${billionaireInfo.billionaireWorth}.`
        }
    }
    else {
        var informationOutput = `You would still have less than every living billionaire.`
        }
    document.getElementById("billionaire-information").innerHTML = informationOutput;
}

function runBillionaireFunctions() {
    getBillionaires()
        .then(compareWealths)
        .then(showBillionaireInfo);
}

function toUsd(number) {
    return number.toLocaleString('en-US',
        {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });
}