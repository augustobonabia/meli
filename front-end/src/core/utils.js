function sliceByUntilEnd(str, sliceBy) {
  let result = [];

  if (str.length >= sliceBy) {
    const portion = str.slice(str.length - sliceBy, str.length);
    result.push(portion);

    const resultantString = str.slice(0, str.length - sliceBy);

    result = result.concat(module.exports.sliceByUntilEnd(resultantString, sliceBy));
  } else if (str.length) {
    result.push(str);
  }

  return result;
}

function concatAll(subStrings, concatChar) {
  let result = '';
  for (let i = 0; i < subStrings.length; i++) {
    result = result.concat(i ? concatChar : '', subStrings[i]);
  }

  return result;
}

module.exports = { sliceByUntilEnd, concatAll };
