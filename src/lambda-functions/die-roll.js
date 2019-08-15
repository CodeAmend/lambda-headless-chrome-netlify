exports.handler = (event, context, callback) => {
  const { sides } = event.queryStringParameter;
  const rollValue = Math.floor(Math.random() * (sides || 6));

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      sides,
      rollValue,
    })
  });
}
