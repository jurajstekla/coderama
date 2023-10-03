import { isEmpty } from 'lodash';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

const pagePaths = [
  'login',
  'recover',
  'notfound',
  'error',
  'recover',
  'contact',
  'notAuthorized',
  'home',
  'config',
  'users',
  'authorities',
  'workflows'
];
export const setCookie = (name, value) => {
  document.cookie = `${name}=${value}`;
};

export const deleteCookie = name => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const createUrlContent = (data, type) => {
  if (data.size > 0) {
    var blob = new Blob([data], { type: type + ';charset=UTF-8;' });
    return URL.createObjectURL(blob);
  } else {
    return '';
  }
};

export const getBasename = () => {
  const path = window.location.pathname.split('/')[1];
  if (path && !pagePaths.includes(path)) {
    return path;
  }
  return '';
};

export const openContentInNewTab = url => {
  if (url !== '') {
    const newWindow = window.open('/');

    newWindow.onload = () => {
      newWindow.location = url;
    };
  }
};

export const getCookieValue = name => {
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookies = decodedCookie.split(';');

  let searchedCookie = cookies.find(cookie => cookie.includes(name));
  if (searchedCookie) {
    const value = searchedCookie.split('=')[1];
    if (name === 'authority') {
      return value === 'true' ? true : false;
    }
    return value;
  }
  return null;
};

export const isDate = (value, type) => {
  if (type !== undefined) {
    if (type === 'DATE' || type === 'DATETIME') {
      return true;
    }
    return false;
  }

  if (new Date(value) !== 'Invalid Date' && !isNaN(new Date(value))) {
    return true;
  }
  return false;
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

export const getFieldType = dataType => {
  switch (dataType) {
    case 'STRING':
      return {
        type: 'text',
        pattern: '[^~]+',
        inputProps: {
          pattern: '[^~]+',
          placeholder: 'abc...'
        },
        placeholder: 'abc...'
      };
    case 'SMILE':
      return {
        type: 'text',
        inputProps: {
          placeholder: 'C1CCCCC1...'
        },
        placeholder: 'C1CCCCC1...'
      };
    case 'DOUBLE':
      return {
        type: 'text',
        pattern: '^[+-]?([0-9]+([.,][0-9]*)?|[.,][0-9]+)|[^~]$',
        inputProps: {
          pattern: '^[+-]?([0-9]+([.,][0-9]*)?|[.,][0-9]+)|[^~]$'
        },
        placeholder: '123.4'
      };

    case 'INTEGER':
      return {
        type: 'number',
        inputProps: {},
        placeholder: '123'
      };

    case 'DATE':
      return {
        type: 'date',
        max: '9999-01-01',
        inputProps: { max: '9999-01-01' }
      };
    case 'BOOLEAN':
      return {
        type: 'bool',
        inputProps: {}
      };
    case 'DATETIME':
      return {
        type: 'datetime-local',
        max: '9999-01-01T00:00:00',
        inputProps: { max: '9999-01-01T00:00:00' }
      };
    case 'TIME':
      return {
        type: 'time',
        format: 'HH:mm',
        inputProps: { format: 'HH:mm' }
      };
    default:
      return { type: 'text', inputProps: {}, placeholder: 'none' };
  }
};

export const parseValue = (value, type) => {
  if (type === 'DATE' || type === 'DATETIME' || type === 'DATERAW' || type === 'DATETIMERAW') {
    return parseDate(value, type);
  }
  return value;
};

export const toISODate = date => {
  return new Date(date).toISOString();
};

export const parseDate = (date, type) => {
  if (date !== null && date !== undefined && date !== '') {
    if (type === 'DATETIME') {
      const newDate = new Date(date).toLocaleDateString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit'
      });
      return newDate;
    } else if (type === 'DATETIMERAW') {
      const newDate = new Date(date);
      return new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 16);
    } else if (type === 'DATERAW') {
      const newDate = new Date(date);
      return new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10);
    } else {
      const newDate = new Date(date).toLocaleDateString(navigator.language);
      return newDate;
    }
  }
  return '';
};

export const hasPermission = (permission, permissions) => {
  return permissions?.includes(permission);
};

