# ***************************************************
# This was tested using A2Hosting and named passenger_wsgi.py
# ***************************************************

from crawler import *

@route
def index():
    uri = ''
    return 'Hello world! This is the index()'
    
@route
def main():
    uri = '/main'
    return 'Aha! You found main()'

c = 'Routes: '
for n in range(0, len(route.functions)):
    c = c + route.names[n] + '    '
log(c)

application = app
