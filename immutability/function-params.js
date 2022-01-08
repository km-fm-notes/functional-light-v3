// Best practice: as writer of a function, assume params are read only
// Otherwise you create bug vectors 
// 1) The caller may not include object.freeze
// 2) Function may be used all over the place later
// 3) Hard to track down value changes

function processprocess_order(order) { // Not good to create side effects
  if (!('status' in order)) {
    order.status = 'complete';
  }
  console.log('sending to DB:', order);
}

function processOrderV2(order) { // Better
  const process_order = { ...order };
  if (!('status' in process_order)) {
    process_order.status = 'complete';
  }
  console.log('sending to DB:', process_order);
}

// Tightest and safest data structure is a read-only data structure

