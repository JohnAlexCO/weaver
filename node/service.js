// const fs = require("fs");
// return fs.readFileSync(filename)

const http = require('http');

// this is a dict so that 
// it can be given to the called-program and modified
const properties = {
    host: 'localhost',
    port: 8080,
    main: undefined
}

const listener = function(request, response) {
    var HEAD_RESPONSE = 404;
    var CONTENT_TYPE = 'text/html'
    var END_RESPONSE = '<h1>Service.js</h1><p>Error - Resource not found</p>';
    try {
        const received = properties.main(request);
        HEAD_RESPONSE = received['status']
        CONTENT_TYPE = received['type']
        END_RESPONSE = received['content']
    }
    catch(err){
        console.log("ERROR: UNABLE TO PROCESS REQUEST")
        HEAD_RESPONSE = 200;
        END_RESPONSE = ''+err;
    }
    response.writeHead(HEAD_RESPONSE, CONTENT_TYPE);
    response.end(END_RESPONSE);
}


function run(main) {
    const server = http.createServer(listener);
    server.listen(properties.port, properties.host, ()=> {
        console.log("Server is running over http://"+properties.host+':'+properties.port)
    })
}

module.exports = { properties, run, file, dump_request }


// ========================================= FUNCTIONS FOR ASSEMBLING ROUTES
function file(filename) {
    var fs = require('fs');
    var path = require('path');

    var filePath = './'+filename
    if (filePath == './') {
        console.error('service.js -> file() unable to serve no file')
        process.exit(1)
    }

    switch( path.extname(filePath) ) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;

        default:
            contentType = 'text/html';
        break;
    }

    var content = fs.readFileSync(filePath)
    return {
        status: 200,
        type: contentType,
        content: content
    }
}

// ========================================= FUNCTIONS FOR DEBUGGING

function dump_request(request) {
    expanded = '';
    Object.entries(request).forEach(([k,v]) => {
        switch(typeof v) {
            case 'object':
            case 'dict':
                expanded += '&nbsp;&nbsp;&nbsp;&nbsp;'+k + ' = (object)<br>'
                break;

            default: 
                expanded += '&nbsp;&nbsp;&nbsp;&nbsp;'+k + ' = ('+ typeof v +') '+ v +'<br>'
                break;

        } 
    })
    return [200, 
        '<html>RECEIVED REQUEST: <br>'+expanded+'</html>'
    ]
}
