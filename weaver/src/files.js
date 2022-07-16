const fs = require('fs')
function read(filename) {
    var fn = filename.split('.')
    switch( fn[fn.length-1] ) {
        case 'zip':    contentType = 'application/zip'; break;
        case 'json':   contentType = 'application/json'; break;
        case 'png':    contentType = 'image/png'; break; 
        case 'jpg':    contentType = 'image/jpg'; break;
        case 'svg':    contentType = 'image/svg+xml'; break;
        case 'txt':    contentType = 'text/raw'; break;
        case 'md':     contentType = 'text/raw'; break;
        case 'js':     contentType = 'text/javascript'; break;
        case 'css':    contentType = 'text/css'; break;
        default:       contentType = 'text/html'; break;
    }
    try {
        var content = fs.readFileSync(filename)
        return {status:200, mime:contentType, content:content}
    }
    catch(err) { return { error: err, src:'files.js' }} // let main handle errors //catch(err) { return {status:404, mime:'text/raw', content:'404 Resource Not Found, '+filename}}
}
module.exports = { read }