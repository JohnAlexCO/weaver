const service = require('./service.js');

function main(request) {
    switch (request.url) {
        case '/hello_world':
            return service.file('test.js')
            break;

        case '/http':
            return service.file('http.pdf')
            break;

        default:
            return {
                status: 404,
                content: 'Unable to find file at '+request.url
            }
    }
}

service.properties.main = main // service.dump_request
service.run()
