/**
 * Divide un string en un array de strings, partiendo del final del string
 * y finalizando en el principio.
 * @param str string a dividir
 * @param sliceBy cada cuántos caracteres dividie
 * @returns array de strings
*/
function sliceByUntilEnd(str, sliceBy) {
  let result = [];

  if (str.length >= sliceBy) {
    const portion = str.slice(str.length - sliceBy, str.length);
    result.push(portion);

    const resultantString = str.slice(0, str.length - sliceBy);

    result = result.concat(sliceByUntilEnd(resultantString, sliceBy));
  } else if (str.length) {
    result.push(str);
  }

  return result;
}

/** Concatena un array de strings con el caracter pasado por parámetro.
 * @param subsStrings strings a concatenar
 * @param concatChar caracter que dividirá cada par de subsStrings concatenados
 * @returns un string de todos los substrings concatenados
 */
function concatAll(subStrings, concatChar) {
  let result = '';
  for (let i = 0; i < subStrings.length; i++) {
    result = result.concat(i ? concatChar : '', subStrings[i]);
  }

  return result;
}

/**
 * Transforma el número del monto de un precio en un string usando el punto
 * como separador de millares
*/
function formatPriceAmount(amount) {
  const amountStr = amount.toString();
  const amountSubStrings = sliceByUntilEnd(amountStr, 3).reverse();

  return concatAll(amountSubStrings, '.');
}

export {
  sliceByUntilEnd,
  concatAll,
  formatPriceAmount,
};
