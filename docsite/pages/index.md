This is the home page for weaver's reference documentation.
The source code, binaries, and attachments will be moved to this site soon,
but for now, those are all available at the [official GitHub](https://github.com/johnalexco/weaver).

### Examples
- [JohnAlex.CO](https://johnalex.co/), including:
    - [Blood Rose Records](https://johnalex.co/studio)
    - [weaver](https://johnalex.co/weaver)*
    - [OnlySoap.LIVE](https://onlysoap.live/)

\* If you'd like to see the source-code of this website, it's available on the GitHub (and will be here, too, soon)

### Dependencies
weaver only relies on the built-in *fs* and *http* modules of [node.js](https://nodejs.org).
Having an up-to-date install of node is all that is required.
That said, weaver will _(probably)_ only work with version 16 or newer


### Getting Started
- [Installation and Tutorial](home.md)
<!--- Works in Progress
- [Website-wide Stylization](style.md)*
- [Using JavaScript](scripting.md)*
- [User Management](users.md)*
- [Adding Static Files](files.md)*
--->

### Functions List
- `render` takes one param: an object or list of tagged-objects to be rendered to HTML
- `newFile` takes two params: a route, and a filename that it will convert into a response
- `newGet` takes two params: a route, and a function that accepts a request
- `newPost` takes two params: a route, and a function that accepts a request
- `idRequired` takes one param: a boolean, telling Weaver whether or not it should require a valid user-agent to serve a response. The default is `true`
- `getPrefunction` takes one param: a function that accepts a request. This will be run before every get request and the return value disgarded
- `postPrefunction` takes one param: a function that accepts a request. This will be run before every post request and the return value disgarded
- `getList` takes no params: it returns a list of the names of all GET routes
- `postList` takes no params: it returns a list of the names of all POST routes
- `server.listen` takes one optional param: the port number that node-http should listen over
