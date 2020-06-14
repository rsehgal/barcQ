/*
** This file contains some core helper functions in javascript.
** Like finding unique elements in array in javasript
*/

Array.prototype.contains = function(v) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === v) return true;
  }
  return false;
};

Array.prototype.unique = function() {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (!arr.contains(parseInt(this[i]))) {
      arr.push(parseInt(this[i]));
    }
  }
  return arr;
}

Array.prototype.UniqueAndSorted = function(){
  return this.unique().sort(function(a, b){return a-b});
}
