function isObject(o) {
  return typeof o === 'object';
}

function sendOk(res, content) {
  let response = content;

  if (!isObject(content)) {
    throw new Error('Response content must be an object.');
  }

  if (res.author) {
    response = { author: res.author, ...response };
  }

  res.send(response);
}

module.exports = {
  sendOk,
};
