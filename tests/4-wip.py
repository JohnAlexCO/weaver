names = []
functions = []
contypes = [] # default 'text/html'

import base64
def grab(filename):
	# https://appdividend.com/2020/06/23/how-to-convert-image-to-base64-string-in-python/
	with open(filename, 'rb') as img:
		b64string = base64.b64encode( img.read() )
	return b64string
	
	#file = open(filename, 'rb+') # 'rb+'
	#g = file.read()
	#file.close()
	#g = base64.b64encode(g) # https://pythonexamples.org/python-bytes-to-string/
	#g = g.decode()
	#return g

class Management(object):
	def __init__(self):
		self.names = {}
		self.filetypes = []
		self.functions = []
		
	def __call__(self, function):
		self.names[('/'+function.__name__)] = len(self.functions)
		self.filetypes.append('text/html')
		self.functions.append(function)
		return function
	
	def findfunction(self, function):
		for x in range(0, len(self.functions)):
			if self.functions[x] == function:
				#print("FUNCTION WAS FOUND")
				return x
		return -1

	
route = Management()

# ===================================================================
# ALLOW US TO USE A PLETHORA OF FILETYPES
content_types = {'ico':'image/x-icon', 'icon':'image/x-icon', 'exe': 'application/x-executable', 'js': 'application/javascript', 'json': 'application/json', 'doc': 'application/msword', 'pdf': 'application/pdf', 'sql': 'application/sql', 'xls': 'application/vnd.ms-excel', 'ppt': 'application/vnd.ms-powerpoint', 'odt': 'application/vnd.oasis.opendocument.text', 'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'zip': 'application/zip', 'zst': 'application/zstd', 'bin': 'application/macbinary', 'mp3': 'audio/mpeg', 'mpeg': 'audio/mpeg', 'mp4': 'audio/mpeg', 'ogg': 'audio/ogg', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'jfif': 'image/jpeg', 'pjpeg': 'image/jpeg', 'pjp': 'image/jpeg', 'png': 'image/png', 'svg': 'image/svg+xml', 'webp': 'image/webp', 'mng': 'image/x-mng', 'css': 'text/css', 'csv': 'text/csv', 'html': 'text/html', 'php': 'text/php', 'txt': 'text/plain', 'xml': 'application/xml'}
def filetype(function, filetype):
	try:
		filetype = content_types[filetype]
	except:
		print("CONTENT TYPE WAS NOT FOUND: [%s]" % filetype)
		exit()
	else:
		# modify that entry's filetype
		x = route.findfunction(function)
		if x != -1:
			route.filetypes[x] = filetype
			return True
		else:
			return False

# Error was being caused by comparing 0 to boolean; don't do that lmao. False is 0, and that means the index wouldn't work 
def addnames(function, array):
	x = route.findfunction(function)
	#print("Input was %s" % (str(x)))
	if x != -1:
		# add array to names
		array = array.split(' ')
		for y in range(0, len(array)):
			route.names[array[y]] = x
		return True
	else:
		return False
	
def findpage(named):
	try:
		x = route.names[named]
	except:
		return 0 # return default of 0
	else:
		return x
	
# Convert 'environ' into usable dictionary
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

# Take some request and return content
def getContent(request_dictionary):
	print('Asked for [%s]' % request_dictionary['local_request'])
	x = findpage( request_dictionary['local_request'] )
	return( route.functions[x](request_dictionary) , route.filetypes[x] )

import base64
# Take a request, and return a response from our functions
def app(environ, start_response):
	print( route.names )
	request_dictionary = e(environ)
	got = getContent(request_dictionary)
	content = got[0]
	filetype = got[1]
	start_response('200 OK', [('Content-Type', filetype)])
	if type(content) != str:
		return content # if already encoded ??
	#response = '\n'.join([content])
	response = str(content)
	encoded = [response.encode()]
	return encoded


