// When you need a "mutable" data structure, what you actually need is an immutable data structure
// i.e. a data structure with An API wrapper around internal data that has 
// pre-defined write mechanisms

// Immutable data structure says when you need to make a change, you can only
// make a new data structure with the change having been applied 

const { List, Map } = require('immutable');

const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set('b', 50);
console.log(map1.get('b') + ' vs. ' + map2.get('b')); // 2 vs. 50

let map1v2 = Map({ a: 1, b: 2, c: 3 });
map1v2 = map1v2.set('b', 50);
console.log(map1v2.get('b')); // 50

const items = List.of('textbook', 'supplies');
const updated_items = items.push('calculator');
console.log({ items, updated_items });
const res = `
{
  items: List {
    size: 2,
    _origin: 0,
    _capacity: 2,
    _level: 5,
    _root: null,
    _tail: VNode { array: [Array], ownerID: undefined },
    __ownerID: undefined,
    __hash: undefined,
    __altered: false
  },
  updated_items: List {
    size: 3,
    _origin: 0,
    _capacity: 3,
    _level: 5,
    _root: null,
    _tail: VNode { array: [Array], ownerID: OwnerID {} },
    __ownerID: undefined,
    __hash: undefined,
    __altered: false
  }
}`;
console.log({ items: JSON.stringify(items), updated_items: JSON.stringify(updated_items) });
const res_json = {
  items: '["textbook","supplies"]',
  updated_items: '["textbook","supplies","calculator"]'
};
