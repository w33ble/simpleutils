import test from 'ava';
import * as utils from './utils';

let types;
let obj;

function checkTypesFail(t, fn, checkedTypes) {
  for (let idx = 0; idx < checkedTypes.length; idx += 1) {
    t.false(fn(checkedTypes[idx]));
  }
}

test.beforeEach(() => {
  types = [
    {},
    [],
    () => {},
    true,
    1,
    'str',
    null,
    undefined,
    NaN,
    Symbol('hello'),
  ];

  obj = {
    one: 1,
    two: {
      three: 4,
      five: 6,
    },
    seven: true,
    eight: 'nine',
    ten: ['a', 'b', 'c'],
  };
});


test('isArray returns true for arrays', (t) => {
  t.true(utils.isArray([]));
});

test('isArray returns false for non-arrays', (t) => {
  checkTypesFail(t, utils.isArray, types.filter((_, i) => i !== 1));
});

test('isFunction returns true for object', (t) => {
  const fn = () => {};
  t.true(utils.isFunction(fn));
});

test('isFunction returns false for non-objects', (t) => {
  checkTypesFail(t, utils.isFunction, types.filter((_, i) => i !== 2));
});

test('isObjectLike returns true for object', (t) => {
  t.true(utils.isObjectLike({}));
});

test('isObjectLike returns false for non-objects', (t) => {
  checkTypesFail(t, utils.isObjectLike, types.filter((_, i) => i !== 0));
});

test('isString returns true for string', (t) => {
  t.true(utils.isString('hello world'));
});

test('isString returns false for non-string', (t) => {
  checkTypesFail(t, utils.isString, types.filter((_, i) => i !== 5));
});

test('isSymbol returns true for symbol', (t) => {
  t.true(utils.isSymbol(Symbol('hello')));
});

test('isSymbol returns false for non-symbol', (t) => {
  checkTypesFail(t, utils.isSymbol, types.filter((_, i) => i !== 9));
});

test('identity returns a function that returns the passed value', (t) => {
  const value = 'party';
  t.is(utils.identity(value), value);
});

test('pick returns single property', (t) => {
  const comp = { seven: obj.seven };
  t.deepEqual(utils.pick(obj, 'seven'), comp);
});

test('pick returns multiple properties', (t) => {
  const comp = {
    one: obj.one,
    two: obj.two,
    eight: obj.eight,
  };
  t.deepEqual(utils.pick(obj, ['one', 'two', 'eight']), comp);
});

test('pick throws when given a non-object', (t) => {
  const check = () => utils.pick(null, ['one']);
  t.throws(check, 'pick function expects an object');
});

test('returns all but single property', (t) => {
  // shallow clone
  const comp = { ...obj };
  delete comp.one;
  t.deepEqual(utils.omit(obj, 'one'), comp);
});

test('returns all but multiple properties', (t) => {
  // shallow clone
  const comp = { ...obj };
  delete comp.seven;
  delete comp.eight;
  t.deepEqual(utils.omit(obj, ['seven', 'eight']), comp);
});

test('throws when given a non-object', (t) => {
  const check = () => utils.omit(null, ['one']);
  t.throws(check, 'omit function expects an object');
});
