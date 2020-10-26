function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export function uuidV4() {
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

export function delay(timer) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('');
    }, timer);
  });
}

export function decorator(source) {
  if (source.constructor === Array) {
    return source.map(item => {
      if (!item.labelIntro) {
        item.labelIntro = '';
      }
      return { ...item, identifier: uuidV4() }
    })
  } else if (source.constructor === Object) {
    if (!source.labelIntro) {
      source.labelIntro = '';
    }
    return { ...source, identifier: uuidV4() }
  }
  throw new Error('数据格式不对');
}