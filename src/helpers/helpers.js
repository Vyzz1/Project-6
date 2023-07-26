function getRandomIndexes(length, totalItems) {
  const indexes = Array.from({ length }, (_, index) => index);
  const randomIndexes = [];
  while (randomIndexes.length < totalItems) {
    const randomIndex = Math.floor(Math.random() * indexes.length);
    randomIndexes.push(indexes.splice(randomIndex, 1)[0]);
  }
  return randomIndexes;
}

export const getRandomItemsFromArray = (array, totalItems) => {
  const randomIndexes = getRandomIndexes(array.length, totalItems);
  return randomIndexes.map((index) => array[index]);
};
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const countUnRead = (array) => {
  let countUnRead = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].statusRead === false) {
      countUnRead++;
    }
  }
  return countUnRead;
};
export const countJobsStatus = (array) => {
  let countUnRead = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].status === false) {
      countUnRead++;
    }
  }
  return countUnRead;
};

export const deepEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
};
function isObject(object) {
  return object != null && typeof object === "object";
}
