 /*
Purpose: Helper function for render_options
         Removes <value> from Array, <arr>
*/
function remove_item_once(arr, value) {
    let index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  /*
  Purpose: Helper function for render_options
  */
  function order_options(first, options)
  {
    remove_item_once(options, first)
    options.unshift(first);
  }
