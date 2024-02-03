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
        await sleep(animationsLength[i]);
        positions[i].style.display = "block";
        if (i > 0) {
            positions[i - 1].style.display = "none";
        }
    }
}

const inputElement = document.querySelector("#euros");
const outputElement = document.querySelector(".output");
const buttonElement = document.querySelector("button");
const kamehameWrapper = document.querySelector(".kamehame-wrapper");

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
        kamehameWrapper.style.display = "flex";
    }, 100);

    const gokuPositions = document.querySelectorAll(".goku-wrapper img");
    const gokuPositionsLength = [100, 200, 200, 200, 200];

    (async function executeAnimations() {
        await launchGumeHameHa(gokuPositions, gokuPositionsLength);

        const gumWrapper = document.querySelector(".gum-wrapper");
        const gumElement = document.querySelector(".gum");
        gumElement.style.display = "block";

        const gumAdditionWait = 250 - kramtomos;
        const lowestWait = 50;
        for (let i = 0; i < kramtomos; i++) {
            gumAdditionWait > lowestWait
                ? await sleep(gumAdditionWait)
                : await sleep(lowestWait);

            const gum = gumElement.cloneNode(true);
            gumWrapper.appendChild(gum);

            if (i % 2 === 0) {
                gum.style.marginTop = "-10px";
            }
            gum.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }
    })();
});
