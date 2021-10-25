def e(environ):
	r = {
		'local_request': environ['PATH_INFO'],
		'global_request': environ['REQUEST_URI'],
		'https': environ['HTTPS'],
		'webview': environ['HTTP_USER_AGENT'],
		'uri': environ['SCRIPT_URI'],
		'query': environ['QUERY_STRING'],
		'uid': environ['UNIQUE_ID'],
		'uaddr': environ['REMOTE_ADDR'],
		'uport': environ['REMOTE_PORT'],
		'server_software': environ['SERVER_SOFTWARE'],
	}
	return r

class Management(object):
	def __init__(self):
		self.names = {}
		self.functions = []
		
	def __call__(self, function):
		self.functions.append(function)
		
		# just as a default; integer points to function so we can have many many names and repeats and whatever else
		self.names[('/'+function.__name__)] = len(self.functions)-1 # minus one bc length with be +1 compared to indexes
		return self
	
	# INPUT: url string, including lead slash
	# OUTPUT: function number
	def find_route(self, string ): 
		try:
			go = self.names[string]
		except: # not found
			return 0
		else:
			return go
		
	def run(self, request_dictionary ):
		do = request_dictionary['local_request']
		go = self.find_route( do )
		return( self.functions[go]() )
	

route = Management()
def app(environ, start_response):
	start_response('200 OK', [('Content-Type', 'text/plain')])
	request_dictionary = e(environ)
	content = route.run( request_dictionary )
	response = '\n'.join([content])
	encoded = [response.encode()]
	return encoded



