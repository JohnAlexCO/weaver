const fs = require('fs')
const weaver = require('./weaver/weaver.js')
const stamp = require('./dateform.js') // THIS IS THE SAME SCRIPT AS IN THE DOCS

const BACKGROUND_COLOR = '#1e0026'
const LIGHTWEIGHT_COLOR = '#ff99dd'
const IMG_BLOCK = '128px'
const TEXT_SCALER = (scale) => { return parseInt(scale*22)+'px' }
const STYLE = 
    weaver.render([
    {tag: 'title', content:'JohnAlex.CO'},
    {tag: 'link', rel:'icon', type:'image/svg+xml', href:'./logo.svg'},
    {tag: 'STYLE', content: 
        "@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');"+
        "@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300&display=swap');"
    },
    {tag: 'style', content: {
        body: {
            'max-width': '640px',
            'margin':'auto',
            'color':'white',
            'background-color': BACKGROUND_COLOR,
            'text-align':'center',
            'font-family':'"Barlow"',
            'font-size':TEXT_SCALER(1)
        },
        div: {
        },
        '.block':{
            'font-family': '"Oswald"',
            'font-size':TEXT_SCALER(0.8),
            display: 'inline-block',
            width: IMG_BLOCK,
            margin: TEXT_SCALER(0.5)
        },
        '.blockImg':{
            'height': IMG_BLOCK,
            'width': IMG_BLOCK
        },
        h1: {
            //'font-family': '"Barlow"',
            'font-size':TEXT_SCALER(2)
        },
        h2: {
            //'font-family': '"Oswald"',
            'font-size':TEXT_SCALER(1.6)
        },
        h3: {
            //'font-family': '"Oswald"',
            'font-size':TEXT_SCALER(1.2)
        },
        p: {
            'font-size':TEXT_SCALER(1)
        },
        a: {
            'font-size':TEXT_SCALER(1),
            'text-decoration':'none',
            'color':LIGHTWEIGHT_COLOR
        },
        '.small': {
            'font-family': '"Oswald"',
            'font-size':TEXT_SCALER(0.8),
            'color':LIGHTWEIGHT_COLOR  
        },
        '.update': {
            position: 'absolute',
            top: '0px', right:'0px',
            'font-size':TEXT_SCALER(0.8),
            margin: TEXT_SCALER(0.6),
            'color':LIGHTWEIGHT_COLOR 
        },
        /*footer: {
            //height:'240px'
        }*/
    }}
])

weaver.newFile('/logo.svg', './static/logo.svg')
weaver.newFile('/weaver.png', './static/weaver.png')
weaver.newFile('/garter.png', './static/garter.png')
weaver.newFile('/soap.png', './static/soap.png')
weaver.newGet('/', homePage)

function newItem(href, img, caption){
    return {tag:'a', href:href, class:'block', content:[
            {tag:'img', class:'blockImg', src:img},
            caption
    ]}
}
function homePage(request){ return {status:200,mime:'text/html',content:HOME} }
const HOME = STYLE + weaver.render([
    {tag:'img', src:'./logo.svg', width:'450px'},
    {tag:'h1', content:'JohnAlex.CO'},
    {tag:'text', class:'update', content:'Updated: Sept 8, 2022 03:15AM'},

    // Portfolio
    {tag:'div', content:[
        newItem('./weaver','./weaver.png','weaver'),
        newItem('./soap','./soap.png','OnlySoap.LIVE'),
        newItem('./studio','./logo.svg','Blood Rose Records'),
        newItem('https://github.com/topics/garter-language', './garter.png', 'Garter (WIP)'),
        newItem('https://open.spotify.com/artist/4gtN5rzfEV0JQJ6GPgjHHJ','https://johnalexco.000webhostapp.com/ino.jpg','INoLonger'),
        newItem('https://ellieblackout.com/', 'https://johnalexco.000webhostapp.com/ellie.jpg', 'ellie blackout*'),
        newItem('https://kirasbracelets.com/','https://johnalexco.000webhostapp.com/kira.jpg', 'Kira\'s Bracelets*'),
        '<br><br>',
        {tag:'p', class:'small', content:'* Recording, Artwork, Production, and/or Promotional Material'}
    ]},

    // Brief Overview
    "From Physical Production and Audio Engineering to Web Development, Systems Programming, and Automation; "+
    "I have experience writing in JavaScript, Assembly, Python, C, and more, "+
    "and I've worked on a range of projects from their inception to launch.",
    
    // Rates and Information
    {tag:'div', content:[
        {tag:'h2', content:'Hiring Me'},
        "If you're interested in hiring me to join your team, please send me an "+
        "<a href='mailto:me@johnalex.co'>e-mail </a> "+
        "about your company and/or project, the position including requirements and scope, "+
        "and be sure to include your preferred contact information. "+
        "I usually respond within 24 hours. <br><br>"+
        "If you're interested in hiring me as the solo-developer for a project, "+
        "please send me an <a href='mailto:me@johnalex.co'>e-mail </a> "+ 
        "describing the project and its scope: what do you want made, "+
        "how quickly do you expect it to be ready to launch, and what does your budget look like. <br><br>"+
        "I'm currently interested in a full or part-time Junior Software Engineer position, so please do reach out!"
    ]},
    // Footer with Links
    {tag:'footer', content:[
        {tag:'h3', content:'Links & Contact'},
        {tag:'a', href:'https://facebook.com/johnalex.co', content:'Facebook<br><br>'},
        {tag:'a', href:'https://github.com/johnalexco', content:'GitHub<br><br>'},
        {tag:'a', href:'https://youtube.com/bloodroserecords', content:'YouTube<br><br>'},
        {tag:'a', href:'mailto:me@johnalex.co', content:'Business E-Mail<br><br>'}
    ]}
])

weaver.server.listen(8080)