export const getType = type => {
  switch (type) {
    case 'STRING':
      return 'string';
    case 'DOUBLE':
      return 'number';

    case 'INTEGER':
      return 'number';

    case 'DATE':
      return 'date';

    case 'BOOLEAN':
      return 'boolean';

    case 'DATETIME':
      return 'dateTime';
  }
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

export const handleDoubleClick = (e, handler) => {
  if (e.detail === 2) {
    handler();
  }
};

export const getNodePath = (tree, nodeId) => {
  if (tree.id === nodeId) {
    return [tree.id];
  }

  if (tree.children && tree.children.length > 0) {
    for (const child of tree.children) {
      const childPath = getNodePath(child, nodeId);
      if (childPath) {
        return [tree.id, ...childPath];
      }
    }
  }

  return null;
};

export const updateTreeNode = (tree, nodeId, newNode) => {
  const traverse = node => {
    if (node.id === nodeId) {
      node = newNode;
    } else if (Array.isArray(node.children)) {
      // Recursively traverse the children
      for (let i = 0; i < node.children.length; i++) {
        traverse(node.children[i]);
      }
    }
  };

  // Create a deep copy of the tree to avoid modifying the original object
  const updatedTree = JSON.parse(JSON.stringify(tree));

  // Traverse the tree to find the parent node
  traverse(updatedTree);

  return updatedTree;
};

export const deleteTreeNode = (tree, nodeId) => {
  const traverse = (node, parentNode) => {
    if (node.id === nodeId) {
      // Remove the node from its parent's children arra
      if (!parentNode) {
        return {};
      }
      parentNode.children = parentNode.children.filter(child => child.id !== nodeId);
    } else if (Array.isArray(node.children)) {
      // Recursively traverse the children
      for (let i = 0; i < node.children.length; i++) {
        traverse(node.children[i], node);
      }
    }
  };

  // Create a deep copy of the tree to avoid modifying the original object
  const updatedTree = JSON.parse(JSON.stringify(tree));

  // Traverse the tree to find the node and its parent
  traverse(updatedTree, null);

  return updatedTree;
};

export const addTreeNode = (tree, parentId, newNode) => {
  const traverse = node => {
    if (node.id === parentId) {
      // Add the new node to the parent's children array
      node.children.push(newNode);
    } else if (Array.isArray(node.children)) {
      // Recursively traverse the children
      for (let i = 0; i < node.children.length; i++) {
        traverse(node.children[i]);
      }
    }
  };

  // Create a deep copy of the tree to avoid modifying the original object
  const updatedTree = JSON.parse(JSON.stringify(tree));

  // Traverse the tree to find the parent node
  traverse(updatedTree);

  return updatedTree;
};

export const getPathsFromStructure = (nodes, path = '') => {
  var paths = [];
  nodes.forEach(node => {
    const currentNodePath = `${path}/${node.name}`;
    paths.push({ path: currentNodePath, ...(node.id.length > 10 && { id: node.id }) });
    if (node.children) {
      const childPaths = getPathsFromStructure(node.children, currentNodePath, paths);
      paths.push(...childPaths);
    }
  });
  return paths;
};

export const getStructureFromPaths = objects => {
  const root = { id: 'root', name: '', children: [] };
  const map = { root: root };

  for (let object of objects) {
    const { id, path } = object;
    const pathParts = path.split('/').filter(part => part !== '');
    let currentLevel = root;

    for (let i = 0; i < pathParts.length; i++) {
      const parentId = currentLevel.id;
      const existingChild = currentLevel.children.find(
        child => child.name === pathParts[i] && child.parentId === parentId
      );

      if (existingChild) {
        currentLevel = existingChild;
      } else {
        const newChild = {
          id: id,
          name: pathParts[i],
          parentId,
          children: []
        };

        currentLevel.children.push(newChild);
        currentLevel = newChild;
      }
      map[id] = currentLevel;
    }
  }

  return root.children[0];
};

export const createFolderStructure = folders => {
  let folderObjects = [...folders];

  folderObjects.forEach(node => Object.assign(node, { children: [] }));
  folderObjects.sort((a, b) => folderDepthCount(a.path) - folderDepthCount(b.path));

  let rootFolder = {
    name: getFolderName(folderObjects[0].path),
    ...folderObjects.shift(),
    parentId: 'root'
  };

  let result = [rootFolder];
  let searchingChildrenOf = [result[0]];
  let newSearchingChildrenOf = [];
  let depth = 1;

  for (var folderPath of folderObjects) {
    if (folderDepthCount(folderPath.path) > depth) {
      folderObjects = removeFoldersByDepth(folderObjects, depth++);
      searchingChildrenOf = [...newSearchingChildrenOf];
      newSearchingChildrenOf = [];
    }

    for (let obj of searchingChildrenOf) {
      if (obj.path === parentFolderName(folderPath.path)) {
        obj.children.push({
          ...folderPath,
          parentId: obj.id,
          name: getFolderName(folderPath.path)
        });
        newSearchingChildrenOf.push(folderPath);
      } else {
        obj.name = getFolderName(folderPath.path);
      }
    }
  }

  return result[0];
};

function getFolderName(path) {
  return path.substring(path.lastIndexOf('/') + 1, path.length);
}

function removeFoldersByDepth(folderObjects, depth = 0) {
  return folderObjects.filter(obj => folderDepthCount(obj.path) !== depth);
}

function parentFolderName(path) {
  return path?.substring(0, path?.lastIndexOf('/'));
}

function folderDepthCount(path) {
  return (path?.match(/\//gi) || []).length - 1;
}

export function getLocaleDateFormat() {
  const formats = {
    'af-ZA': 'YYYY/MM/DD',
    'am-ET': 'D/M/YYYY',
    'ar-AE': 'DD/MM/YYYY',
    'ar-BH': 'DD/MM/YYYY',
    'ar-DZ': 'DD-MM-YYYY',
    'ar-EG': 'DD/MM/YYYY',
    'ar-IQ': 'DD/MM/YYYY',
    'ar-JO': 'DD/MM/YYYY',
    'ar-KW': 'DD/MM/YYYY',
    'ar-LB': 'DD/MM/YYYY',
    'ar-LY': 'DD/MM/YYYY',
    'ar-MA': 'DD-MM-YYYY',
    'ar-OM': 'DD/MM/YYYY',
    'ar-QA': 'DD/MM/YYYY',
    'ar-SA': 'DD/MM/yy',
    'ar-SY': 'DD/MM/YYYY',
    'ar-TN': 'DD-MM-YYYY',
    'ar-YE': 'DD/MM/YYYY',
    'arn-CL': 'DD-MM-YYYY',
    'as-IN': 'DD-MM-YYYY',
    'az-Cyrl-AZ': 'DD.MM.YYYY',
    'az-Latn-AZ': 'DD.MM.YYYY',
    'ba-RU': 'DD.MM.yy',
    'be-BY': 'DD.MM.YYYY',
    'bg-BG': 'DD.M.YYYY',
    'bn-BD': 'DD-MM-yy',
    'bn-IN': 'DD-MM-yy',
    'bo-CN': 'YYYY/M/D',
    'br-FR': 'DD/MM/YYYY',
    'bs-Cyrl-BA': 'D.M.YYYY',
    'bs-Latn-BA': 'D.M.YYYY',
    'ca-ES': 'DD/MM/YYYY',
    'co-FR': 'DD/MM/YYYY',
    'cs-CZ': 'D.M.YYYY',
    'cy-GB': 'DD/MM/YYYY',
    'da-DK': 'DD-MM-YYYY',
    'de-AT': 'DD.MM.YYYY',
    'de-CH': 'DD.MM.YYYY',
    'de-DE': 'DD.MM.YYYY',
    'de-LI': 'DD.MM.YYYY',
    'de-LU': 'DD.MM.YYYY',
    'dsb-DE': 'D. M. YYYY',
    'dv-MV': 'DD/MM/yy',
    'el-GR': 'D/M/YYYY',
    'en-029': 'MM/DD/YYYY',
    'en-AU': 'D/MM/YYYY',
    'en-BZ': 'DD/MM/YYYY',
    'en-CA': 'DD/MM/YYYY',
    'en-GB': 'DD/MM/YYYY',
    'en-IE': 'DD/MM/YYYY',
    'en-IN': 'DD-MM-YYYY',
    'en-JM': 'DD/MM/YYYY',
    'en-MY': 'D/M/YYYY',
    'en-NZ': 'D/MM/YYYY',
    'en-PH': 'M/D/YYYY',
    'en-SG': 'D/M/YYYY',
    'en-TT': 'DD/MM/YYYY',
    'en-US': 'M/D/YYYY',
    'en-ZA': 'YYYY/MM/DD',
    'en-ZW': 'M/D/YYYY',
    'es-AR': 'DD/MM/YYYY',
    'es-BO': 'DD/MM/YYYY',
    'es-CL': 'DD-MM-YYYY',
    'es-CO': 'DD/MM/YYYY',
    'es-CR': 'DD/MM/YYYY',
    'es-DO': 'DD/MM/YYYY',
    'es-EC': 'DD/MM/YYYY',
    'es-ES': 'DD/MM/YYYY',
    'es-GT': 'DD/MM/YYYY',
    'es-HN': 'DD/MM/YYYY',
    'es-MX': 'DD/MM/YYYY',
    'es-NI': 'DD/MM/YYYY',
    'es-PA': 'MM/DD/YYYY',
    'es-PE': 'DD/MM/YYYY',
    'es-PR': 'DD/MM/YYYY',
    'es-PY': 'DD/MM/YYYY',
    'es-SV': 'DD/MM/YYYY',
    'es-US': 'M/D/YYYY',
    'es-UY': 'DD/MM/YYYY',
    'es-VE': 'DD/MM/YYYY',
    'et-EE': 'D.MM.YYYY',
    'eu-ES': 'YYYY/MM/DD',
    'fa-IR': 'MM/DD/YYYY',
    'fi-FI': 'D.M.YYYY',
    'fil-PH': 'M/D/YYYY',
    'fo-FO': 'DD-MM-YYYY',
    'fr-BE': 'D/MM/YYYY',
    'fr-CA': 'YYYY-MM-DD',
    'fr-CH': 'DD.MM.YYYY',
    'fr-FR': 'DD/MM/YYYY',
    'fr-LU': 'DD/MM/YYYY',
    'fr-MC': 'DD/MM/YYYY',
    'fy-NL': 'D-M-YYYY',
    'ga-IE': 'DD/MM/YYYY',
    'gd-GB': 'DD/MM/YYYY',
    'gl-ES': 'DD/MM/yy',
    'gsw-FR': 'DD/MM/YYYY',
    'gu-IN': 'DD-MM-yy',
    'ha-Latn-NG': 'D/M/YYYY',
    'he-IL': 'DD/MM/YYYY',
    'hi-IN': 'DD-MM-YYYY',
    'hr-BA': 'D.M.YYYY.',
    'hr-HR': 'D.M.YYYY',
    'hsb-DE': 'D. M. YYYY',
    'hu-HU': 'YYYY. MM. DD.',
    'hy-AM': 'DD.MM.YYYY',
    'id-ID': 'DD/MM/YYYY',
    'ig-NG': 'D/M/YYYY',
    'ii-CN': 'YYYY/M/D',
    'is-IS': 'D.M.YYYY',
    'it-CH': 'DD.MM.YYYY',
    'it-IT': 'DD/MM/YYYY',
    'iu-Cans-CA': 'D/M/YYYY',
    'iu-Latn-CA': 'D/MM/YYYY',
    'ja-JP': 'YYYY/MM/DD',
    'ka-GE': 'DD.MM.YYYY',
    'kk-KZ': 'DD.MM.YYYY',
    'kl-GL': 'DD-MM-YYYY',
    'km-KH': 'YYYY-MM-DD',
    'kn-IN': 'DD-MM-yy',
    'ko-KR': 'YYYY-MM-DD',
    'kok-IN': 'DD-MM-YYYY',
    'ky-KG': 'DD.MM.yy',
    'lb-LU': 'DD/MM/YYYY',
    'lo-LA': 'DD/MM/YYYY',
    'lt-LT': 'YYYY.MM.DD',
    'lv-LV': 'YYYY.MM.DD.',
    'mi-NZ': 'DD/MM/YYYY',
    'mk-MK': 'DD.MM.YYYY',
    'ml-IN': 'DD-MM-yy',
    'mn-MN': 'yy.MM.DD',
    'mn-Mong-CN': 'YYYY/M/D',
    'moh-CA': 'M/D/YYYY',
    'mr-IN': 'DD-MM-YYYY',
    'ms-BN': 'DD/MM/YYYY',
    'ms-MY': 'DD/MM/YYYY',
    'mt-MT': 'DD/MM/YYYY',
    'nb-NO': 'DD.MM.YYYY',
    'ne-NP': 'M/D/YYYY',
    'nl-BE': 'D/MM/YYYY',
    'nl-NL': 'D-M-YYYY',
    'nn-NO': 'DD.MM.YYYY',
    'nso-ZA': 'YYYY/MM/DD',
    'oc-FR': 'DD/MM/YYYY',
    'or-IN': 'DD-MM-yy',
    'pa-IN': 'DD-MM-yy',
    'pl-PL': 'YYYY-MM-DD',
    'prs-AF': 'DD/MM/yy',
    'ps-AF': 'DD/MM/yy',
    'pt-BR': 'D/M/YYYY',
    'pt-PT': 'DD-MM-YYYY',
    'qut-GT': 'DD/MM/YYYY',
    'quz-BO': 'DD/MM/YYYY',
    'quz-EC': 'DD/MM/YYYY',
    'quz-PE': 'DD/MM/YYYY',
    'rm-CH': 'DD/MM/YYYY',
    'ro-RO': 'DD.MM.YYYY',
    'ru-RU': 'DD.MM.YYYY',
    'rw-RW': 'M/D/YYYY',
    'sa-IN': 'DD-MM-YYYY',
    'sah-RU': 'MM.DD.YYYY',
    'se-FI': 'D.M.YYYY',
    'se-NO': 'DD.MM.YYYY',
    'se-SE': 'YYYY-MM-DD',
    'si-LK': 'YYYY-MM-DD',
    'sk-SK': 'D. M. YYYY',
    'sl-SI': 'D.M.YYYY',
    'sma-NO': 'DD.MM.YYYY',
    'sma-SE': 'YYYY-MM-DD',
    'smj-NO': 'DD.MM.YYYY',
    'smj-SE': 'YYYY-MM-DD',
    'smn-FI': 'D.M.YYYY',
    'sms-FI': 'D.M.YYYY',
    'sq-AL': 'YYYY-MM-DD',
    'sr-Cyrl-BA': 'D.M.YYYY',
    'sr-Cyrl-CS': 'D.M.YYYY',
    'sr-Cyrl-ME': 'D.M.YYYY',
    'sr-Cyrl-RS': 'D.M.YYYY',
    'sr-Latn-BA': 'D.M.YYYY',
    'sr-Latn-CS': 'D.M.YYYY',
    'sr-Latn-ME': 'D.M.YYYY',
    'sr-Latn-RS': 'D.M.YYYY',
    'sv-FI': 'D.M.YYYY',
    'sv-SE': 'YYYY-MM-DD',
    'sw-KE': 'M/D/YYYY',
    'syr-SY': 'DD/MM/YYYY',
    'ta-IN': 'DD-MM-YYYY',
    'te-IN': 'DD-MM-yy',
    'tg-Cyrl-TJ': 'DD.MM.yy',
    'th-TH': 'D/M/YYYY',
    'tk-TM': 'DD.MM.yy',
    'tn-ZA': 'YYYY/MM/DD',
    'tr-TR': 'DD.MM.YYYY',
    'tt-RU': 'DD.MM.YYYY',
    'tzm-Latn-DZ': 'DD-MM-YYYY',
    'ug-CN': 'YYYY-M-D',
    'uk-UA': 'DD.MM.YYYY',
    'ur-PK': 'DD/MM/YYYY',
    'uz-Cyrl-UZ': 'DD.MM.YYYY',
    'uz-Latn-UZ': 'DD/MM YYYY',
    'vi-VN': 'DD/MM/YYYY',
    'wo-SN': 'DD/MM/YYYY',
    'xh-ZA': 'YYYY/MM/DD',
    'yo-NG': 'D/M/YYYY',
    'zh-CN': 'YYYY/M/D',
    'zh-HK': 'D/M/YYYY',
    'zh-MO': 'D/M/YYYY',
    'zh-SG': 'D/M/YYYY',
    'zh-TW': 'YYYY/M/D',
    'zu-ZA': 'YYYY/MM/DD'
  };

  return formats[navigator.language] || 'DD/MM/YYYY';
}
