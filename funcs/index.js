/* eslint-disable no-unused-vars */
'use strict';

function compose(...input_fns) {
  return function _compose(v, queue = []) {
    const queue_size = queue.length;
    const input_fns_size = input_fns.length;
    if (queue_size === input_fns_size) {
      return queue[queue_size - 1];
    }
    const next_fn_index = input_fns_size - 1 - queue_size;
    const next_fn = input_fns[next_fn_index];
    const next_value = next_fn(v);
    return _compose(next_value, queue.concat(next_value));
  };
}
function compose2(fn2, fn1) {
  return function(v) {
    return fn2(fn1(v));
  };
}
function compose3(fn3, fn2, fn1) {
  return function(v) {
    return fn3(fn2(fn1(v)));
  };
}
function composeRed(...input_fns) {
  return function (v) {
    return input_fns.reduceRight(invoke, v);
    function invoke(val, fn) { return fn(val); }
  }
}
function curry(fn, arity = fn.length, received_args = []) { // fix this and enforce passed arity ie change to curryN
  return function(...inputs) {
    if (received_args.length + inputs.length >= arity) {
      return fn(...received_args, ...inputs);
    }
    return curry(fn, arity, received_args.concat(inputs));
  }
}
function filterIt(predicatefn, arr) {
  const r = [];
  for (let elem of arr) {
    if (predicatefn(elem)) {
      r.push(elem);
    }
  }
  return r;
}
const filter = curry(function filter(i, results, predicatefn, arr) {
  if (i === arr.length) {
    return results;
  }
  const elem = arr[i];
  const include = predicatefn(elem);
  return filter(
    i + 1,
    include ? results.concat(elem) : results,
    predicatefn,
    arr
  );
})(0)([]);
function filterReducer(fn) {
  return function (curr) {
    const value = typeof curr === 'object'
      ? curr.value
      : curr;
    return ({
      include: !(curr.include === false) && fn(value),
      value
    });
  };
}
function identity(v) { return v; }
function mapIt(mapperfn, arr) {
  const r = [];
  for (let elem of arr) {
    r.push(mapperfn(elem));
  }
  return r;
}
const map = curry(function map(results, mapperfn, arr) {
  if (results.length === arr.length) {
    return results;
  }
  const elem = arr[results.length];
  const elem_transform = mapperfn(elem);
  return map(results.concat(elem_transform), mapperfn, arr);
})([]);
function mapReducer(fn) {
  return function (curr) {
    const value = typeof curr === 'object'
      ? curr.value
      : curr;
    return ({
      include: !(curr.include === false),
      value: fn(value),
    });
  };
}
function not(fn) {
	return function inv(...args) {
		return !fn(...args);
	}
}
function onCondition(conditionalfn) {
	return function(predicatefn) {
		return function(...input) {
			if (predicatefn(...input)) {
				return conditionalfn(...input);
			}
			return void 0;
		};
	};
}
function pipe(...input_fns) {
  return compose(...input_fns.slice().reverse());
}
function pipeLegacy(...input_fns) {
  return function _pipe(v, queue = []) {
    const queue_size = queue.length;
    const input_fns_size = input_fns.length;
    if (queue_size === input_fns_size) {
      return queue[queue_size - 1];
    }
    const next_fn = input_fns[queue_size];
    const next_value = next_fn(v);
    return _pipe(next_value, queue.concat(next_value));
  };
}
function reduceIt(reducerfn, initial_value, arr) {
  let current_value = initial_value;
  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i];
    current_value = reducerfn(current_value, elem, i);
  }
  return current_value;
}
const reduce = curry(function reduce(i, reducerfn, initial_value, arr) {
  if (arr.length === 0) {
    return initial_value;
  }
  return reduce(
    i + 1,
    reducerfn,
    reducerfn(initial_value, arr[0], i),
    arr.slice(1),
  );
})(0);
function trampoline(fn) {
  return function _trampoline(...args) {
    let result = fn(...args);
    while (typeof result === 'function') {
      result = result();
    }
    return result;
  }
}
function transduce(tfn, rfn, initial_value, arr) {
  return arr
    .reduce(
      (acc, curr) => (
        tfn(curr).include ?
          rfn(acc, tfn(curr).value)
          : acc
        ),
      initial_value
    );
}

module.exports.compose = compose;
module.exports.compose2 = compose2;
module.exports.compose3 = compose3;
module.exports.composeRed = composeRed;
module.exports.curry = curry;
module.exports.filter = filter;
module.exports.filterReducer = filterReducer;
module.exports.identity = identity;
module.exports.map = map;
module.exports.mapReducer = mapReducer;
module.exports.not = not;
module.exports.onCondition = onCondition;
module.exports.pipe = pipe;
module.exports.reduce = reduce;
module.exports.trampoline = trampoline;
module.exports.transduce = transduce;
