const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdownS = document.querySelectorAll(".dropdown select")

const btn = document.querySelector('form button');

const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');



for (let select of dropdownS) {
    for (let code in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = code;
        newOption.value = code;


        if (select.name === "from" && code === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && code === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evn) => {
        updateFlag(evn.target);
    })
}

const updateFlag = (target) => {
     target.parentElement.querySelector("img").src = `https://flagsapi.com/${countryList[target.value]}/flat/64.png`;
}


btn.addEventListener('click',async (evnt)=>{
    evnt.preventDefault();
    let amt = document.querySelector('.amount input');
    let amtValue = amt.value;

    if(amtValue === "" || amtValue === "0"){
        amt.value = "1";
        amtValue = 1;
    }

    fromCurrV = fromCurr.value.toLowerCase();
    toCurrV = toCurr.value.toLowerCase();

    const response = await fetch(`${BASE_URL}/${fromCurrV}.json`);
    let data = await response.json();
    
    let exRate = data[fromCurrV][toCurrV]
    
    let answer = exRate * amtValue;

    msg.innerText = `${amtValue} ${fromCurrV.toUpperCase()} = ${answer} ${toCurrV.toUpperCase()}`;


    
})
