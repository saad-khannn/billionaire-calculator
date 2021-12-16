window.onload = async function () {
    const response = await fetch('https://forbes400.herokuapp.com/api/forbes400/getAllBillionaires'); //fetch api which lists all active billionaires
    data = await response.json(); //global variable for data fetched from api
}

async function getData() {
    return data; //return data fetched from api
}

function checkValue(){
    const maxValue = 999999999999999;
    yearsInput = document.getElementById("years").value; //get "years" input
    wageInput = document.getElementById("wage").value; //get "wage" input
    
    if(yearsInput > maxValue){ //set limit on "years" input
        document.getElementById("years").value = maxValue;
    }
    if(wageInput > maxValue){ //set limit on "wage" input
        document.getElementById("wage").value = maxValue;
    }

    if(yearsInput < 0){ //"years" input can't be negative
        document.getElementById("years").value = 0;
    }
    if(wageInput < 0){ //"wage" input can't be negative
        document.getElementById("wage").value = 0;
    }
}

function getInputs() {
    document.getElementById("user-wealth").innerHTML = ""; //clear #user-wealth text when "calculate" button is clicked
    document.getElementById("user-rank").innerHTML = ""; //clear #user-rank text when "calculate" button is clicked

    yearsInput = document.getElementById("years").value;
    wageInput = document.getElementById("wage").value;
    wageDollars = toUsd(Number(wageInput)); //convert wage input to dollars format
    totalAmount = wageInput * 40 * 52.1429 * yearsInput; //calculate user's total wealth based on years and wage
    dollarAmount = toUsd(totalAmount); //convert user's total wealth to dollars format 

    displayWealth();
}

function displayWealth() {
    let wealthOutput = `After working for ${formatNumber(yearsInput)} years 
                        at ${wageDollars} an hour, with the standard 40-hour work week,
                        you would accumulate a wealth of ${dollarAmount}.`;
    document.getElementById("user-wealth").innerHTML = wealthOutput; //display user's wealth in .container-2 #user-wealth

    runBillionaireFunctions();
}

var billionaireInfo = {}; //globally scoped variable used to store billionaire information

function compareWealths(data) {
    var billionaireNames = []; //empty array for billionaires' names
    var billionaireWorths = []; //billionaires' net worths 
    var billionaireRanks = []; //billionaires' ranks
    var billionaireName; //variable for billionaire name (found during comparison)
    var billionaireWorth; //billionaire net worth 
    var billionaireRank; //billionaire rank 

    for (let i = 0; i < data.length; i++) { //iterate through api response
        netWorth = (data[i].finalWorth) * 1000000; //billionaires' worths in api is divided by 1000000, so reverse that
        billionaireNames.push(data[i].person.name); //add each billionaire's name 
        billionaireWorths.push(netWorth); //net worth 
        billionaireRanks.push(data[i].rank); //and rank to the arrays
        if (data[i].finalWorth < 1000) { //some people near the end of api response have less than $1 billion
            break; //so stop adding billionaires to array if their net worth is below $1 billion 
        }
    }

    for (let i = 0; i < billionaireWorths.length; i++) { //iterate through billionaireWorths array
        if (billionaireWorths[i] < totalAmount) { //if user's wealth is greater than billionaire's wealth
            billionaireName = billionaireNames[i - 1]; //get the name of the previous (richer) billionaire
            billionaireWorth = billionaireWorths[i - 1]; //get the net worth of the previous billionaire
            billionaireRank = billionaireRanks[i - 1]; //get the rank of the previous billionaire
            break;
        }
    }

    //add values found during comparison to globally scoped variable
    if (billionaireName == undefined) { billionaireInfo.billionaireName = ""; }
    else { billionaireInfo.billionaireName = billionaireName; }

    if (billionaireWorth == undefined) { }
    else { billionaireInfo.billionaireWorth = toUsd(billionaireWorth); }

    if (billionaireRank == undefined) { }
    else { billionaireInfo.billionaireRank = billionaireRank; }

    if (totalAmount > billionaireWorths[0]) { billionaireInfo.billionaireName = "1"; } //if user's wealth is greater than richest billionaire
}

function showBillionaireInfo() {
    if (billionaireInfo.billionaireName !== "") {
        if (billionaireInfo.billionaireRank !== 1) {
            if (billionaireInfo.billionaireName.includes("family")) { //change text if billionaireName includes "family"
                var rankOutput = `You would still have less than ${billionaireInfo.billionaireName}
                                    who have a combined net worth of ${billionaireInfo.billionaireWorth}.
                                    There would still be ${formatNumber(billionaireInfo.billionaireRank)} 
                                    billionaires richer than you.`
            }
            else { //else keep this text
                var rankOutput = `You would still have less than ${billionaireInfo.billionaireName}
                                    who has a net worth of ${billionaireInfo.billionaireWorth}.
                                    There would still be ${formatNumber(billionaireInfo.billionaireRank)} 
                                    billionaires richer than you.`
            }
        }
        else { //change text if only 1 billionaire is richer than user
            var rankOutput = `You would still have less than ${billionaireInfo.billionaireName}
                                who has a net worth of ${billionaireInfo.billionaireWorth}.
                                There would still be 1 billionaire richer than you.`
        }
    }
    else { var rankOutput = `You would still have less than every living billionaire.` }

    if (billionaireInfo.billionaireName === "1") {
        var rankOutput = `You would be the richest person in the world.`
    }

    if (totalAmount < 1000000000) { //added this since line 96 alone was still showing comparisons to billionaires 
                                    //in rankOutput even if user's wealth was below $1 billion
        var rankOutput = `You would still have less than every living billionaire.`
    }

    document.getElementById("user-rank").innerHTML = rankOutput;
}

function runBillionaireFunctions() {
    getData()
    .then(compareWealths)
    .then(showBillionaireInfo);
}

function toUsd(number) { //converts from number to dollars format 
    return number.toLocaleString('en-US',
        {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        });
}

function formatNumber(number) { //add commas to number after every 3 digits
    return Intl.NumberFormat('en-US').format(number);
}