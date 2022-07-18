function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
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


function findElement (array, key, field) {
  for (let i=0; i<array.length; i++) {
    if (array[i].id===key && field==='description') {
      return array[i].description;}
    if (array[i].id===key && field ==='comments')  {
      return array[i].comments;
    }
  }
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

export {createRandomIdFromRangeGenerator};
export {getRandomInteger};
export {findElement};
export {isEscapeKey};
export {debounce};
