const { hashlike } = require('./hash.js')

var ID_REQUIRED = false ; function id_required(bool) { ID_REQUIRED = bool }

function preProcess(request){
    if(typeof request === 'object') {
        var string = new Date().toString();
        var ip = undefined
        var user = undefined
        var url = undefined
        var method = undefined

        try { ip =  request.headers['x-forwarded-for'].split(',')[0]} catch(err) { if (ID_REQUIRED){return{ error: 'unable to determine IP', js: err, src:'request.js' }}}
        try { user =  request.headers['user-agent']} catch(err) { if (ID_REQUIRED){return{ error: 'unable to determine user-agent', js: err, src:'request.js' }}}
        try { url =  request.url } catch(err) { return{ error: 'unable to determine url of request', js: err, src:'request.js' }}
        try { method =  request.method } catch(err) { return{ error: 'unable to determine method of request', js: err, src:'request.js' }}
        
        // if we were unable to get any of this data
        if ( ID_REQUIRED && ( ip == undefined || user == undefined ) ) { return { error: 'request missing required ip headers', js: err, src:'request.js' } } 
        else { ip='0.0.0.0'; user='No_ID' }
        if ( url == undefined || method == undefined ) { return { error: 'request missing required url and method headers', js: err, src:'request.js' } }
        request.userID = ip+':'+hashlike(user)
        return '200 OK'
    }
    else { return { error: 'typeof '+(typeof request), src: 'request.js'} }
}

module.exports = { preProcess, id_required }