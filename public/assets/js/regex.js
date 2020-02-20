function regex(string) {
    // Make string "url"-safe
    // If the string is "à condition que" it will change it into "a-condition-que"
    // If the string is s'asseoir it will turn it into s_asseoir
    // It will turns spaces in to dashes
    // It will turn accented characters into non-accented characters
    // It will change ' into _
    let transformedArr = [];
    for (var i = 0; i < string.length; i++) {
        if (string[i] !== " ") {
          transformedArr.push(string[i]);
        } else {
          transformedArr.push('-');
        }
    }
      var transformedString = transformedArr.join('');
      return transformedString;
}

module.exports = regex;










