# weaver
A simple library for rapid website development, designed primarily for use with cPanel

*formerly named crawler*

## Basic Use
1. Download and unzip Weaver into your project directory.
2. Write an `app.js` file, like so
```javascript
const weaver = require('./weaver.js')
weaver.newGet('/', (request)=>{ return {
    status: 200,
    mime: 'text/html',
    content: '<h3>Hello, World!</h3>'
} })
weaver.newFile('/favicon.ico', './static/favicon.ico')
weaver.id_required = false // disables the requirement that remote addr exists; useful for local testing
weaver.server.listen(8080) // remove the port number when you upload this code to cPanel
```
3. Create a cPanel node application and replace the auto-generated `app.js` with the one you wrote,
then upload the unzipped Weaver files to your server, too.
4. Refresh the node application you created and it should be running.

## Documentation

### Routing 
Routing with Weaver is super straight-forward. The **newGet** and **newPost** functions both take
a *route* and a *function* as arguments, where the function accepts a *request*-object.
The request object is a normal `http` object, but that has been guarenteed to also contain the following attributes:
- `userID`: a unique number that identifies who made an incoming request (if `ID_REQUIRED ` is set `false` then this might be set to `"No_ID"`)
- `url`: the path to the resource the request is for, minus any query data
- `method`: the request method, such as *POST* or *GET*.
- `query`: any query data attached to the url
- (POST-requests only) `postData`: an object made from the name-value pairs of a regular post request. If no data is passed into a post request,
weaver returns a default *Status 400: BAD REQUEST* response. To override this behavior, create a post route named `"nodata"` 

### Creating Pages
Weaver also has a *render* function that converts properly-formatted JavaScript objects into HTML Documents.
The render function accepts an object (or array of objects) as the argument.

#### HTML
\**<html>**objects (any tag besides `script` or `style`) expect to have the `tag` attribute.
Any innerHTML, children, or other content should be put within the `content` attribute.
A *<div>* object with some text and a header within it might look something like this:
```javascript
{ tag: 'div',
  content: [
    { tag: 'h1', content: 'Header 1' },
    'Hello, World!'
  ]
}
```
and should properly be rendered to HTML as
```html
<div><h1>Header 1</h1>Hello, World!</div>
```

#### Embed JavaScript
**<script>** objects (`{tag: "script"}`) expect the content to be either a function, or an array of functions.
These functions should ideally be declared within the array itself, both for readability and to ensure
that the renderer captures the name of the function(s). Take this very simple example:
```javascript
{ tag: 'script',
  content: function warm(i){
    console.log(i)
}}
```
When the renderer gets to this object, it will properly generate HTML from it
```html
<script>function warm(i) {
  console.log(i)
}</script>
```

#### CSS Stylesheets
**<style>** objects (`{tag: "style"}`) expects a regular JSON-like object as its content, not too dissimilar from regular CSS.
So, setting the font-family and window colors might look like this:
```javascript
{ tag: 'style',
  content: {
    body: {
      'color': 'white',
      'background-color': 'black',
      'font-family': 'verdana'
    },
    p: {
      'font-size': '14px'
    }
  }
}
```
    
## And My Hello World?
"Hello World" is trivially easy, so let's instead take some text input from the user, and then return it to them when they hit `<submit>`.
No CSS in this example, just to keep it brief:
```javascript
const weaver = require("./weaver.js")
weaver.newGet("/", (request)=>{ return {
    status: 200,
    mime: "text/html",
    content: weaver.render({
      tag: "body",
      content: [
        { tag: "form", method: "post", action: "./", content: [
            { tag: "input", id: "text", name: "text" },
            { tag: "input", type: "submit" }
          ]
        }
      ]
    })
}})
    
weaver.newPost("/"), (request)=>{ return {
    status: 200,
    mime: "text/html",
    content: weaver.render({
        tag: "p",
        content: (request.postData).toString()
    })
}})
weaver.server.listen()
```

