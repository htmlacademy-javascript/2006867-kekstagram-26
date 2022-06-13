
// https://learn.javascript.ru/task/random-int-min-max
function randomInteger(min, max) {
  // случайное число от min до (max+1)
  if (min >= max) {
    // console.log ('Сначала введите минимальное число отличное от максимального');
    return;
  }
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// console.log (randomInteger(3.5, 10));


function checkLength(str, max) {
  if (str.length <= max) {
    return true
  }
  return false
}


const NAMES = ['Иван', 'Алексей', 'Виталий', 'Артем', 'Анна', 'Максим', 'Катерина'];
const MESSAGES = [
  'Всё отлично! ',
  'В целом всё неплохо. Но не всё. ',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. ',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. ',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. ',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?! '
]

const DESCRIPTION = [
  'Описание фото 1',
  'Описание фото 2',
  'Описание фото 3',
  'Описание фото 4',
  'Описание фото 5'
]

let IdArray = [];
  for (let i=0; i <= 24; i++) {
   let randomId = randomInteger(1, 25);
   while (IdArray.includes(randomId)) {
    randomId = randomInteger(1, 25);
   }
   IdArray[i] = randomId;
  }




let commentsId = [];
for (let j = 0; j<=25; j++) {
  let randomCommentsId = randomInteger(1,199);
  while (commentsId.includes(randomCommentsId)) {
    randomCommentsId = randomInteger(1, 199);
   }
   commentsId[j] = randomCommentsId;
  }


const createPost = function() {
  let post = [];
  for (let i = 0; i <=24; i++){
  const randomNameIndex = randomInteger(0, NAMES.length-1);
  const avatarId = randomInteger(0, 6);
  const randomDescriptionIndex = randomInteger(0, DESCRIPTION.length-1);
  const randomMesssageIndex = randomInteger(0, MESSAGES.length-1);
  const randomCommentsIndex = randomInteger(0, commentsId.length-1);
  let element = {
      id: IdArray[i],
      url: `photos/${IdArray[i]}.jpg`,
      description: DESCRIPTION[randomDescriptionIndex],
      likes: randomInteger(15, 200),
      comments : {
        id: commentsId[randomCommentsIndex],
        avatar: `img/avatar-${avatarId}.svg`,
        message: MESSAGES[randomMesssageIndex],
        name: NAMES[randomNameIndex],
      }
    }
    post[i]=element;
  }

  console.log(post);
}

createPost();
