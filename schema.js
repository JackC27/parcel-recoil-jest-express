const { graphql, buildSchema } = require("graphql");

let schema = buildSchema(`
  type Query {
    hello: String
    say: String
    love: String
  }`
)

module.exports = schema;