var PREFUNC = (request) => { return null }
function prefunction(func) { if ( typeof func == 'function' ){PREFUNC = func} else {return {error: 'prefunction requires type function, not '+typeof func, src:'get.js'}}}

var routes = {
    // return an error instead of defaulting: no default page is necessary
}
function list(){ return ( Object.keys(routes) ).toString() }
function append(name, func) { routes[name] = func }
function process(request) {
    try { 
        try { PREFUNC(request) } catch(err) { console.error(err) } // added to allow user-defined preprocess functions for stuff like verbose logging or testing
        if (routes[request.url]) { 
            try { return routes[request.url](request) }
            catch(err){ return { error: 'function failed to return, '+(request.url), src:'get.js' } } 
        }
        else { return { error: 'no route '+(request.url), src:'get.js' } }
    } catch(err) { return { error: err, src:'get.js' } }
}

module.exports = { list, process, append, prefunction }
