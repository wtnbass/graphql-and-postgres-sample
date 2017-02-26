const Db = require('../db');
const faker = require('faker');

async function execute() {
  await Db.sync({force: true});
  for (let i = 0; i < 10; i++) {
    const user = await Db.models.user.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
    });
    for (let j = 1; j <= 20; j++) {
      await user.createPost({
        title: `this is a post written by ${user.name}`,
        body: `this is ${user.name}'s ${ordinalify(j)} article`,
      });
    }
  }
}

const ordinalify = number => (
  number === 1 ? `${number}st` :
  number === 2 ? `${number}nd` :
  `${number}th`
);

execute();
