function mapUniqueWords(uniqueWords, word) {
    if(uniqueWords.has(word)) {
        //update
        const c = uniqueWords.get(word);
        uniqueWords.set(word, c + 1);
    }
    else {
        uniqueWords.set(word, 1);
    }
    return uniqueWords;
}

module.exports = { mapUniqueWords };