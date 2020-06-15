import wList from './words.js';

const getWordAt = (line) => {
    const nLines = wList.length;
    return wList[line % nLines];
}

export default getWordAt;