const faker = require('faker');


module.exports.handler = (events, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    }),
  });
}
