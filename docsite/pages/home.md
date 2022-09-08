### The TLDR
1. Download and unzip Weaver into your project directory.
2. Write an `app.js` file, *such as our example [app.js](./app.js)*
4. Create a cPanel node application and replace the auto-generated `app.js` with the one you wrote
5. Clone Weaver into the cPanel application's directory 
6. Refresh the node application you created

# Introductory Tutorial

The basic control flow for weaver is super simple:

1. Define a bunch of routes as functions that take a request
2. Tell Weaver you're ready to host (and optionally over what port)

That's pretty much it. So how do you get started?

First, of course, is to import weaver for your app to use. 
I recommend cloning weaver into the project directory within a folder named weaver, and then importing it like so:
```javascript
const weaver = require('./weaver/weaver.js')
```
It might look a little weird, but it keeps the directory nice and tidy.
Then you're going to want to define some routes. 
To keep it really simple, I'm going to do one **GET** and one **POST**,
where one is a form that takes data and the other returns the submitted data to the user.

### Responses
All route functions should return an object that contains a Status code, a MIME-type, and the content itself.
A simple hello world response might look like
```javascript
return { status: 200, mime: 'raw', content: 'Hello, World!' }
```
Currently, Weaver supports the html, zip, json, png, jpg, svg, txt, md, js, and css MIME-types,
and the status codes 200, 400, 404, 405, 413, and 500. I plan on adding in support for the other main ones and for custom error-handling, soon.

### Handling Requests
We'll start off by defining our first GET route using `weaver.newGet`
and passing it two arguments: the name of the route (including the leading `/`), and a function that accepts a request.
The function needs to give a valid response given a `request` object;
this is a normal [node-http request](https://nodejs.org/api/http.html) object,
except that a few attributes are generated and guaranteed by Weaver:
- `userID` is a unique string identifying the user making a request. If `weaver.idRequired(false)` was set, then this might also be set to `"No_ID"`.
- `url` is the resource the user is requesting
- `query` is the entire query string without additional processing
- `method` will return the request method, such as `"POST"` or `"GET"`
- and for POST requests, `postData` is an object made from the name-value pairs of a regular post request. If no data is passed into a post request, weaver returns a default 400 BAD REQUEST error response. To override this behavior, create a post route named "nodata"

So, that hello world response could be hooked up to a get request just like this:
```javascript
weaver.newGet( '/', (request)=>{
    return {
        status: 200,
        mime: 'raw',
        content: 'Hello, World! How\'s the weather today?'
    }
})
```

### Creating a Page
So, how are we going to create a form? "I thought this didn't require writing any HTML", I hear you saying. And that's true! 
Weaver has a `render` function that takes an object and converts it into a webpage! It's super easy to use, too, and can be used
to create static, or dynamic content. In this overview, though, I'm only going to show static content rendering. 

`weaver.render` expects either an object or an array containing objects. 
Each object should have, at the very least, a tag.
They can also have `content`, which can be either a string, an object to be rendered, or an array of objects to be rendered.
Any other properties of these objects will be attached to the rendered object, too.

Calling render on and object like this
```javascript
weaver.render([
    { tag: "form", method: "post", action: "./post", content: [
    { tag: "input", id: "text", name: "text" },
    { tag: "input", type: "submit" }]
])
```
should produce the following HTML output:
```html
'<form method="post" action="./">
    <input id="text" name="text"></input>
    <input type="submit"></input>
</form>'
```
And connecting this to a route is as simple as hooking it up to `weaver.newGet`
```javascript
form = weaver.render([
    { tag: "form", method: "post", action: "./post", content: [
    { tag: "input", id: "text", name: "text" },
    { tag: "input", type: "submit" }]
])
weaver.newGet( '/', (request)=>{
    return { status: 200, mime: 'raw', content: form }
})
```
You could also move the render function to be within the routing function if, say, you wanted the page to include the session ID or other dynamically generated content.

### Handling Post Requests
Now that we have a form attached to the `"/"` route that points to `/post`, we should actually hook something up there.
Handling post requests is mostly the same as get requests. We give `weaver.newPost` a route name, and a function that takes a `request` object.
The main difference is that this object will now include `request.postData`, a dictionary object containing the response we received from the user.
Here, I'm just going to tell weaver to convert it to text and reply with it as paragraph text.
```javascript
weaver.newPost("/post", (request)=>{ return {
    status: 200,
    mime: "text/html",
    content: weaver.render({
        tag: "p",
        content: (request.postData).toString()
    })
}})
```
It really is that straight-forward! And now, the only thing we need before we can open our browser and see this page is to 
tell Weaver to start listening over a specific port.

### Listening

This section is going to be very brief: weaver has a `weaver.server.listen()` function that 
accepts a port number and invokes the `node-http` listen function. If you leave it empty, it uses the default;
when you upload your production code to somewhere like cPanel, make sure to leave it empty.

### Hosting using cPanel

This section of the tutorial assumes you have a version of cPanel set up on your server that has node support baked in.
Scroll down to the **Software** tab of the Dashboard and click *Setup Node.js App* 

![image](https://user-images.githubusercontent.com/81481181/188233234-d76d0657-1871-40b3-a2ba-fc7abd83589c.png)

then click *Create Application* at the top-right.

![image](https://user-images.githubusercontent.com/81481181/188233545-4be35a7d-78c8-4901-ad76-0a7a7a555dd7.png)

When you're at this scrren, I recommend setting it to use the closest-to-current version of Node available 
and using either the default application name, or `app.js`
Then you can hit *Create* at the top-right. Now, whatever directory you chose to use as the Application root
will be populated with an `app.js` file that you'll want to replace with your code.
You should also upload the unzipped Weaver source to this directory,
and after doing that, refresh your Node application and you should be done!