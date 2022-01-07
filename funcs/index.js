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
function curry(fn, levels = fn.length, received_args = []) {
  return function(...inputs) {
    if (received_args.length + inputs.length >= levels) {
      return fn(...received_args, ...inputs);
    }
    return curry(fn, levels, received_args.concat(inputs));
  }
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

module.exports.compose = compose;
module.exports.compose2 = compose2;
module.exports.compose3 = compose3;
module.exports.curry = curry;
module.exports.not = not;
module.exports.onCondition = onCondition;
module.exports.pipe = pipe;