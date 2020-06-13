export function shuffleArray(array, arrayShuffled, changeArrayShuffled) {
    if (!arrayShuffled) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        changeArrayShuffled(true);
    }
    return array;
}