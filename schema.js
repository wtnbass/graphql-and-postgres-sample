const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} = require('graphql');
const Db = require('./db');

const User = new GraphQLObjectType({
  name: 'user',
  description: 'user',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    posts: {
      type: new GraphQLList(Post),
      resolve: (user, args, ctx) => (
        user.getPosts()
      ),
    }
  }),
});

const Post = new GraphQLObjectType({
  name: 'post',
  description: 'post',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    user: {
      type: User,
      resolve: (post) => post.getUser()
    }
  }),
})

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'query root',
  fields: () => ({
    users: {
      type: new GraphQLList(User),
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (root, args, ctx)  => (
        Db.models.user.findAll({where: args})
      ),
    },
  }),
})

const schema = new GraphQLSchema({
  query: Query,
});

module.exports = schema;
