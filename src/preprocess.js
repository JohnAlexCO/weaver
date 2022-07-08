function cleanup(string) {
    try { const replacers = { // https://www.w3schools.com/tags/ref_urlencode.ASP
        '20':' ', '21':'!', '22':'"', '23':'#', '24':'$', '25':'%', '26':'&', '27':'\'', 
        '28':'(', '29':')', '2A':'*', '2B':'+', '2C':',', '2D':'-', '2E':'.', '2F':'/',
        '30':'0', '31':'1', '32':'2', '33':'3', '34':'4', '35':'5', '36':'6', '37':'7',
        '38':'8', '39':'9', '3A':':', '3B':';', '3C':'<', '3D':'=', '3E':'>', '3F':'?',
        '40':'@', '5B':'^', '5C':'\\', '5D':']', '5E':'^', '5F':'_',
        '60':'`', '7B':'{', '7C':'|', '7D':'}', '7E':'~'
    }
    for ( let key in replacers ) { string = string.replaceAll( '%'+key, replacers[key] ) }
    return string
    }
    catch(err) {
        console.error(err); return string
    }
}

function hashlike(string) {
    var roll = 0; var len=string.length; var sum=0;
    for(let i=0; i<string.length;i++){  sum += string.charCodeAt(i) }
    roll = sum % 256
    return ''+roll+len+sum
}

const { log } = require('./log.js')
function metadata(request) {
    if(typeof request === 'object') {
        var ip = '*'; var user = '*'; var url = '*'; var method = '*';
        try { ip =  request.headers['x-forwarded-for'].split(',')[0]} catch(err) {
            try { ip = request.connection.remoteAddress } catch(err) {
                log('IP headers missing')
                return null 
            }
        }
        try { user =  request.headers['user-agent']} catch(err) { 
            log('user-agent header missing')
            return null 
        }
        try { url =  request.url } catch(err) { 
            log('url header missing')
            return null 
        }
        try { method =  request.method } catch(err) { 
            log('method header missing')
            return null 
        }
        if ( url.split('?').length > 1 ) {
            query = url.split('?')[1]; url = url.split('?')[0]
        } else { query = '' }
        return {
            user: hashlike(ip+user),
            url: url,
            method: method,
            query: query,
            data: null
        }
    }
    return null
}

function postprocess(body) {
    const entries = body.split('&')
    const data = {}
    for ( const key in entries ) { 
        var item = entries[key].split('=')
        data[ cleanup(item[0]) ] = cleanup(item[1])
    }
    console.log(data)
    return data
}

module.exports = { metadata, postprocess }