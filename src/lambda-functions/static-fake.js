exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      firstName: "First Name",
      lastName: "Last Name",
    })
  });
}
