export const audio = {};

(function preloadSounds() {
    const soundFiles = {
        gumehameha: "assets/gumehameha.mp3",
        kaioKen: "assets/kaio-ken.mp3",
        SSJ: "assets/ssj.mp3",
        kamehameha: "assets/kamehame.mp3",
        haLong: "assets/ha-long.mp3",
    };

    for (const [key, value] of Object.entries(soundFiles)) {
        audio[key] = new Audio(value);
    }
})();
