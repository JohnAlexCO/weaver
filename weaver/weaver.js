// =========================================== IMPORT DEPENDENCIES
const http = require('http')
const decode = require('./src/decode.js')
const { render } = require('./src/render.js')
const { error } = require('./src/errors.js')
const files = require('./src/files.js')
const get = require('./src/get.js')
const post = require('./src/post.js')
const pre = require('./src/request.js') // -> const hash = require('./src/get.js')

// expose certain internals to external calling
const idRequired = pre.id_required
const getPrefunction = get.prefunction
const postPrefunction = post.prefunction 

// =========================================== PAGE APPEND FUNCTIONS
function newFile(route, filename) { get.append( route, ()=> { return files.read(filename) } ) }
function newGet(route, func){ get.append(route, func) }
function newPost(route, func){ post.append(route, func) }

// ========================================== ROUTING REQUESTS
function route(request) {
    var chop = request.url.split('?') 
    if ( chop.length == 1 ) { request.url = decode.decode(request.url) }
    if ( chop.length == 2 ) { 
        request.query = decode.decode(request.url.split('?')[1])
        request.url = decode.decode(request.url.split('?')[0])
        //if ( request.url.error || request.query.error ) { return error(400, 'no_id', '???', request.url.err) }
    }

    try { 
        switch(request.method) {
            case 'GET': 
                try { var page = get.process(request);
                if (page.content !== undefined ) { return page } 
                else { return error(404, request.userID, request.url) } } 
                catch(err) {  return error(500, request.userID, request.url, err) } break;
    
            case 'POST':
                var body = ''
                request.on('data', d => {
                    body += d
                    if (body.length > 1024*1024*4) {
                        return error(413, request.userID, request.url)
                    }
                });
                request.on('end', () => {
                    request.postData = body
                    try { var page = post.process(request); 
                        if (page.content !== undefined ) { return page } 
                        else { return error(405, request.userID, request.url) } } 
                    catch(err) { return error(500, request.userID, request.url, err) }
                })
                break;
    
            default: return error(405, request.userID, request.url)
        }
        } catch(err) { return error(500, request.userID, request.url, err) }
}

// =========================================== CONVERT AND SERVE OBJECTS
function serve(response, page) {
    response.writeHead( page.status, {'Content-Type': page.mime } )
    response.end(page.content)
}

// ========================================== http.Server that wraps routing function
var server = http.createServer(function(request, response) {
    if ( pre.preProcess(request) != '200 OK' ) { return serve(response, error(400, 'no_id', request.url)) }
    var page = route(request); if ( page.status == 200 ) { error(200, request.userID, request.url) }
    return serve(response, page)
});

// =========================================== EXPORTS
module.exports = {
    server, newFile, newGet, newPost, idRequired, render, getPrefunction, postPrefunction
}
