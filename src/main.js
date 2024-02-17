const songokoKramtomaPrice = 0.03969;

function convertEurToKramtomos(eur) {
    console.log(Math.round(eur / songokoKramtomaPrice));
    return Math.round(eur / songokoKramtomaPrice);
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function launchGumeHameHa(positions, animationsLength) {
    for (let i = 0; i < positions.length; i++) {
        let sound;

        await sleep(animationsLength[i]);
        positions[i].style.display = "block";

        if (i > 0) positions[i - 1].style.display = "none";

        if (i === 1) {
            sound = new Audio("assets/kaio-ken.mp3");
        } else if (i === 2) {
            sound = new Audio("assets/ssj.mp3");
        }

        if (sound) sound.play();
    }
}

async function executeAnimations(kramtomos) {
    const gokuPositions = document.querySelectorAll(".goku-wrapper img");
    const gokuPositionsLength = [500, 1500, 1500, 1500, 1500];

    await launchGumeHameHa(gokuPositions, gokuPositionsLength);

    const gumWrapper = document.querySelector(".gum-wrapper");
    const gumElement = document.querySelector(".gum");
    gumElement.style.display = "block";

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

const inputElement = document.querySelector("#euros");
const outputElement = document.querySelector(".output");
const buttonElement = document.querySelector("button");
const gumeHameWrapper = document.querySelector(".gume-hame-wrapper");

buttonElement.addEventListener("click", (e) => {
    const eur = parseFloat(inputElement.value);
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
        gumeHameWrapper.style.display = "flex";
    }, 100);

    executeAnimations(kramtomos);
});
