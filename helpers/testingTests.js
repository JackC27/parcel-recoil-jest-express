let testFn = {};
testFn.x = (a, b) => {
  return a * b;
}

testFn.y = (name) => {
  return "hello " + name;
}

testFn.z = (...arr) => {
  let res = {};
  let count = 0;
  console.log(...arr );
  arr.forEach( (i) => {
    /* if(Array.isArray(i)){
      z(...i, res)
    }else{ */
      res[i] = count++;
    
  })
  return res;
}

console.log( testFn.z("Nancy", "Nate", "David", ["Jack", "Tom", "Jetta"], ["cup", "peach", "book", 5]) );

module.exports = testFn;
