const ALERT_SHOW_TIME = 5000;

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

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length-1)];
}

const findElement = function(array, key, field) {
  for (let i=0; i<array.length; i++) {
    if (array[i].url===key && field==='description') {
      return array[i].description;}
    if (array[i].url===key && field ==='comments')  {
      return array[i].comments;
    }
  }
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomArrayElement};
export {createRandomIdFromRangeGenerator};
export {getRandomInteger};
export {findElement};
export {showAlert};
export {debounce};
