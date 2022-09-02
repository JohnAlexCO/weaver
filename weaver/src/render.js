function ObjectToHTML_Script(object) {
    console.log(object)
    if ( typeof object.content === 'function'){
        return '<script>'+object.content.toString()+'</script>'
    }

    if ( Array.isArray(object.content) ) {
        var string = '<script>';
        for ( let item in object.content ) {
            string += object.content[item].toString()
        }
        return string+'</script>'
    }
    console.error('<script> object given type '+typeof object+', expected function or array')
    return 'ERROR: <script> given invalid type'
}

function ObjectToHTML_Style(object) {
    if( Array.isArray(object.content) ||
        /*typeof object === 'string' ||
        typeof object === 'function' ||
        typeof object === 'number'*/
        typeof object !== 'object' ){
            console.error('<style> object given type '+typeof object+', expected dict object')
            return 'ERROR: <style> given invalid type'
        }
    var string = ''; // https://stackoverflow.com/questions/5612787/converting-an-object-to-a-string
    for ( let item in object.content ) {
        string += item +':'+ JSON.stringify( object.content[item] ) +'\n'
    }
    return '<style>'+string+'</style>' 
}


function render(object) {
    // Check if an object, function, string, et cet
    if ( typeof object === 'string' ) { return object }
    if ( typeof object === 'function') { return object.toString(); } // https://turreta.com/2017/02/04/javascript-convert-function-to-string-and-back/
    if ( Array.isArray(object) ) { var text = ''; for(let i in object){ text+= render(object[i]) }; return text }

    // If it's an object, check if tag SCRIPT or STYLE
    if (object == undefined) { return '' } // Explanation below after function
    if (object.tag == 'script') { return ObjectToHTML_Script(object) }
    if (object.tag == 'style') { return ObjectToHTML_Style(object) }
    
    // combine all the attributes
    object.content = render(object.content) // make sure to convert whatever it contains first 
    var attrs = '';
    for ( let key in object ) {
        switch(key) {
            case 'tag': case 'content': case 'innerHTML': break;
            case 'onload':
                console.warn(
                    'NOTE: <object onload> may not function properly if it contains a " symbol'
                )
                //break; intentionally commented out so control flows into default
            default: attrs += ' '+ key + '="'+object[key]+'"'
        }
    }
    // combine the tag and closers
    text =  '<'+ object.tag +
            attrs + '>'+
            object.content + '</'+ object.tag +'>'
    return text
}
/*
    Okay, so the line   -> if (object == undefined) { return '' }
    was added because some items do not contain content, such as <img> elements,
    the line            -> object.content = render(object.content)
    causes fatal errors. To fix this without radically changing how this renderer behaves
    and preserving its very simple nature, 
    Since object.content is what's passed to the render function, 
    we need to catch wht happens when the *object passed in* is undefined, not the property itself.
*/

module.exports = {
    render
}
