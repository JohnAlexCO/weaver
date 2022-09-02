var PREFUNC = (request) => { return null }
function prefunction(func) { if ( typeof func == 'function' ){PREFUNC = func} else {return {error: 'prefunction requires type function, not '+typeof func, src:'post.js'}}}

var routes = {
    nodata: (request)=>{
        return { status: 400, mime:'text/raw', content: '400 BAD REQUEST: UNABLE TO PARSE DATA'}
    }
}
function list(){ return ( Object.keys(routes) ).toString() }
function append(name, func) { routes[name] = func }
function process(request) {
    try {
        try { PREFUNC(request) } catch(err) { console.error(err) } // added to allow user-defined preprocess functions for stuff like verbose logging or testing
        if ( request.postData === undefined ) { logger('unable to get post data'); return routes.nodata(request)}
        if (routes[request.url]) { return routes[request.url](request) }
        else { return { error: 'no route '+(request.url), src:'post.js' } }
    }
    catch(err) { return { error: err, src:'post.js' } }
}
module.exports = { list, process, append, prefunction }
