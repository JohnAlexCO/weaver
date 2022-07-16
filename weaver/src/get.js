var routes = {
    // return an error instead of defaulting: no default page is necessary
}
function append(name, func) { routes[name] = func }
function process(request) {
    try { 
        if (routes[request.url]) { return routes[request.url](request) }
        else { return { error: 'no route '+(request.url), src:'get.js' } }
    } catch(err) {
        return { error: err, src:'get.js' }
    }
}

module.exports = { process, append }