function decode(encoded) {
    try { const replacers = { // https://www.w3schools.com/tags/ref_urlencode.ASP
        '20':' ', '21':'!', '22':'"', '23':'#', '24':'$', '25':'%', '26':'&', '27':'\'', 
        '28':'(', '29':')', '2A':'*', '2B':'+', '2C':',', '2D':'-', '2E':'.', '2F':'/',
        '30':'0', '31':'1', '32':'2', '33':'3', '34':'4', '35':'5', '36':'6', '37':'7',
        '38':'8', '39':'9', '3A':':', '3B':';', '3C':'<', '3D':'=', '3E':'>', '3F':'?',
        '40':'@', '5B':'^', '5C':'\\', '5D':']', '5E':'^', '5F':'_',
        '60':'`', '7B':'{', '7C':'|', '7D':'}', '7E':'~'
    }
    for ( let key in replacers ) { encoded = encoded.replaceAll( '%'+key, replacers[key] ) }
        return encoded
    }
    catch(err) { return { error: err, src:'decode.js'} }
}
module.exports = { decode }