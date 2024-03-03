const inputElement = document.querySelector("#euros");
const outputElement = document.querySelector(".output");
const buttonElement = document.querySelector("button");
const gumeHameWrapper = document.querySelector(".gume-hame-wrapper");

buttonElement.addEventListener("click", (e) => {
    const eur = parseFloat(inputElement.value);
    outputElement.style.display = "block";

    if (eur > Number.MAX_SAFE_INTEGER) {
        outputElement.innerHTML = "Prašome įvesti mažesnį skaičių";
        return;
    } else if (eur < 0.03969) {
        outputElement.innerHTML = `Prašome įvesti didesnį skaičių.<br>min. 0.03969<br>(1 kramtoma)`;
        return;
    }

    buttonElement.style.display = "none";
    inputElement.disabled = true;
    const kramtomos = convertEurToKramtomos(eur);

    setTimeout(() => {
        outputElement.style.display = "block";
        outputElement.innerHTML = `Jums išeina ${kramtomos} <span>Son Goko</span> kramtomos`;
        gumeHameWrapper.style.display = "flex";
    }, 100);

    executeAnimations(kramtomos);
});

function convertEurToKramtomos(eur) {
    const songokoKramtomaPrice = 0.03969;
    return Math.round(eur / songokoKramtomaPrice);
}

async function executeAnimations(kramtomos) {
    await playGumeHameHa();

    const gumWrapper = document.querySelector(".gum-wrapper");
    const gumElement = document.querySelector(".gum");
    gumElement.style.display = "block";

    // speed control of adding chewing gums/gumehameha
    const gumAdditionWait = 250 - kramtomos;
    const lowestWait = 50;

    let sound = new Audio("assets/gumehameha.mp3");
    sound.loop = true;
    sound.play();

    for (let i = 0; i < kramtomos; i++) {
        gumAdditionWait > lowestWait
            ? await sleep(gumAdditionWait)
            : await sleep(lowestWait);

        const gum = gumElement.cloneNode(true);
        gumWrapper.appendChild(gum);

        if (i % 2 === 0) gum.style.marginTop = "-10px";

        gum.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
        });
    }
    sound.pause();
}

async function playGumeHameHa() {
    const positions = document.querySelectorAll(".goku-wrapper img");
    const positionsAnimationLength = [500, 1500, 1500, 1500, 3900];
    const soundFiles = [
        "",
        "assets/kaio-ken.mp3",
        "assets/ssj.mp3",
        "assets/kamehame.mp3",
        "assets/ha-long.mp3",
    ];

    for (let i = 0; i < positions.length; i++) {
        await sleep(positionsAnimationLength[i]);
        positions[i].style.display = "block";
        if (i > 0) positions[i - 1].style.display = "none";

        if (soundFiles[i]) {
            const sound = new Audio(soundFiles[i]);
            sound.play();
        }
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
