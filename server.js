const express = require('express');
const graphqlHTTP = require('express-graphql');
const dataloaderSequelize = require('dataloader-sequelize').default;
const schema = require('./schema');
const db = require('./db');

const PORT = 3000;
const app = express();

dataloaderSequelize(db);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  context: {db},
}));

app.listen(PORT, () => {
  console.log(`start server on port ${PORT}`);
});
