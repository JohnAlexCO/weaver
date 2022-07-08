const { metadata, postprocess } = require('./preprocess.js')
const { log } = require('./log.js')
var http = require('http');
var server = http.createServer(function (request, response) {

    // https://www.pabbly.com/tutorials/node-js-http-server-handling-get-and-post-request/
    try { var meta = metadata(request) } catch(err) { log(err) }
    if ( meta === null ) { log('metadata collection failed')}

    if (meta.method === "GET") {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end( get(meta) );
    } 
    
    else if (meta.method === "POST") {
        var body = "";
        request.on("data", function (chunk) { body += chunk; });
        request.on("end", function(){
            meta.data = postprocess(body)
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end( post(meta) );
        });
    }
})

function get(meta) { 
    if ( gets[meta.url] ) { 
        log ( '    '+meta.user+' -> GET 200 '+meta.url )
        return gets[meta.url](meta)
    }
    else {
        log ('    '+meta.user+' -> GET 404 '+meta.url )
        return gets.default(meta)
    }
}

function post(meta) {
    if ( posts[meta.url] ) {
        log ('    '+meta.user+' -> POST 200 '+meta.url)
        return posts[meta.url](meta)
    }
    else {
        log ('    '+meta.user+' -> POST 405 '+meta.url)
        return posts.default(meta)
    }
}

var gets = { default: ()=>{ return '404 RESOURCE NOT FOUND' }}
var posts = { default: ()=>{ return '405 METHOD NOT ALLOWED' }}

function newGet( name, func ) { gets[name] = func }
function newPost( name, func ) { post[name] = func }

function run(port) { server.listen(port) }

//newGet('/', (data)=>{ return '<form method="post" action="./"><input name="color" type="text"/><input name="input" type="text"/><input type="submit"/></form>' })
//server.listen(8080)

module.exports = { newGet, newPost, run  } 