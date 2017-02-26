const Sequelize = require('sequelize');

const Conn = new Sequelize(
  "graphql",
  "postgres",
  "postgres",
  {
    dialect: 'postgres',
    host: 'localhost',
  }
);

const User = Conn.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
  },
});

const Post = Conn.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
  },
})

User.hasMany(Post);
Post.belongsTo(User);

module.exports = Conn;
