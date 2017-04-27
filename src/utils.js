export function isArray(arr) {
  return Array.isArray(arr);
}

export function isPlainObject(obj) {
  return (obj != null && typeof obj === 'object' && !isArray(obj));
}

export function isFunction(fn) {
  return typeof fn === 'function';
}

export function isString(obj) {
  return typeof obj === 'string';
}

export function isSymbol(obj) {
  return typeof obj === 'symbol';
}

export function identity(payload) {
  return payload;
}

export function pick(obj, fields) {
  if (!isPlainObject(obj)) throw new Error('pick function expects an object');
  const fieldList = (!isArray(fields)) ? [fields] : fields;
  return Object.keys(obj).reduce((acc, key) => {
    // filter out non-matching fields
    if (fieldList.indexOf(key) < 0) return acc;
    return Object.assign(acc, { [key]: obj[key] });
  }, {});
}

export function omit(obj, fields) {
  if (!isPlainObject(obj)) throw new Error('omit function expects an object');
  const fieldList = (!isArray(fields)) ? [fields] : fields;
  return Object.keys(obj).reduce((acc, key) => {
    // filter out matching fields
    if (fieldList.indexOf(key) >= 0) return acc;
    return Object.assign(acc, { [key]: obj[key] });
  }, {});
}
