var routes = {
    nodata: (request)=>{
        return { status: 400, mime:'text/raw', content: '400 BAD REQUEST: UNABLE TO PARSE DATA'}
    }
}
function append(name, func) { routes[name] = func }
function process(request) {
    if ( request.postData === undefined ) { logger('unable to get post data'); return routes.nodata(request)}
    if (routes[request.url]) { return routes[request.url](request) }
    else { return { error: 'no route '+(request.url), src:'post.js' } }
}
module.exports = { process, append }