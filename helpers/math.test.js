const {x:mul , y:str, z:obj } = require("./testingTests");

test("should multiply two numbers and return a number ", () => {
  expect( mul(1, 1) ).toBeGreaterThan(-1)
})

test("should multiply two numbers and return a number ", () => {
  expect( mul(18, 2) ).toBe(36);
})