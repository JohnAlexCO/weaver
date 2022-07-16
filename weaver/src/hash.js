function hashlike(string) {
    var roll = 0; var len=string.length; var sum=0;
    for(let i=0; i<string.length;i++){  sum += string.charCodeAt(i) }
    roll = sum % 256
    return ''+roll+len+sum
}
module.exports = { hashlike }