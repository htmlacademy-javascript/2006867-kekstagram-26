
// https://learn.javascript.ru/task/random-int-min-max
function randomInteger(min, max) {
  // случайное число от min до (max+1)
  if (min >= max) {
    console.log ('Сначала введите минимальное число отличное от максимального');
    return;
  }
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

console.log (randomInteger(3, 10));


function checkLength(str, max) {
  if (str.length <= max) {
    return true
  }
  return false
}

console.log (checkLength('Hello', 20))
