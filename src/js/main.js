import { audio } from "./audio.js";

const inputElement = document.querySelector("#euros");
const outputElement = document.querySelector(".output");
const buttonElement = document.querySelector("button");
const gumeHameWrapper = document.querySelector(".gume-hame-wrapper");

buttonElement.addEventListener("click", main);

inputElement.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        main();
    }
});

function main() {
    const eur = parseFloat(inputElement.value);
    outputElement.style.display = "block";

    if (eur > Number.MAX_SAFE_INTEGER) {
        outputElement.innerHTML = "Prašome įvesti mažesnį skaičių";
        return;
    } else if (eur < 1) {
        outputElement.innerHTML = `Prašome įvesti didesnį skaičių.<br>min. 1<br>(25 kramtomos)`;
        return;
    }

    buttonElement.style.display = "none";
    inputElement.disabled = true;
    const kramtomos = convertEurToKramtomos(eur);

    setTimeout(() => {
        outputElement.style.display = "block";
        gumeHameWrapper.style.display = "flex";

        const kramtomosEnding = getKramtomosEnding(kramtomos);
        outputElement.innerHTML = `Jums išeina ${kramtomos} <span>Son Goko</span> ${kramtomosEnding}`;
    }, 100);

    executeAnimations(kramtomos);
}

function convertEurToKramtomos(eur) {
    const songokoKramtomaPrice = 0.03969;
    return Math.round(eur / songokoKramtomaPrice);
}

function getKramtomosEnding(kramtomos) {
    const lastDigit = kramtomos % 10;
    const lastTwoDigits = kramtomos % 100;
    let word = "";

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        word = "kramtomų";
    } else if (lastDigit === 1) {
        word = "kramtoma";
    } else if (lastDigit >= 2 && lastDigit <= 9) {
        word = "kramtomos";
    } else {
        word = "kramtomų";
    }

    console.log(kramtomos, word);
    return word;
}

async function executeAnimations(kramtomos) {
    const header = document.querySelector("h1");
    header.style.display = "none";

    await initiateGumeHameHa();

    const gumWrapper = document.querySelector(".gum-wrapper");
    const gumElement = document.querySelector(".gum");
    gumElement.style.display = "block";

    // speed control of adding chewing gums/gumehameha
    const gumAdditionWait = 250 - kramtomos;
    const lowestWait = 50;

    audio.gumehameha.loop = true;
    audio.gumehameha.play();

    for (let i = 0; i < kramtomos - 1; i++) {
        gumAdditionWait > lowestWait
            ? await sleep(gumAdditionWait)
            : await sleep(lowestWait);

        const gum = gumElement.cloneNode(true);
        gumWrapper.appendChild(gum);

        if (i % 2 === 0) gum.style.marginTop = "-10px";

        removeExcessGums(gumWrapper);

        gum.scrollIntoView({
            block: "end",
            inline: "nearest",
        });
    }
    audio.gumehameha.pause();
}

async function initiateGumeHameHa() {
    const positions = document.querySelectorAll(".goku-wrapper img");
    const positionsAnimationLength = [500, 1500, 1500, 1500, 3900];
    const sounds = ["gumehameha", "kaioKen", "SSJ", "kamehameha", "haLong"];

    for (let i = 0; i < positions.length; i++) {
        await sleep(positionsAnimationLength[i]);
        positions[i].style.display = "block";

        if (i > 0) {
            positions[i - 1].style.display = "none";
            audio[sounds[i]].play();
        }
    }
}

function removeExcessGums(gumWrapper) {
    const screenWidth = window.innerWidth;
    let totalWidth = 0;
    const gums = Array.from(gumWrapper.children);

    gums.forEach((gum) => {
        totalWidth += gum.offsetWidth;
    });

    if (totalWidth > 3 * screenWidth && gums.length > 0) {
        gumWrapper.removeChild(gums[0]);
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
