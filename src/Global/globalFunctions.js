export const setCookie = (name, value) => {
  document.cookie = `${name}=${value}`;
};

export const deleteCookie = name => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const reordeArray = (array, element, target, accessor) => {
  let arrayCopy = [...array];
  const oldIndex = arrayCopy.findIndex(el => el[accessor] === element[accessor]);
  let newIndex = oldIndex;
  if (oldIndex === 0 && target === 'up') {
    newIndex = arrayCopy.length - 1;
  } else if (oldIndex === arrayCopy.length - 1 && target === 'down') {
    newIndex = 0;
  } else {
    newIndex = target === 'up' ? oldIndex - 1 : oldIndex + 1;
  }

  arrayCopy.splice(newIndex, 0, arrayCopy.splice(oldIndex, 1)[0]);
  return arrayCopy;
};

export const toISODate = date => {
  return new Date(date).toISOString();
};

export function generateId(objects) {
  let newId = '';
  let isUnique = false;

  while (!isUnique) {
    newId = '_' + Math.random().toString(36).substr(2, 9);
    isUnique = objects.find(object => object.id === newId) === undefined; // eslint-disable-line
  }

  return newId;
}
