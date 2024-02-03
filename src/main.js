const songokoKramtomaPrice = 0.03969;

function convertEurToKramtomos(eur) {
    console.log(Math.round(eur / songokoKramtomaPrice));
    return Math.round(eur / songokoKramtomaPrice);
}

const inputElement = document.querySelector("#euros");
const outputElement = document.querySelector(".output");
const buttonElement = document.querySelector("button");

buttonElement.addEventListener("click", (e) => {
    const eur = parseInt(inputElement.value);
    outputElement.style.display = "block";

    if (eur > Number.MAX_SAFE_INTEGER) {
        outputElement.innerHTML = `Prašome įvesti mažesnį skaičių.`;
        return;
    } else if (eur < 0.03969) {
        outputElement.innerHTML = `Prašome įvesti didesnį skaičių.<br> min. 0.03969 <br>(1 kramtoma)`;
        return;
    }

    buttonElement.style.display = "none";
    inputElement.disabled = true;
    const kramtomos = convertEurToKramtomos(eur);

    setTimeout(() => {
        outputElement.style.display = "block";
        outputElement.innerHTML = `Jums išeina ${kramtomos}  <span>Son Goko</span> kramtomos.`;
    }, 100);
});
