const weaver = require("./weaver.js")

weaver.idRequired(false)
weaver.getPrefunction( (request)=>{ console.log(weaver.getList()) } )

textContent = 'See how easy it is to build websites using weaver! '+
'HTML, CSS, and JavaScript all condensed to uh, just JavaScript!'
const launchPage = weaver.render({
  tag: 'html',
  content: [
    {tag: 'style', content: {
      img: {
        width: '200px'
      },
      body: { 
        color:'#fff', 
        'background-color': '#000',
        'text-align': 'center',
        width: '400px',
        margin: 'auto'
      },
      p: { 'font-size': '22px' }
    }
    },
    { tag: 'body', content: [
      { tag: 'img', src:'https://johnalexco.000webhostapp.com/logo.svg' },
      { tag: 'h1', content:'Hello, World!' },
      { tag: 'p', content: textContent }
    ]}
  ]
})

function index(request) { return {
    status: 200,
    mime: "text/html",
    content: launchPage
}}; weaver.newGet("default", index)

weaver.newPost("/post", (request)=>{ return {
    status: 200,
    mime: "text/html",
    content: weaver.render({
        tag: "p",
        content: (request.postData).toString()
    })
}})
weaver.server.listen(8080)