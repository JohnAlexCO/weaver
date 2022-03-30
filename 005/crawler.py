# content_types = {'ico':'image/x-icon', 'icon':'image/x-icon', 'exe': 'application/x-executable', 'js': 'application/javascript', 'json': 'application/json', 'doc': 'application/msword', 'pdf': 'application/pdf', 'sql': 'application/sql', 'xls': 'application/vnd.ms-excel', 'ppt': 'application/vnd.ms-powerpoint', 'odt': 'application/vnd.oasis.opendocument.text', 'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'zip': 'application/zip', 'zst': 'application/zstd', 'bin': 'application/macbinary', 'mp3': 'audio/mpeg', 'mpeg': 'audio/mpeg', 'mp4': 'audio/mpeg', 'ogg': 'audio/ogg', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'jfif': 'image/jpeg', 'pjpeg': 'image/jpeg', 'pjp': 'image/jpeg', 'png': 'image/png', 'svg': 'image/svg+xml', 'webp': 'image/webp', 'mng': 'image/x-mng', 'css': 'text/css', 'csv': 'text/csv', 'html': 'text/html', 'php': 'text/php', 'txt': 'text/plain', 'xml': 'application/xml'}

def Default(data):
	return '''
	<h1>Crawler Default Page</h1>
	<p>This server doesn't have a 404 page set up! Oh no</p>
	'''

def Log(text):
	with open('log.txt', 'a+') as F:
		F.write(text +'\n')
		
class Manager:
	def __repr__(self):
		return str(self.routes)
	
	def __init__(self):
		self.routes = {} # name -> function 
		self.default = Default
		
	def __call__(self, function, names=[]):
		if len(names)==0:
			names.append( function.__name__ )
			
		for n in names: self.routes[n] = function
		return function
	
	def get(self, uri):
		Log('\tRequested: '+uri)
		try:
			result = self.routes[uri]
		except:
			Log('\tRoute not found')
			return self.default
		else:
			Log('\tFound route [%s]' % result.__name__ )
			return result
	
Route = Manager()

# Create our own UID using the remote IP address and information about the remote device
wrapnumber = 256 ** 8
def uid(uddr, webview):
	n = uddr.split('.')
	ip = '%02x%02x%02x%02x' % ( int(n[0]), int(n[1]), int(n[2]), int(n[3]) )
	ords = []
	result = 0
	for i in range(0, len(webview)): ords.append( ord(webview[i]) )
	for i in range(0, len(ords)):
		result += ( ords[i] << 8*i )
	return ip + '%x' % (result % wrapnumber)
		
# Convert 'environ' into an object
class e:
	def __init__(self, environ):
		self.request = environ['PATH_INFO']
		self.global_request = environ['REQUEST_URI']
		self.query = environ['QUERY_STRING']
		self.uddr = environ['REMOTE_ADDR']
		self.uport = environ['REMOTE_PORT']
		self.webview = environ['HTTP_USER_AGENT']
		
		self.uid = uid( self.uddr, self.webview )
		#self.uid = environ['UNIQUE_ID']
		
		#self.uri = environ['SCRIPT_URI']
		#self.https = environ['HTTPS']
		#self.server_software = environ['SERVER_SOFTWARE']
		#return self
	

import base64
# Take a request, and return a response from our functions
def app(environ, start_response):
	# Convert environ into a request object
	request = e(environ)
	
	# Find a route from the request
	Log( 'Received request from [%s]' % request.uid )
	Log( '\t'+str(environ) )
	Function = Route.get( request.request[1:] )
	# Pass the request object to that function and return the result
	content = Function(request)
	start_response('200 OK', [('Content-Type', 'text/html')])
	if type(content) != str:
		return content # if already encoded ??
	response = str(content)
	encoded = [response.encode()]
	return encoded
