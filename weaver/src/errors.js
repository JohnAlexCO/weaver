const fs = require('fs')
var max_size = 1024*4
function output(text) {
    /*var i=0; var fn = (i) => { 'output_'+i+'.log' } 
    while ( fs.existsSync( fn(i) ) && fs.statSync( fn(i) ).size >= max_size ) { i++ }
    fs.appendFileSync( fn(i), text+'\n' )*/
    console.log(text)
}

function error(code, uid, url, err='') {
    switch(code) {
        case 200: // GOOD REQUESTS STILL NEED TO BE LOGGED! NO RETURN VALUE NEEDED
        output(uid+' @ '+url+' -> 200 OKAY')
        break;

        case 400:
            output(uid+' @ '+url+' -> 400 BAD REQUEST')
            return {
                status: 400,
                mime: 'text/raw',
                content: 'BAD REQUEST'
            }; break

        case 404:
            output(uid+' @ '+url+' -> 404 NOT FOUND')
            return {
                status: 404,
                mime: 'text/raw',
                content: 'RESOURCE NOT FOUND, '+url
            }; break

        case 405:
            output(uid+' @ '+url+' -> 405 NOT ALLOWED')
            return {
                status: 405,
                mime: 'text/raw',
                content: 'METHOD NOT ALLOWED, '+url
            }; break

        case 413:
            output(uid+' @ '+url+' -> 413 TOO LARGE')
            return {
                status: 413,
                mime: 'text/raw',
                content: 'REQUEST TOO LARGE'
            }; break

        case 500:
            output(uid+' @ '+url+' -> 500 INTERNAL ERROR,'); output(err+'')
            return {
                status: 500,
                mime: 'text/raw',
                content: 'INTERNAL SERVER ERROR'
            }; break
        
        default:
            output(uid+' @ '+url+' -> 500 INTERNAL ERROR, ALSO GIVEN BAD ERROR'); output(err+'')
            return {
                status: 500,
                mime: 'text/raw',
                content: 'INTERNAL SERVER ERROR'
            }

    }
}

module.exports = { error }