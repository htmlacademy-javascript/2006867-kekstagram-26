import {getRandomIndex} from './util.js';
import {createRandomIdFromRangeGenerator} from './util.js';
import {getRandomInteger} from './util.js';

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


function createPost() {
  let post = [];
  for (let i = 0; i <= 24; i++){
  const randomNameIndex = getRandomIndex(NAMES);
  const avatarId = getRandomInteger(0, 6);
  const randomDescriptionIndex = getRandomIndex(DESCRIPTION);
  const randomMesssageIndex = getRandomIndex(MESSAGES);
  const commentsId = createRandomIdFromRangeGenerator(1, 200, 25);
  const IdArray = createRandomIdFromRangeGenerator(1, 25, 25);
  const element = {
      id: IdArray[i],
      url: `photos/${IdArray[i]}.jpg`,
      description: DESCRIPTION[randomDescriptionIndex],
      likes: getRandomInteger(15, 200),
      comments : {
        id: commentsId[i],
        avatar: `img/avatar-${avatarId}.svg`,
        message: MESSAGES[randomMesssageIndex],
        name: NAMES[randomNameIndex],
      }
    }
    post[i]=element;
  }
 return post;
}

const Post = createPost();
export {Post};
