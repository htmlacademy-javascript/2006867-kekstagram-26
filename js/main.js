"use strict";

// https://learn.javascript.ru/task/random-int-min-max
function randomInteger(min, max) {
  // случайное число от min до (max+1)
  if (min >= max) {
    console.log ('Сначала введите минимальное число отличное от максимального')
    return
  }
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

console.log (randomInteger(3, 10));
