# weaver
A simple library for rapid website development, designed primarily for use with cPanel

*formerly named crawler*

##### Day "6", Weaver 0.0.0
Repurposed the code from `https://johnalex.co/studio` and `https://johnalex.co/soap` to build a prototype of Weaver.
Weaver will use the old Crawler logo, page, et cet, since it's intended to perform the same purpose.
It's an entirely new code-base written in JavaScript that handles files and post requests, too.

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
I will add this in later, but currently, my computer is dying, so this is what ye get
