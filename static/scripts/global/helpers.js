/*
Helper functions
*/


/* Remove an item from an array */
function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele !== value
    })
  }
  
/* Round to two decimal places */
function two_decimal_places(num){
    return Math.round((num + Number.EPSILON)*100)/100
}

/*
source: https://dev.to/ycmjason/how-to-create-range-in-javascript-539i
Replicate's python's range()
*/
function range(start, end) {
  return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start);
}
