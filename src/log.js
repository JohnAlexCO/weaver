const fs = require('fs')
function log() { // arguments
    var string = '';
    for ( let item in arguments ) {string += arguments[item]+' '}
    fs.appendFileSync('output.log', string+'\n')
    process.stdout.write(string+'\n')
}

module.exports = { log } 