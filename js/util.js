function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + upper;
  return Math.floor(result);
}

function checkLength(str, max) {
  if (str.length <= max) {
    return true;
  }
  return false;
}

function createRandomIdFromRangeGenerator (min, max, numberOfElements) {
  const randomArray= [];
  while (randomArray.length < numberOfElements) {
    const randomCommentsId = getRandomInteger(min,max);
    if (!randomArray.includes(randomCommentsId)) {
      randomArray.push(randomCommentsId);
    }
  }
  return randomArray;
}

function getRandomIndex(name) {
  const randomIndex = getRandomInteger(0, name.length-1);
  return randomIndex;
}

export {getRandomIndex};
export {createRandomIdFromRangeGenerator};
export {getRandomInteger};
