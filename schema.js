const { graphql, buildSchema } = require("graphql");

//graphQL
//let gotQL = graphql(schema, `{test1, test2}`, root)

const root = {
  test1: "Jack Crish",
  test2: "Jetta",
  test3: {
    name: "Jack",
    address: {
      city: "Nowhere",
      state: "Somewhere",
      zip: 88899
    }, 
    age: 30
  },
  test4: [
    {name: "test 4-1"}, {name: "test 4-2"}, {name: "test 4-3"}
  ]
}

let blank = null;
//graphQL
gotQL.then(response => {
    console.log(response);
    return response;
  })
  .then(i => {
    console.log(" I ", i)
    blank = i.data.say;
    console.log("BLANK ", blank);
  })


let schema = buildSchema(`
  type Query {
    test1: String
    test2: String
  }`
)

module.exports = schema;