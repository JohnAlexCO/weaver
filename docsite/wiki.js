const weaver = require("../weaver.js")
const stamp = require("./formatDate.js") // this is borrowed code 
const fs = require("fs")
const md = require("showdown") // https://github.com/showdownjs/showdown

// Log All Requests 
function log(content) {
    var fn = 0
    while(true) {
        var name = './log/requests'+fn+'.log'
        if ( !fs.existsSync(name) ) { 
            fs.closeSync(fs.openSync(name, 'w')) // https://flaviocopes.com/how-to-create-empty-file-node/
            fs.writeFileSync(name, content); return fn 
        }
        else if ( (fs.statSync(name)).size < 1024*4 ) { fs.appendFileSync(name, content); return fn }
        fn++
    }
}
function dump(request) {
    return  stamp.formatDate( new Date() )+'\t'+
            request.userID +'\t'+
            request.method+'\t'+
            request.url+'\t'+ 
            ( (request.query)? '?'+request.query+'\n' : '\n' )
}
weaver.getPrefunction( (request)=>{
    log( dump(request) )
})

const header = weaver.render([
    { tag: 'style', content:{
    body: { 
    /* CONTENT BOUNDING */
        'margin':'auto',
        padding:'24px',
        width: '640px',
    /* PAGE */
        'background-color':'black', 
        color:'white',
        'font-family':'verdana',
    },
    /* ELEMENT STYLIZATION */
    pre: {padding: '6px', 'background-color':'#333'},
    code: {'background-color':'#333', color:'white'},
    div: {'text-align':'center'},
    h1: {'text-align': 'center', color:'#ebd800'},
    h3: {'text-align': 'center', color:'#ebd800'},
    a: {'text-decoration':'none', color:'orange'},
    i: {color:'#cb0'}
    }},
    { tag: 'div',content: [
        {tag: 'img', src:'https://github.com/JohnAlexCO/weaver/blob/main/art/weaver_corner.png?raw=true', width:'200px' },
        {tag: 'h1', content:'weaver'},
    ]}
])

// GET ALL FILES IN PAGES DIR AND CREATE RENDER FUNCTIONS
fs.readdirSync('./pages').forEach(filename => {
    weaver.newGet('/'+filename, (request)=>{
        var converter = new md.Converter()
        var content = fs.readFileSync('./pages/'+filename, {encoding:'utf-8'})
        return {
            status: 200,
            mime: 'html',
            content:    header+
                        '<div><i>docs/'+filename+'</i></div>'+
                        converter.makeHtml(content)+
                        '<a href="index.md">*** RETURN TO THE HOME PAGE ***</a>'
        }
    })
});
// PLUS THE HOME PAGE ITSELF ; THIS IS ACTUALLY REDUNDANT CODE AS-IS BUT IT MEANS '/' WORKS RIGHT
weaver.newGet('/', (request)=> { 
    var converter = new md.Converter()
    var content = fs.readFileSync('./pages/index.md', {encoding:'utf-8'})
        return {
        status: 200,
        mime: 'html',
        content: header+ converter.makeHtml(content)
    }
})
weaver.server.listen()

